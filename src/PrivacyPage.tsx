import { useEffect, useRef } from "react";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { EMAIL_DISPLAY } from "./lib/email";

// Last reviewed date — bump when the policy materially changes.
const LAST_UPDATED = "May 2026";

export function PrivacyPage() {
  const declRef = useRef<HTMLDivElement>(null);

  // Inject the Cookiebot-generated cookie list once the page is mounted.
  // Cookiebot serves a per-CBID script at /CBID/cd.js that renders the
  // current cookie table into wherever the script tag is placed.
  useEffect(() => {
    const host = window.location.hostname;
    if (host !== "nuttapatk.dev" && host !== "www.nuttapatk.dev") return;
    if (!declRef.current || declRef.current.querySelector("#CookieDeclaration")) return;

    const s = document.createElement("script");
    s.id = "CookieDeclaration";
    // TODO: replace YOUR_COOKIEBOT_CBID with your real CBID
    s.src = "https://consent.cookiebot.com/YOUR_COOKIEBOT_CBID/cd.js";
    s.type = "text/javascript";
    s.async = true;
    declRef.current.appendChild(s);
  }, []);

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
            footer. The current list of cookies actually set on this site (kept
            up to date automatically by Cookiebot):
          </p>
          <div ref={declRef} className="not-prose mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white/70 min-h-[80px]">
            <p className="text-white/40">
              Cookie list loads from Cookiebot. On dev/preview, this stays empty.
            </p>
          </div>
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
            <li><strong>Cookiebot (Cybot A/S)</strong> — consent management.</li>
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
