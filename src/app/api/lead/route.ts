import { NextResponse } from 'next/server';
import { sendAlert } from '@/lib/alert';
import { COMPANY, OFFERS, SMS_CONSENT_LABEL, SMS_OPT_IN_CONFIRMATION } from '@/lib/constants';

/**
 * Lead intake endpoint.
 *
 * Delivery — set whichever env vars you have on Vercel; all configured channels run in parallel:
 *   LEAD_GHL_API_KEY    → POSTs the lead to GoHighLevel as a Contact in the MB sub-account
 *                          (LEAD_GHL_LOCATION_ID, default TpaL2rALzbFCdbM1sxmH) with tag
 *                          `mb-site-lead` and 4 custom fields. A repeat visitor (duplicate
 *                          contact) gets the new inquiry as a note on their existing record.
 *                          With SMS consent: tag `sms-opt-in`, a consent-record note, and the
 *                          A2P opt-in confirmation text sent through GHL Conversations.
 *   LEAD_WEBHOOK_URL   → POSTs the JSON payload (legacy: Zapier, Make, n8n…)
 *   RESEND_API_KEY     → emails the lead to LEAD_NOTIFY_EMAIL (default hello@getmarketingbull.com)
 *
 * The visitor is told "sent" only when at least one channel returned 2xx. If every channel fails,
 * the route returns 502 so the form shows the phone number instead of firing a false conversion.
 * With no channel configured, production returns 503; other environments log the lead and succeed.
 *
 * Anything short of full delivery (a lost lead, a failed channel, a failed GHL note/tag/SMS) also
 * sends an operational alert with the lead's details — see src/lib/alert.ts.
 */

interface LeadPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  website?: unknown;
  message?: unknown;
  smsConsent?: unknown;
  product?: unknown;
  source?: unknown;
  hp?: unknown; // honeypot
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOURCE_RE = /^[a-z0-9:-]{1,100}$/;
const MAX_BODY_BYTES = 20_000;
const LIMITS = { name: 100, email: 254, phone: 30, website: 300, message: 5000 } as const;
const UPSTREAM_TIMEOUT_MS = 8000;

// Best-effort per-instance rate limit. Instances are reused under Fluid compute, so this
// stops a single client hammering the form; a Vercel WAF rule is the durable backstop.
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

const FAIL_MESSAGE = `Sorry — that didn't go through. Please call ${COMPANY.phone} (${COMPANY.phoneFormatted}) or email ${COMPANY.email}.`;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

class ChannelError extends Error {
  constructor(readonly status: number, body: string) {
    super(`${status} ${body.slice(0, 1000)}`);
  }
}

async function expectOk(res: Promise<Response>): Promise<string> {
  const r = await res;
  if (r.ok) return String(r.status);
  throw new ChannelError(r.status, await r.text().catch(() => ''));
}

