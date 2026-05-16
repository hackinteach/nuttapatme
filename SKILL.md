# SKILL.md — Project Knowledge Base

A reference doc capturing what this site is, how it's structured, why
the architecture is what it is, and the history that got it there.
Companion to `CLAUDE.md` (which is Claude-operational; this is human-and-
agent-readable knowledge).

---

## 1. What this is

`nuttapatk.dev` is a two-purpose static site:

1. **Personal portfolio** at `/` — biographical/professional, casual tone,
   small "Tinkering" pill, mix of personal and work projects.
2. **Freelance landing page** at `/hire` — conversion-optimized, used as
   the destination for Google Ads campaigns targeting DevOps / Kubernetes
   / GCP consulting keywords.
3. **Privacy policy** at `/privacy` — GDPR + Thailand PDPA + CCPA compliant.

Owner is a senior software engineer in Bangkok. Currently full-time
employed; freelance work happens evenings/weekends (~10–15 hrs/week per
client). Current employer is redacted from the public site.

## 2. Stack

| Concern | Choice | Rationale |
|---|---|---|
| Build tool | Vite (multi-page) | Three HTML entry points without router complexity |
| Framework | React 18 + TypeScript | Standard. No SSR — see "Open work" §10 |
| Styling | Tailwind v4 via `@tailwindcss/vite` | Single CSS bundle, no PostCSS chain |
| Animation | Framer Motion | Scroll-linked transforms, variants |
| Fonts | `@fontsource-variable/inter` + `…/jetbrains-mono` | Self-hosted, single variable font per family |
| Icons | `lucide-react` + `simple-icons` (brand) + inline SVG | Lucide for UI, simple-icons for tech-stack orbital |
| Analytics | GA4 + Google Ads via GTM | Standard ads funnel |
| RUM | Vercel Speed Insights | Real-user Core Web Vitals |
| Consent | Custom React banner + `gtag('consent', …)` via Consent Mode v2 | Cookiebot was tried and removed (see §6) |
| Hosting | Vercel | Auto-deploy on push to `main` |
| DNS | Cloudflare Registrar (DNS-only, no proxy) | Cleanest path to Vercel TLS |

## 3. Routes

- **`/`** → `index.html` → `src/main.tsx` → `<App />`
  - Sections (anchor links): `#about`, `#experience`, `#projects`,
    `#competitions`, `#contact`
  - Navbar CTA: "Hire me" → `/hire`
- **`/hire`** → `hire/index.html` → `src/hire.tsx` → `<HirePage />`
  - Sections: `#services`, `#process`, `#faq`
  - Navbar CTA: "Book a call" → `hire.bookingUrl`
  - Includes the rotating `<TechOrbit />` brand-icon visualization
- **`/privacy`** → `privacy/index.html` → `src/privacy.tsx` → `<PrivacyPage />`

All three render the `<CookieBanner />` and `<SpeedInsights />` and reuse
`<Footer />` (or `<HireFooter />` on hire).

## 4. Content model

Two data files; edit copy here without touching components:

- **`src/data.ts`** — portfolio content
  - `profile` (name, alias, github, linkedin, location, blurb)
  - `skills[]` (grouped chips: Languages, Cloud & Infra, CI/CD &
    Observability, Security & Compliance, Frontend, Data & ML)
  - `certifications[]`
  - `education`
  - `experience[]` (timeline entries — current employer redacted)
  - `projects[]` (4 work projects on top: Apigee, On-prem K8s for Public
    Health Sector, Observability stack, Security Audits; then 7 personal/
    school projects)
  - `competitions[]`

- **`src/hire-data.ts`** — freelance landing content
  - `hire.bookingUrl` (Cal.com — currently placeholder)
  - `hire.capacity` ("Available for new projects")
  - `services[]` (3 primary execution offerings)
  - `advisory[]` (2 secondary offerings: Training & Workshops, Advisory &
    Consulting incl. security audits)
  - `credentials[]` (4 stat cards)
  - `trustedBy[]` (6 redacted industry tags; no client names)
  - `process[]` (4 steps)
  - `faqs[]` (6 honest Q&As incl. "Aren't you employed full-time?")

