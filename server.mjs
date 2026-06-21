import 'dotenv/config'; // Load .env for local development
import express from 'express';
import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// --- Server Setup ---
const app = express();
app.use(express.json({ limit: '16kb' })); // A contact form is tiny — cap the body size

// NOTE: The wide-open cors() was removed on purpose.
// The frontend is served from the SAME Vercel origin and POSTs to a relative
// "/api/contact" URL, so no CORS headers are needed. Dropping CORS blocks
// cross-origin browsers by default — a stricter, safer baseline.

// --- Email client (created once, reused across warm invocations) ---
const resend = new Resend(process.env.RESEND_API_KEY);

// --- Rate limiter (Upstash Redis — shared across all serverless instances) ---
// Only enabled when the Upstash env vars are present, so local dev (or a first
// deploy before secrets are set) won't hard-crash on startup.
let ratelimit = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  ratelimit = new Ratelimit({
    redis: new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    }),
    // Max 5 submissions per IP per 10 minutes
    limiter: Ratelimit.slidingWindow(5, '10 m'),
    prefix: 'portfolio-contact',
  });
} else {
  console.warn('[contact] Upstash env vars missing — rate limiting is DISABLED.');
}

// --- Helpers ---
// Escape user input before placing it in the email HTML (prevents HTML/script injection)
const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Pull the real client IP from Vercel's forwarding header
const getClientIp = (req) => {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// --- API Endpoint ---
app.post('/api/contact', async (req, res) => {
  try {
    // 1) Honeypot: bots fill hidden fields, humans don't. Pretend success silently.
    if (req.body?.company) {
      return res.json({ code: 200, status: 'Message Sent' });
    }

    // 2) Rate limit by IP
    if (ratelimit) {
      const { success } = await ratelimit.limit(getClientIp(req));
      if (!success) {
        return res.status(429).json({
          status: 'Error',
          message: 'Too many messages from this network. Please try again later.',
        });
      }
    }

    // 3) Validate + normalize input
    const firstName = String(req.body?.firstName ?? '').trim();
    const lastName = String(req.body?.lastName ?? '').trim();
    const email = String(req.body?.email ?? '').trim();
    const phone = String(req.body?.phone ?? '').trim();
    const message = String(req.body?.message ?? '').trim();

    const errors = [];
    if (!firstName || firstName.length > 100) errors.push('A valid first name is required.');
    if (lastName.length > 100) errors.push('Last name is too long.');
    if (!isValidEmail(email) || email.length > 200) errors.push('A valid email address is required.');
    if (phone.length > 50) errors.push('Phone number is too long.');
    if (!message || message.length > 5000) errors.push('A message (under 5000 characters) is required.');

    if (errors.length) {
      return res.status(400).json({ status: 'Error', message: errors.join(' ') });
    }

    // 4) Guard required server config
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
      console.error('[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL.');
      return res.status(500).json({ status: 'Error', message: 'The contact form is not configured correctly.' });
    }

    // 5) Send via Resend
    const name = `${firstName} ${lastName}`.trim();
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email, // reply straight to the visitor from your inbox
      subject: `Portfolio Contact — ${name}`,
      html: `
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone) || '—'}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return res.status(502).json({ status: 'Error', message: 'Failed to send message. Please try again later.' });
    }

    return res.json({ code: 200, status: 'Message Sent' });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return res.status(500).json({ status: 'Error', message: 'Something went wrong. Please try again later.' });
  }
});

// --- Local development server ---
// Vercel imports the default export and invokes it itself (it sets the VERCEL
// env var), so we only call listen() when running locally via `npm start`.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Local API listening on http://localhost:${PORT}`));
}

// --- Export for Vercel (@vercel/node) ---
export default app;