export async function POST(req: Request) {
  // Reject cross-site posts. Browsers always send Origin on a fetch POST; its host must match ours.
  const origin = req.headers.get('origin');
  if (origin) {
    let originHost = '';
    try {
      originHost = new URL(origin).host;
    } catch {}
    const hosts = [req.headers.get('host'), req.headers.get('x-forwarded-host')];
    if (!originHost || !hosts.includes(originHost)) {
      return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 403 });
    }
  }

  if (Number(req.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 413 });
  }

  let body: LeadPayload;
  try {
    const parsed: unknown = await req.json();
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('not an object');
    body = parsed as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields, humans don't. `dropped` tells the form not to count a conversion.
  if (body.hp) return NextResponse.json({ ok: true, dropped: true });

  const ip = req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: `Too many submissions. Please call ${COMPANY.phone} instead.` }, { status: 429 });
  }

  const name = str(body.name, LIMITS.name).replace(/\s+/g, ' ');
  const email = str(body.email, LIMITS.email);
  const phone = str(body.phone, LIMITS.phone);
  if (name.length < 2 || !EMAIL_RE.test(email) || phone.replace(/\D/g, '').length < 7) {
    return NextResponse.json({ ok: false, error: 'Please provide a name, a valid email, and a phone number.' }, { status: 422 });
  }

  const product = str(body.product, 200);
  const source = str(body.source, 100);
  const lead = {
    name,
    email,
    phone,
    website: str(body.website, LIMITS.website),
    message: str(body.message, LIMITS.message),
    smsConsent: body.smsConsent === true,
    product: OFFERS.some((o) => o.name === product) ? product : '',
    source: SOURCE_RE.test(source) ? source : 'website',
    submittedAt: new Date().toISOString(),
    page: (req.headers.get('referer') ?? '').slice(0, 500),
  };

  const [firstName, ...rest] = name.split(' ');
  const lastName = rest.join(' ').trim();

  const ghlKey = process.env.LEAD_GHL_API_KEY;
  const ghlLocationId = process.env.LEAD_GHL_LOCATION_ID || 'TpaL2rALzbFCdbM1sxmH';
  const webhook = process.env.LEAD_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.LEAD_NOTIFY_EMAIL || COMPANY.email;
  const fromEmail = process.env.LEAD_FROM_EMAIL || 'leads@getmarketingbull.com';

  // Partial failures that didn't stop delivery (a GHL note, tag or SMS); reported in the alert below.
  const followUpProblems: string[] = [];

  // Each channel resolves with a short status for the log line, or throws when the lead
  // did not get through.
  const channels: { name: string; deliver: () => Promise<string> }[] = [];

  if (ghlKey) {
    const ghl = (path: string, payload: unknown, version = '2021-07-28') =>
      fetch(`https://services.leadconnectorhq.com${path}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ghlKey}`,
          'Content-Type': 'application/json',
          Version: version,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });

    const tags = lead.smsConsent ? ['mb-site-lead', 'sms-opt-in'] : ['mb-site-lead'];

    // Runs once the contact exists (new or repeat). All calls are additive — unlike
    // /contacts/upsert they can't overwrite tags or fields someone set by hand — and a failure
    // here is logged, not surfaced: the person is already in the CRM.
    const followUps = async (contactId: string, repeat: boolean) => {
      const id = encodeURIComponent(contactId);
      const note: string[] = [];
      if (repeat) {
        note.push(
          [
            `New website inquiry (${lead.submittedAt})`,
            `Source: ${lead.source}`,
            lead.product && `Product: ${lead.product}`,
            `Phone: ${lead.phone}`,
            lead.website && `Website: ${lead.website}`,
            `SMS consent: ${lead.smsConsent ? 'yes' : 'no'}`,
            lead.page && `Page: ${lead.page}`,
          ]
            .filter(Boolean)
            .join('\n')
            .concat('\n\n', lead.message || '(no message)'),
        );
      }
      if (lead.smsConsent) {
        // Proof of consent for the A2P campaign: what was agreed to, where, when, and from where.
        note.push(
          `SMS opt-in recorded ${lead.submittedAt}\nPage: ${lead.page || '(unknown)'}\nIP: ${ip}\nPhone: ${lead.phone}\nConsent text: "${SMS_CONSENT_LABEL}"`,
        );
      }

      const tasks: [string, Promise<Response>][] = [];
      if (note.length) tasks.push(['note', ghl(`/contacts/${id}/notes`, { body: note.join('\n\n---\n\n') })]);
      // New contacts got their tags on create; a repeat contact needs them added.
      if (repeat) tasks.push(['tag', ghl(`/contacts/${id}/tags`, { tags })]);
      if (lead.smsConsent) {
        tasks.push(['sms', ghl('/conversations/messages', { type: 'SMS', contactId, message: SMS_OPT_IN_CONFIRMATION }, '2021-04-15')]);
      }

      const settled = await Promise.allSettled(tasks.map(([, task]) => task));
      const outcome: string[] = [];
      for (const [i, r] of settled.entries()) {
        const what = tasks[i][0];
        if (r.status === 'rejected') {
          console.error(`[lead] ghl ${what} failed`, contactId, r.reason);
          outcome.push(`${what}:error`);
          followUpProblems.push(`GHL ${what} failed (contact ${contactId}): ${String(r.reason)}`);
        } else {
          if (!r.value.ok) {
            const detail = (await r.value.text().catch(() => '')).slice(0, 500);
            console.error(`[lead] ghl ${what} non-2xx`, contactId, r.value.status, detail);
            followUpProblems.push(`GHL ${what} returned ${r.value.status} (contact ${contactId}): ${detail}`);
          }
          outcome.push(`${what}:${r.value.status}`);
        }
      }
      if (outcome.length) console.log('[lead] ghl follow-ups:', outcome.join(' '));
    };

    channels.push({
      name: 'ghl',
      deliver: async () => {
        const r = await ghl('/contacts/', {
          locationId: ghlLocationId,
          firstName,
          lastName,
          name,
          email,
          phone,
          website: lead.website || undefined,
          source: 'Marketing Bull Site',
          tags,
          customFields: [
            { id: 'n3Ur3Tm4gLb7BfhPFJt5', value: lead.source },
            { id: 'ssDT5kiOUvt30YA6vX15', value: lead.message },
            { id: 'nOLB2wsnl4T71In4ybss', value: lead.website },
            { id: 'PqYofPTdo3wZf6li9v9I', value: lead.smsConsent ? 'yes' : 'no' },
          ],
        });
        const text = await r.text().catch(() => '');
        // A repeat visitor already exists as a contact, so GHL answers 400 "does not allow
        // duplicated contacts" with the existing contactId in `meta`. That is still a delivery.
        const repeat = r.status === 400 && text.includes('duplicated contacts');
        if (!r.ok && !repeat) throw new ChannelError(r.status, text);
        if (repeat) console.warn(`[lead] ghl accepted ${r.status}`, text.slice(0, 1000), JSON.stringify(lead));

        let contactId: unknown;
        try {
          const parsed = JSON.parse(text) as { contact?: { id?: unknown }; meta?: { contactId?: unknown } };
          contactId = repeat ? parsed.meta?.contactId : parsed.contact?.id;
        } catch {}
        if (typeof contactId === 'string' && contactId) await followUps(contactId, repeat);
        else if (repeat || lead.smsConsent) console.warn('[lead] ghl returned no contactId; note/tag/SMS skipped');

        return repeat ? `${r.status}-accepted` : String(r.status);
      },
    });
  }

  if (webhook) {
    channels.push({
      name: 'webhook',
      deliver: () =>
        expectOk(fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
          signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        })),
    });
  }

  if (resendKey) {
    const html = `
        <h2>New lead from getmarketingbull.com</h2>
        <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
          <tr><td><b>Name</b></td><td>${esc(lead.name)}</td></tr>
          <tr><td><b>Email</b></td><td>${esc(lead.email)}</td></tr>
          <tr><td><b>Phone</b></td><td>${esc(lead.phone)}</td></tr>
          <tr><td><b>Website</b></td><td>${esc(lead.website)}</td></tr>
          <tr><td><b>Product</b></td><td>${esc(lead.product)}</td></tr>
          <tr><td><b>SMS consent</b></td><td>${lead.smsConsent ? 'yes' : 'no'}</td></tr>
          <tr><td><b>Page</b></td><td>${esc(lead.page)}</td></tr>
          <tr><td valign="top"><b>Message</b></td><td>${esc(lead.message).replace(/\n/g, '<br>')}</td></tr>
        </table>`;
    channels.push({
      name: 'email',
      deliver: () =>
        expectOk(fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: `Marketing Bull Leads <${fromEmail}>`,
            to: [notifyEmail],
            reply_to: lead.email,
            subject: `New lead: ${lead.name}${lead.product ? ` — ${lead.product}` : ''}`,
            html,
          }),
          signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        })),
    });
  }

  if (channels.length === 0) {
    console.error('[lead] no delivery configured', JSON.stringify(lead));
    if (process.env.VERCEL_ENV === 'production') {
      await sendAlert(`LEAD LOST: no delivery channel configured — ${lead.name}`, alertBody(lead, 'No lead delivery env var is set in production.'));
      return NextResponse.json({ ok: false, error: FAIL_MESSAGE }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  }

  const results = await Promise.all(
    channels.map(async ({ name: channel, deliver }) => {
      try {
        return { channel, ok: true, detail: await deliver() };
      } catch (e) {
        if (e instanceof ChannelError) {
          console.error(`[lead] ${channel} non-2xx`, e.message);
          return { channel, ok: false, detail: String(e.status) };
        }
        console.error(`[lead] ${channel} failed`, e);
        return { channel, ok: false, detail: 'error' };
      }
    }),
  );

  const summary = results.map((r) => `${r.channel}:${r.detail}`).join(' ');
  if (!results.some((r) => r.ok)) {
    // Every channel failed: keep the full lead in the log so it can be recovered by hand.
    console.error('[lead] ALL CHANNELS FAILED', summary, JSON.stringify(lead));
    await sendAlert(
      `LEAD LOST: every delivery channel failed — ${lead.name}`,
      alertBody(lead, `Delivery results: ${summary}\nThe visitor was shown the phone number. Enter this lead by hand.`),
    );
    return NextResponse.json({ ok: false, error: FAIL_MESSAGE }, { status: 502 });
  }

  console.log('[lead] delivery results:', summary);
  const failed = results.filter((r) => !r.ok).map((r) => r.channel);
  if (failed.length || followUpProblems.length) {
    const what = [...failed, ...followUpProblems.map((p) => p.split(' ').slice(0, 2).join(' '))].join(', ');
    await sendAlert(
      `Lead partly delivered (${what}) — ${lead.name}`,
      alertBody(lead, [`Delivery results: ${summary}`, ...followUpProblems].join('\n')),
    );
  }
  return NextResponse.json({ ok: true });
}

function alertBody(lead: Record<string, string | boolean>, problem: string): string {
  const fields = ['name', 'email', 'phone', 'website', 'product', 'source', 'smsConsent', 'page', 'submittedAt', 'message'];
  return `${problem}\n\n${fields.map((f) => `${f}: ${String(lead[f] ?? '')}`).join('\n')}`;
}

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}
