// POST /api/contact — Vercel edge function that receives the contact-form
// submission, validates, defends against the obvious spam shapes,
// rate-limits per-IP via Upstash, then forwards via Resend to
// CONTACT_TO_EMAIL.
//
// Required env vars on Vercel:
//   RESEND_API_KEY              Resend API key
//   CONTACT_FROM_EMAIL          e.g. "contact@nuttapatk.dev" — must be
//                               verified in Resend
//   CONTACT_TO_EMAIL            where the message lands (your inbox)
//   UPSTASH_REDIS_REST_URL      Upstash Redis REST URL
//   UPSTASH_REDIS_REST_TOKEN    Upstash Redis REST token
//
// Without Upstash env vars the function fails open (allows requests
// without rate limiting) and logs a warning. Without Resend env vars
// the function returns 503.

import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const config = {
  runtime: "edge",
};

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  _website?: string;
  _renderedAt?: number;
};

const MIN_DWELL_MS = 1500;
const MAX_NAME = 100;
const MAX_EMAIL = 200;
const MAX_SUBJECT = 200;
const MAX_MESSAGE = 5000;
const MAX_BODY_BYTES = 32 * 1024; // 32 KiB — well above any legit form payload
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bad(status: number, error: string): Response {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

// Generic client-facing error string used for any server-side failure.
// We never reveal "Resend" / "Upstash" / configuration state to the client.
const SOFT_FAIL = "Couldn't deliver — please try again later, or email me directly.";

// Lazily-initialized rate limiter so the function still imports cleanly
// without the Upstash env vars (e.g. in local dev).
let ratelimit: Ratelimit | null | undefined;
function getRatelimit(): Ratelimit | null {
  if (ratelimit !== undefined) return ratelimit;
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    console.warn("[contact] Upstash env vars missing — rate limiting disabled");
    ratelimit = null;
    return null;
  }
  ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, "1 h"),
    analytics: true,
    prefix: "contact-form",
  });
  return ratelimit;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return bad(405, "Method not allowed");

  // Defense in depth: only accept JSON. Stops form-encoded probes and
  // accidental misconfigurations.
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return bad(415, "Content-Type must be application/json");
  }

  // Reject requests from unknown origins. Origin is browser-enforced so
  // this is best-effort against CSRF — scripted clients can forge it.
  const origin = req.headers.get("origin") ?? "";
  const isLocal = /^http:\/\/localhost/.test(origin);
  const isProd = /^https:\/\/(www\.)?nuttapatk\.dev$/.test(origin);
  const isPreview = /^https:\/\/nuttapatme.*\.vercel\.app$/.test(origin);
  if (!isLocal && !isProd && !isPreview) return bad(403, "Forbidden");

  // Cap body size before parsing so a tiny worker can't be DoSed by a huge body.
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) return bad(413, "Payload too large");

  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return bad(400, "Invalid JSON");
  }

  // Anti-spam layers run BEFORE rate limiting so bot probes don't burn
  // budget slots that a real user might otherwise consume on retries.
  if (payload._website && payload._website.length > 0) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }
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

  // Per-IP rate limit (3 sends per rolling hour, ~72/day max). Caps the
  // attacker's reach against the Resend send quota.
  const rl = getRatelimit();
  if (rl) {
    const ip = clientIp(req);
    const { success, reset } = await rl.limit(ip);
    if (!success) {
      const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
      return new Response(
        JSON.stringify({ error: "Too many submissions — please try again later." }),
        {
          status: 429,
          headers: {
            "content-type": "application/json",
            "retry-after": String(retryAfter),
          },
        },
      );
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) {
    console.error("[contact] Resend env vars missing");
    return bad(503, SOFT_FAIL);
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

  if (error) {
    console.error("[contact] Resend send error", error);
    return bad(502, SOFT_FAIL);
  }
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
