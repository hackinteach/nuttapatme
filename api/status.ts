// GET /api/status — public service-style health endpoint.
//
// Returns build metadata, runtime region, processor dependencies, and
// security-header posture. Intended as an easter egg for devs poking
// around the site, and a sanity-check during deploys. No authentication
// (everything here is non-sensitive).

export const config = {
  runtime: "edge",
};

// Vercel exposes these at build time. Fall back to "dev" for local runs.
const BUILD_SHA = (process.env.VERCEL_GIT_COMMIT_SHA ?? "dev").slice(0, 7);
const BUILD_BRANCH = process.env.VERCEL_GIT_COMMIT_REF ?? "local";
const DEPLOYMENT_ID = process.env.VERCEL_DEPLOYMENT_ID ?? null;
const PROJECT_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "nuttapatk.dev";
const VERCEL_ENV = process.env.VERCEL_ENV ?? "development";

// Captured when the function module first imports — close enough to
// "deploy time" for edge functions that warm-start with the deployment.
const FIRST_SEEN_AT = new Date().toISOString();

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }

  // Vercel injects request region into geo headers / process.env.VERCEL_REGION
  // depending on runtime version; we surface what's available.
  const region =
    process.env.VERCEL_REGION ?? req.headers.get("x-vercel-id")?.split("::")[0] ?? null;

  const body = {
    name: "nuttapatk.dev",
    status: "ok",
    env: VERCEL_ENV,
    build: {
      sha: BUILD_SHA,
      branch: BUILD_BRANCH,
      deploymentId: DEPLOYMENT_ID,
      firstSeenAt: FIRST_SEEN_AT,
    },
    runtime: {
      edge: true,
      region,
      now: new Date().toISOString(),
    },
    processors: [
      { name: "Vercel", role: "Hosting, edge runtime, Speed Insights RUM" },
      { name: "Cloudflare", role: "DNS-only (no proxy) for nuttapatk.dev" },
      { name: "Resend", role: "Contact form delivery (only on submit)" },
      { name: "Upstash Redis", role: "Rate-limit state for contact form" },
      { name: "Google", role: "Tag Manager + GA4 + Ads — consent-gated" },
      { name: "Cal.com", role: "Scheduling (only if visitor books)" },
    ],
    security: {
      hsts: "max-age=63072000; includeSubDomains; preload",
      csp: "strict allowlist; 'unsafe-inline' for script-src (GTM compatibility)",
      frameOptions: "SAMEORIGIN",
      contentTypeOptions: "nosniff",
      referrerPolicy: "strict-origin-when-cross-origin",
      permissionsPolicy: "camera/mic/geolocation/payment/usb/bluetooth all disabled",
    },
    links: {
      site: `https://${PROJECT_URL}`,
      hire: `https://${PROJECT_URL}/hire`,
      privacy: `https://${PROJECT_URL}/privacy`,
      repo: "https://github.com/hackinteach/nuttapatme",
      security: `https://${PROJECT_URL}/.well-known/security.txt`,
    },
  };

  return new Response(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=60, s-maxage=60",
      // Public read-only diagnostic — CORS-friendly so devs can `curl | jq`
      // from anywhere without complaint.
      "access-control-allow-origin": "*",
    },
  });
}
