import { COMPANY } from '@/lib/constants';

/**
 * Operational alert for the lead pipeline: tells a person the same day that a lead was lost,
 * or only partly delivered, instead of leaving it in the Vercel logs.
 *
 *   LEAD_ALERT_WEBHOOK_URL → POSTs `{ text }` (Slack incoming webhook format)
 *   RESEND_API_KEY         → emails LEAD_ALERT_EMAIL (default LEAD_NOTIFY_EMAIL, then COMPANY.email)
 *
 * Both run when configured, so an outage of one still leaves the other. Never throws: an alert
 * that fails is logged and the request carries on.
 */
export async function sendAlert(subject: string, body: string): Promise<void> {
  const webhook = process.env.LEAD_ALERT_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_ALERT_EMAIL || process.env.LEAD_NOTIFY_EMAIL || COMPANY.email;
  const from = process.env.LEAD_FROM_EMAIL || 'leads@getmarketingbull.com';
  const signal = () => AbortSignal.timeout(5000);

  const sends: [string, Promise<Response>][] = [];
  if (webhook) {
    sends.push([
      'webhook',
      fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `*${subject}*\n${body}` }),
        signal: signal(),
      }),
    ]);
  }
  if (resendKey) {
    sends.push([
      'email',
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: `Marketing Bull Alerts <${from}>`, to: [to], subject, text: body }),
        signal: signal(),
      }),
    ]);
  }
  if (sends.length === 0) {
    console.error('[alert] no alert channel configured:', subject);
    return;
  }

  const settled = await Promise.allSettled(sends.map(([, p]) => p));
  for (const [i, r] of settled.entries()) {
    const channel = sends[i][0];
    if (r.status === 'rejected') console.error(`[alert] ${channel} failed`, r.reason);
    else if (!r.value.ok) console.error(`[alert] ${channel} non-2xx`, r.value.status, (await r.value.text().catch(() => '')).slice(0, 500));
  }
}
