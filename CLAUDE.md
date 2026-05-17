# CLAUDE.md

Operational guidance for Claude Code sessions on this repo. Read SKILL.md
for the longer "what is this and why" knowledge base.

## At a glance

- **Type**: Multi-page static site (Vite + React + TS), deployed on Vercel.
- **Domain**: `nuttapatk.dev` (DNS at Cloudflare Registrar).
- **Three entry points** (Vite multi-page build):
  - `/` — personal portfolio
  - `/hire` — freelance landing page for Google Ads
  - `/privacy` — GDPR/PDPA privacy policy
- **Owner**: Nuttapat K. (full name redacted publicly — see "Redaction" below).

## Common commands

Use Node from Homebrew (system Node 16 is too old for Vite):

```bash
export PATH=/opt/homebrew/opt/node/bin:$PATH
npm run dev      # vite dev server on :5173
npm run build    # tsc -b && vite build -> dist/
```

Deploy: every push to `main` auto-deploys via Vercel. Do not push to other
branches expecting prod behavior.

## File layout

```
index.html, hire/index.html, privacy/index.html   ← three HTML entry points
src/
  main.tsx, hire.tsx, privacy.tsx                 ← Vite entry points
  App.tsx, HirePage.tsx, PrivacyPage.tsx          ← page roots
  data.ts                                         ← portfolio content
  hire-data.ts                                    ← hire page content
  lib/
    email.ts                                      ← ROT13 email obfuscation
    consent.ts                                    ← localStorage consent state + gtag bridge
    analytics.ts                                  ← dataLayer event helpers (trackBookCallClick, trackHireMeClick)
  components/
    Navbar.tsx, Hero.tsx, About.tsx, ...          ← portfolio sections
    CookieBanner.tsx                              ← custom consent banner (no third-party CMP)
    EmailButton.tsx                               ← email click + copy with toast
    icons.tsx                                     ← inline brand SVGs (GitHub, LinkedIn)
    hire/                                         ← /hire subcomponents
public/
  favicon.svg, robots.txt, sitemap.xml
vercel.json                                       ← security headers + caching
vite.config.ts                                    ← multi-page input, vendor chunk, font preload, CSS rename
```

## Rules — things to NEVER do

1. **Never put the email in plaintext.** Email lives ROT13+reversed in
   `src/lib/email.ts`. Source comments must not contain "webmaster" or
   "hackinteach.com" — that defeats the obfuscation in the public repo.
   Use `openMail()` / `copyEmail()` / `EMAIL_DISPLAY` helpers, never a
   literal `mailto:`.

2. **Never name the current employer publicly.** The portfolio's "Present"
   experience entry uses `"Enterprise SaaS Company"` with location annotated
   `"Thailand · name withheld"`. JSON-LD `Person.worksFor` was deliberately
   dropped for the same reason. Past employers (TheGang, AXA, Diamond,
   CMKL) are fine to name.

3. **Never reintroduce Cookiebot or any third-party CMP.** We tried; the
   auto-blocking fought Google Consent Mode v2 and broke tag firing. The
   current setup (localStorage + custom React banner + direct
   `gtag('consent','update')`) works and is documented in privacy policy.

4. **Never add Lenis or another scroll-jacking lib.** Removed for perf.
   Native scroll is fine.

5. **Never load GTM synchronously on page load.** Always defer until after
   `load` event + 1.5s timeout — see the inline script in the HTML files.
   GTM is ~270 KB and tanks mobile TBT if not deferred.

6. **Never amend commits or force-push to `main`.** Always create new
   commits. Vercel auto-deploys from `main`.

## Conventions

- **Heading hierarchy**: exactly one `<h1>` per page (Hero). Sections use
  `<h2>` (via `<Section>` component), cards use `<h3>`.
- **Design language**: dark theme with gradient text (violet→indigo→cyan),
  `glass` utility class for cards, `gradient-text` for headlines. Defined
  in `src/index.css`.
- **Animations**: Framer Motion. Composited properties only (transform,
  opacity). Add `will-change: transform` for continuously rotating
  elements (already on TechOrbit rings).