## 5. Email obfuscation

In `src/lib/email.ts`:

- User+domain stored as ROT13 + reversed strings: `u: "ergfnzorj"`,
  `d: "zbp.upnrgavxpnu"`.
- `decode()` applies rot13 then reverses. `getEmail()` returns
  `webmaster@hackinteach.com` (the actual address).
- `EMAIL_DISPLAY` const = `"webmaster [at] hackinteach [dot] com"` — what
  visitors see in the DOM. Bots scraping HTML get this useless form.
- `openMail()` constructs `mailto:` at click-time only; no static mailto
  in HTML.
- `copyEmail()` writes the decoded form to clipboard.

**Never** put the cleartext email in code comments or anywhere in the
repo. The whole point is bot resistance, and the repo is public.

## 6. Consent / analytics flow

The single biggest source of past friction. Current state:

1. **Default consent state** is set inline at the top of every `<head>`
   via `gtag('consent', 'default', { …denied… })`. Runs before anything
   else. Includes `wait_for_update: 500` so async tag eval waits briefly
   for the user's choice.
2. **GTM** loads asynchronously **only after the `load` event + 1.5s**.
   Critical: GTM is 270 KB and synchronously parsing it pre-render
   destroyed mobile TBT (4,430 ms → fixed). Defer logic is inline in each
   HTML.
3. **Production-domain gate**: GTM only loads on `nuttapatk.dev` /
   `www.nuttapatk.dev`. Vercel preview deployments and `localhost` skip.
4. **Cookie banner** (`src/components/CookieBanner.tsx`) is a custom
   React component. On mount: reads `localStorage["consent-v1"]`. If no
   choice, shows the banner. Accept/Reject/Customize calls
   `submitConsent(choice)` which:
   - Writes to localStorage.
   - Calls `window.gtag('consent', 'update', { … })` mapping the user's
     three categories (preferences/statistics/marketing) to the six
     Consent Mode v2 storage signals.
5. **"Cookie settings" footer link** calls `openCookieSettings()` →
   clears localStorage → dispatches `consent:renew` event → banner
   re-appears.

### Why no third-party CMP

We tried Cookiebot. With `data-blockingmode="auto"` it intercepted GTM
scripts before Consent Mode v2 could evaluate, which made Tag Assistant
flag "CMP may be blocking tags." Removing Cookiebot and using our own
banner + direct gtag calls is simpler, smaller, and works correctly with
Google Consent Mode v2.

### Tag firing inside GTM

Tags inside the GTM container should use **"No additional consent
required"** in their Consent Settings (NOT "Require additional consent
for tag to fire"). That lets the Google Tag itself read the Consent Mode
v2 state and decide whether to fire in full mode (`gcs=G111`) or
cookieless mode (`gcs=G100`).

### Event tracking

Conversion events fire via `dataLayer.push`:

- `book_call_click` with `source` = `hire_navbar` | `hire_hero` |
  `hire_final_cta` | `hire_advisory`
- `hire_me_click` with `source` = `portfolio_hero` | `portfolio_navbar`

In GTM, create a Custom Event trigger on each event name and bind a
Google Ads Conversion Tracking tag (Consent Settings: Marketing required).

## 7. Performance journey

This is the optimization arc, oldest → newest. Useful if a future PSI run
regresses; check whether one of these regressed first.

| Step | Change | Impact |
|---|---|---|
| 1 | Self-host fonts (`@fontsource-variable`) | FCP/LCP from 2.7s → ~1s on desktop |
| 2 | Remove Lenis smooth-scroll | Desktop Perf 50 → 76, TBT 1,490 → 430 ms |
| 3 | Fix non-composited pulse-ring (box-shadow → transform/opacity) | Removed long-running paint work |
| 4 | `will-change: transform` on TechOrbit rings | Composited rotation |
| 5 | **Defer GTM until load + 1.5s** | Mobile Perf 40 → 82, mobile TBT 4,430 → 290 ms |
| 6 | Rename CSS chunk: `CookieBanner-….css` → `styles-….css` | Cosmetic |
| 7 | Inter Latin font preload (custom Vite plugin) | LCP ~200-400 ms mobile |
| 8 | Vendor chunk split (`manualChunks: node_modules → vendor`) | Cosmetic + better long-term cache |
| 9 | Vercel Speed Insights wired | RUM data flowing for actual users |

