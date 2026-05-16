import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { CookieBanner } from "./components/CookieBanner";
import { EMAIL_DISPLAY } from "./lib/email";

// Bump when the policy materially changes.
const LAST_UPDATED = "May 2026";

// Static cookie list. Update by hand when adding new vendors or tags.
const COOKIES: { name: string; vendor: string; purpose: string; expiry: string; category: "Necessary" | "Statistics" | "Marketing" }[] = [
  {
    name: "consent-v1",
    vendor: "nuttapatk.dev (first-party)",
    purpose: "Stores your cookie banner choice so the banner doesn't reappear on every visit.",
    expiry: "Persistent (until you click 'Cookie settings')",
    category: "Necessary",
  },
  {
    name: "_ga",
    vendor: "Google Analytics",
    purpose: "Distinguishes unique visitors for aggregate traffic measurement.",
    expiry: "2 years",
    category: "Statistics",
  },
  {
    name: "_ga_GVX8Q4S7W6",
    vendor: "Google Analytics",
    purpose: "Persists session state for GA4.",
    expiry: "2 years",
    category: "Statistics",
  },
  {
    name: "_gcl_au",
    vendor: "Google Ads",
    purpose: "Conversion attribution — tells Google Ads if a click led to a booking.",
    expiry: "90 days",
    category: "Marketing",
  },
];

export function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24 max-w-3xl mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-2)] mb-3">
          Legal
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight gradient-text">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-white/50">Last updated: {LAST_UPDATED}</p>

        <Section title="Who I am">
          <p>
            This site, <strong>nuttapatk.dev</strong>, is operated by Nuttapat
            Koonarangsri, an individual based in Bangkok, Thailand. For any
            privacy question or data request, contact me at{" "}
            <span className="font-mono text-white/85">{EMAIL_DISPLAY}</span>.
          </p>
        </Section>

        <Section title="What I collect">
          <p>
            By default, the site doesn't collect personal data about visitors.
            I do collect the following, only when relevant:
          </p>
          <ul>
            <li>
              <strong>Analytics</strong> (page views, referrers, country, device
              type) via Google Analytics 4 — only if you consent to{" "}
              <em>Statistics</em> cookies in the banner.
            </li>
            <li>
              <strong>Advertising measurement</strong> (which ad click led you
              here, whether you booked a call) via Google Ads and Google Tag
              Manager — only if you consent to <em>Marketing</em> cookies.
            </li>
            <li>
              <strong>Content you send me</strong> — if you email me or book a
              call, that conversation and any details you share are processed by
              me and by the tools I use to communicate (mail provider, scheduler).
            </li>
          </ul>
          <p>
            I do not sell your data. I do not run remarketing audiences beyond
            standard conversion measurement.
          </p>
        </Section>

        <Section title="Why I collect it">
          <ul>
            <li>
              <strong>Operate the site</strong> (legitimate interest) — basic
              server logs, no personal data retained.
            </li>
            <li>
              <strong>Measure ad campaigns</strong> (consent) — so I know which
              keywords convert and stop wasting money on the ones that don't.
            </li>
            <li>
              <strong>Respond to inquiries</strong> (consent / contract) — when
              you email me about a project, I process the message to reply and
              potentially work with you.
            </li>
          </ul>
        </Section>

        <Section title="Cookies on this site">
          <p>
            A cookie banner asks for your choice on first visit. You can change
            it any time using the <strong>Cookie settings</strong> link in the
            footer. Your choice is stored in your browser's localStorage — no
            third-party consent service is involved.
          </p>
          <div className="not-prose mt-4 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.04] text-white/60 font-mono uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Vendor</th>
                  <th className="text-left p-3">Category</th>
                  <th className="text-left p-3">Expiry</th>
                </tr>
              </thead>
              <tbody>
                {COOKIES.map((c) => (
                  <tr key={c.name} className="border-t border-white/5 align-top">
                    <td className="p-3 font-mono text-xs text-white/85">{c.name}</td>
                    <td className="p-3 text-white/70">
                      <div>{c.vendor}</div>
                      <div className="text-xs text-white/50 mt-1">{c.purpose}</div>
                    </td>
                    <td className="p-3 text-white/60 whitespace-nowrap">{c.category}</td>
                    <td className="p-3 text-white/60 whitespace-nowrap">{c.expiry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-white/55 mt-3">
            Reject Statistics or Marketing and the corresponding cookies above
            are simply not set. The Necessary cookie above is required for the
            banner to remember your choice and cannot be disabled.
          </p>
        </Section>

        <Section title="Who I share data with">
          <p>
            Limited third parties, each acting as a processor or independent
            controller for the purposes described above:
          </p>
          <ul>
            <li><strong>Vercel</strong> — hosting and CDN for this site.</li>
            <li><strong>Cloudflare</strong> — DNS for the nuttapatk.dev domain.</li>
            <li><strong>Google</strong> — Google Tag Manager, Google Analytics 4, Google Ads (only with consent).</li>
            <li><strong>Cal.com</strong> — scheduling, only if you book an intro call.</li>
          </ul>
        </Section>

        <Section title="Your rights">
          <p>
            Under the EU GDPR, the UK GDPR, and Thailand's PDPA you have the
            right to:
          </p>
          <ul>
            <li>Access the data I hold about you.</li>
            <li>Correct anything inaccurate.</li>
            <li>Request deletion ("right to be forgotten").</li>
            <li>Withdraw consent at any time (via the cookie banner or by emailing me).</li>
            <li>Object to processing or restrict it.</li>
            <li>Lodge a complaint with your data protection authority.</li>
          </ul>
          <p>
            To exercise any of these, email me at{" "}
            <span className="font-mono text-white/85">{EMAIL_DISPLAY}</span>.
            I respond within 30 days.
          </p>
        </Section>

        <Section title="Retention">
          <p>
            Analytics and ad data follow Google's default retention (up to 14
            months unless you ask sooner). Email correspondence is retained as
            long as it remains relevant to an active or potential engagement.
            Contracts and invoices are kept for the period required by Thai tax
            and accounting law.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            I'll update this page when the data I collect or who I share it with
            changes materially. The "Last updated" date at the top reflects the
            most recent revision.
          </p>
        </Section>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      <div className="space-y-3 text-white/75 leading-relaxed [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:space-y-1.5 [&_strong]:text-white [&_em]:text-white/85">
        {children}
      </div>
    </section>
  );
}