- **Font stack**: Self-hosted via `@fontsource-variable/inter` and
  `@fontsource-variable/jetbrains-mono`. Inter Latin is preloaded via
  custom Vite plugin (see `vite.config.ts` → `preloadCriticalFont`).
- **Display name**: "Nuttapat K" everywhere user-facing. Full surname
  "Koonarangsri" appears only in `meta keywords` and JSON-LD
  `alternateName` for SEO discoverability.

## Deployment

- Pushes to `main` → Vercel auto-deploys
- Static output in `dist/`, three HTML files emitted
- Vercel config in `vercel.json` (CSP, HSTS, X-Content-Type-Options,
  Referrer-Policy, Permissions-Policy, X-Frame-Options, 1yr cache on
  `/assets/*`)
- Domain DNS at Cloudflare (gray-cloud / DNS-only) → Vercel anycast A
  record + `cname.vercel-dns.com` CNAME for www

## Live third-party IDs

- GTM container: `GTM-5T2973JX`
- GA4 measurement: `G-GVX8Q4S7W6` (configured inside GTM, not in HTML)
- Cookiebot: **REMOVED** — do not reintroduce

## Vercel env vars (contact form)

Set on Vercel project → Settings → Environment Variables:

**Required — without these the form returns 503:**

- `RESEND_API_KEY` — from resend.com (free tier 3k/mo)
- `CONTACT_FROM_EMAIL` — must be on a Resend-verified domain, e.g.
  `contact@nuttapatk.dev`. Until domain verified, can fall back to
  `onboarding@resend.dev`
- `CONTACT_TO_EMAIL` — where messages land (your inbox)

**Required for rate limiting — without these the function fails open
(allows all requests, logs a warning):**

- `UPSTASH_REDIS_REST_URL` — from upstash.com Redis dashboard
- `UPSTASH_REDIS_REST_TOKEN` — from same Upstash dashboard

Rate limit is 3 sends per rolling hour per IP. Bypass attempts return
HTTP 429 with `Retry-After` header.

## Performance baseline (last PSI run)

- Desktop Perf 75, FCP 0.4s, LCP 0.5s, TBT 590ms, CLS 0
- Mobile Perf 82, FCP 2.1s, LCP 3.1s, TBT 290ms, CLS 0.013
- Accessibility / Best Practices / SEO all 100 on both

Major levers already pulled: removed Lenis, deferred GTM, self-hosted
fonts, preloaded Inter Latin, will-change on rotating animations,
composited pulse-ring, code-split vendor chunk.

**Levers not yet pulled** (in case future PSI regresses or scores need to
climb above 90):
- LazyMotion refactor (cuts ~30 KB unused framer-motion features)
- Critical-CSS inlining (beasties or similar plugin)
- Prerendering the homepage (`vite-plugin-prerender`) — biggest LCP win

## Open TODOs the user owns

- `public/og.png` (1200×630) for social-share previews — currently 404s
- `public/apple-touch-icon.png` (180×180) — optional
- `hire-data.ts` → `hire.bookingUrl` is `https://cal.com/nuttapatk`
  (placeholder; user needs to register the Cal.com handle). Cal.com is
  now the *secondary* CTA — primary is the contact form.
- Create GA4 + Ads conversion tags inside GTM dashboard (Initialization
  All-Pages trigger; Consent Setting = "No additional consent required"
  so Consent Mode v2 handles gating natively, NOT
  "Require additional consent")
- Register Resend account, verify `nuttapatk.dev` domain, set the three
  env vars above. Without these the contact form returns 503.
- Add a GTM trigger for `contact_form_submit` event (alongside the
  existing `book_call_click` triggers) so form conversions roll up
  to Google Ads

## When the user shares a PSI PDF

They land in `~/Downloads/PageSpeed Insights-{desktop,mobile}{-N}.pdf`.
Read both before answering. The big patterns we've seen:
- Mobile TBT regression → check whether GTM is loading sync (defer it)
- High LCP → check whether fonts are preloaded
- "CookieBan…" anything in network panel → that's just legacy chunk
  naming, ignore unless the user asks