## 8. SEO + security

### SEO already done

- Full meta tags (description, keywords, theme-color, robots,
  canonical)
- OpenGraph + Twitter card (image at `/og.png` currently 404 — see TODOs)
- JSON-LD: `Person` schema + `WebSite` schema on `/`, plus
  `ProfessionalService` schema on `/hire`
- `public/sitemap.xml` (3 URLs) and `public/robots.txt`
- `<noscript>` fallbacks in every HTML so crawlers/reviewers see content
  without JS

### Security headers (in `vercel.json`)

- HSTS preload (2 years + includeSubDomains)
- CSP with explicit allowlist for GTM, GA4, Google Ads, Cal.com, Vercel
  Speed Insights. Uses `'unsafe-inline'` for script-src and style-src
  (necessary for GTM + Tailwind; tightening requires per-deploy nonces).
- X-Content-Type-Options, Referrer-Policy, Permissions-Policy,
  X-Frame-Options.
- 1-year immutable cache on `/assets/*` (safe — hashed filenames).

## 9. Design language

- **Palette**: bg `#0a0a0f`, accent `#7c5cff` (violet), accent-2
  `#22d3ee` (cyan). CSS custom properties in `src/index.css`.
- **Gradient text** for headlines: violet → light purple → cyan.
- **Glass cards**: subtle white-tinted gradient + 1px border + 10px
  backdrop blur. `.glass` utility in `index.css`.
- **Grid background**: faint dotted grid masked by a radial gradient so
  it fades toward the edges. `.grid-bg` utility.
- **Animation easing**: `[0.22, 1, 0.36, 1]` (Apple-style) for entrance
  reveals. `linear` for continuous rotations.
- **Heading scale**: H1 5xl-7xl gradient-text, H2 3xl-5xl gradient-text
  via `<Section>`, H3 lg/xl plain white.

## 10. Open work

User-owned (manual steps):
- [ ] Create `public/og.png` (1200×630) — currently 404 in social-share
- [ ] `public/apple-touch-icon.png` (180×180)
- [ ] Register the Cal.com handle and update `hire.bookingUrl` in
  `hire-data.ts`
- [ ] Create GA4 + Google Ads conversion tags inside GTM dashboard

Available optimizations (not yet pulled, in case scores need to climb
beyond 90):
- [ ] Switch `framer-motion` to `LazyMotion` + `<m.div>` (touches every
  component, ~30 KB JS savings)
- [ ] Inline critical CSS via `beasties` or `vite-plugin-html-config`
  (~60-560 ms saving)
- [ ] Pre-render the homepage with `vite-plugin-prerender` (biggest LCP
  win for SPAs; risk: hydration mismatch)

## 11. Things that intentionally aren't there

- No backend / API. Pure static.
- No router (Vite multi-page handles three pages without React Router).
- No third-party CMP (rolled our own — see §6).
- No SSR (yet — see §10).
- No PWA / service worker / manifest. Out of scope for a portfolio.
- No contact form. Email + Cal.com handle inquiries.
- No comments anywhere unless `WHY` is non-obvious — site code follows
  that style. This doc is the exception.

## 12. Public artifacts

- Repo: <https://github.com/hackinteach/nuttapatme>
- Deployed: <https://nuttapatk.dev> + <https://nuttapatk.dev/hire>
  + <https://nuttapatk.dev/privacy>
- Sitemap: <https://nuttapatk.dev/sitemap.xml>
- Robots: <https://nuttapatk.dev/robots.txt>
