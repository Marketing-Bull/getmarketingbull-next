import { NextResponse } from 'next/server';

/**
 * Lead intake endpoint.
 *
 * Delivery, in order of preference — set whichever env vars you have on Vercel:
 *   LEAD_GHL_API_KEY    → POSTs the lead to GoHighLevel as a Contact in the MB sub-account
 *                          (TpaL2rALzbFCdbM1sxmH) with tag `mb-site-lead` and 4 custom fields.
 *   LEAD_WEBHOOK_URL   → POSTs the JSON payload (legacy: Zapier, Make, n8n…)
 *   RESEND_API_KEY     → emails the lead to LEAD_NOTIFY_EMAIL (default hello@getmarketingbull.com)
 * With none set, the lead is logged to the Vercel function log so nothing is silently lost.
 */

interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  website?: string;
  message?: string;
  smsConsent?: boolean;
  product?: string;
  source?: string;
  hp?: string; // honeypot
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields, humans don't.
  if (body.hp) return NextResponse.json({ ok: true });

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const phone = (body.phone ?? '').trim();
  if (name.length < 2 || !EMAIL_RE.test(email) || phone.replace(/\D/g, '').length < 7) {
    return NextResponse.json({ ok: false, error: 'Please provide a name, a valid email, and a phone number.' }, { status: 422 });
  }

  const lead = {
    name,
    email,
    phone,
    website: (body.website ?? '').trim(),
    message: (body.message ?? '').trim(),
    smsConsent: Boolean(body.smsConsent),
    product: body.product ?? '',
    source: body.source ?? 'website',
    submittedAt: new Date().toISOString(),
    page: req.headers.get('referer') ?? '',
  };

  const [firstName, ...rest] = name.split(/\s+/);
  const lastName = rest.join(' ').trim();

  const ghlKey = process.env.LEAD_GHL_API_KEY;
  const ghlLocationId = process.env.LEAD_GHL_LOCATION_ID ?? 'TpaL2rALzbFCdbM1sxmH';
  const webhook = process.env.LEAD_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.LEAD_NOTIFY_EMAIL ?? 'hello@getmarketingbull.com';
  const fromEmail = process.env.LEAD_FROM_EMAIL ?? 'leads@getmarketingbull.com';

  const results: string[] = [];

  if (ghlKey) {
    try {
      const r = await fetch('https://services.leadconnectorhq.com/contacts/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ghlKey}`,
          'Content-Type': 'application/json',
          Version: '2021-07-28',
        },
        body: JSON.stringify({
          locationId: ghlLocationId,
          firstName,
          lastName,
          name,
          email,
          phone,
          website: lead.website || undefined,
          source: 'Marketing Bull Site',
          tags: ['mb-site-lead'],
          customFields: [
            { id: 'n3Ur3Tm4gLb7BfhPFJt5', value: lead.source },
            { id: 'ssDT5kiOUvt30YA6vX15', value: lead.message },
            { id: 'nOLB2wsnl4T71In4ybss', value: lead.website },
            { id: 'PqYofPTdo3wZf6li9v9I', value: lead.smsConsent ? 'yes' : 'no' },
          ],
        }),
      });
      const respText = await r.text();
      results.push(`ghl:${r.status}`);
      if (!r.ok) console.error('[lead] GHL non-2xx', r.status, respText);
      // TEMP DIAGNOSTIC — surface GHL result in response for audit
      results.push(`ghl-body:${respText.slice(0, 200)}`);
    } catch (e) {
      console.error('[lead] GHL failed', e);
      results.push('ghl:error');
    }
  } else {
    results.push('ghl:no-key');
  }

  if (webhook) {
    try {
      const r = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
      results.push(`webhook:${r.status}`);
    } catch (e) {
      console.error('[lead] webhook failed', e);
      results.push('webhook:error');
    }
  }

  if (resendKey) {
    try {
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
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: `Marketing Bull Leads <${fromEmail}>`,
          to: [notifyEmail],
          reply_to: lead.email,
          subject: `New lead: ${lead.name}${lead.product ? ` — ${lead.product}` : ''}`,
          html,
        }),
      });
      results.push(`email:${r.status}`);
    } catch (e) {
      console.error('[lead] email failed', e);
      results.push('email:error');
    }
  }

  if (results.length === 0) {
    console.log('[lead] no delivery configured — logging only', JSON.stringify(lead));
  } else {
    console.log('[lead] delivery results:', results.join(' '));
  }

  return NextResponse.json({ ok: true, _diag: results });
}

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}
