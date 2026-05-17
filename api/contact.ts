// POST /api/contact — Vercel edge function that receives the contact-form
// submission, validates, defends against the obvious spam shapes, and
// forwards via Resend to CONTACT_TO_EMAIL.
//
// Required env vars on Vercel:
//   RESEND_API_KEY      Resend API key (free tier covers 3k mails/mo)
//   CONTACT_FROM_EMAIL  e.g. "contact@nuttapatk.dev" — must be verified
//                       in Resend, OR use "onboarding@resend.dev" during
//                       development before domain verification
//   CONTACT_TO_EMAIL    where the message lands (your inbox)

import { Resend } from "resend";

export const config = {
  runtime: "edge",
};

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  // anti-spam fields, see below
  _website?: string;
  _renderedAt?: number;
};

const MIN_DWELL_MS = 1500; // shortest plausible time a human takes to fill the form
const MAX_NAME = 100;
const MAX_EMAIL = 200;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bad(status: number, error: string): Response {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return bad(405, "Method not allowed");

  // Allow same-origin + Vercel preview hosts. Hard-block missing/foreign Origin.
  const origin = req.headers.get("origin") ?? "";
  const isLocal = /^http:\/\/localhost/.test(origin);
  const isProd = /^https:\/\/(www\.)?nuttapatk\.dev$/.test(origin);
  const isPreview = /^https:\/\/nuttapatme.*\.vercel\.app$/.test(origin);
  if (!isLocal && !isProd && !isPreview) return bad(403, "Forbidden");

  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return bad(400, "Invalid JSON");
  }

  // Honeypot: a hidden <input name="_website"> that real users never fill.
  if (payload._website && payload._website.length > 0) {
    // Silently succeed so the bot moves on — never tell it the form failed.
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  // Time-trap: form was rendered at _renderedAt; humans can't submit in < 1.5s.
  if (
    typeof payload._renderedAt === "number" &&
    Date.now() - payload._renderedAt < MIN_DWELL_MS
  ) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const subject = (payload.subject ?? "").trim();
  const message = (payload.message ?? "").trim();

  if (!name || name.length > MAX_NAME) return bad(400, "Name required (max 100 chars)");
  if (!email || email.length > MAX_EMAIL || !EMAIL_RE.test(email))
    return bad(400, "A valid email is required");
  if (subject.length > MAX_SUBJECT) return bad(400, "Subject too long");
  if (!message || message.length > MAX_MESSAGE)
    return bad(400, "Message required (max 5000 chars)");

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) {
    // Configuration missing — fail loud server-side, soft message to client.
    return bad(503, "Mail service not configured");
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: subject
      ? `[nuttapatk.dev] ${subject}`
      : `[nuttapatk.dev] New inquiry from ${name}`,
    text:
      `New contact-form submission from nuttapatk.dev\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      (subject ? `Subject: ${subject}\n` : "") +
      `\n${message}\n`,
  });

  if (error) return bad(502, "Failed to send — please email directly");
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
