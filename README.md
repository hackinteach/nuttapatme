# nuttapatk.dev

Personal portfolio and freelance landing for [Nuttapat K.](https://nuttapatk.dev),
a senior software engineer in Bangkok. Live at <https://nuttapatk.dev>.

Three static pages, one repo:

| Route | Purpose |
|---|---|
| [`/`](https://nuttapatk.dev) | Portfolio — bio, experience, projects |
| [`/hire`](https://nuttapatk.dev/hire) | Freelance landing for Google Ads — DevOps, K8s, GCP |
| [`/privacy`](https://nuttapatk.dev/privacy) | GDPR + Thailand PDPA + CCPA privacy policy |

## Stack

Vite + React + TypeScript · Tailwind v4 · Framer Motion · self-hosted variable fonts
(Inter + JetBrains Mono via `@fontsource-variable`) · `simple-icons` for brand SVGs ·
Google Tag Manager + GA4 + Google Ads (deferred-load, Consent Mode v2) ·
Vercel hosting + Speed Insights.

No backend, no router, no third-party CMP — the consent banner is a small
React component that talks to `gtag('consent', 'update', …)` directly and
persists the choice in `localStorage`.

## Local dev

Requires Node ≥ 20 (Vite 8 doesn't support the system Node 16 some Macs ship with).

```bash
npm install
npm run dev      # vite on :5173
npm run build    # tsc -b && vite build → dist/
```

The `vite.config.ts` declares three HTML entry points (`index.html`,
`hire/index.html`, `privacy/index.html`) plus a small custom plugin that
preloads the critical Inter Latin font from the build manifest.

## Project structure

```
index.html, hire/, privacy/        Three HTML entry points (Vite multi-page)
src/
  main.tsx, hire.tsx, privacy.tsx  React entry points
  App.tsx, HirePage.tsx,           Page roots
    PrivacyPage.tsx
  data.ts, hire-data.ts            All copy — edit here, not in components
  components/                      Sections (Hero, Experience, Projects, …)
    hire/                          /hire-specific sections
  lib/
    email.ts                       ROT13-obfuscated email helpers
    consent.ts                     localStorage consent + Consent Mode v2 bridge
    analytics.ts                   dataLayer event helpers
public/                            favicon.svg, robots.txt, sitemap.xml
vercel.json                        Security headers + 1y asset cache
```

## Deployment

Vercel auto-deploys on push to `main`. DNS is at Cloudflare Registrar
(DNS-only, no proxy) → `A @ 76.76.21.21` + `CNAME www cname.vercel-dns.com`.

## Performance baseline

PageSpeed Insights (last lab run, all metrics):

| | Desktop | Mobile |
|---|---|---|
| Performance | 75 | 82 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

## More docs

- [SKILL.md](SKILL.md) — full project knowledge base (architecture
  decisions, consent flow history, performance journey, design language)
- [CLAUDE.md](CLAUDE.md) — operational guidance for [Claude Code](https://claude.ai/code)
  sessions on this repo

## License

Source available for reference. Content (résumé text, project descriptions,
custom design) is © Nuttapat K. — please don't redeploy a clone as your
own portfolio.
