import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState } from "react";
import { trackHireMeClick } from "../lib/analytics";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "competitions", label: "Competitions" },
];

/** Build a section href that works whether or not we're on the portfolio.
 *  On `/`: returns `#about` so the click is a pure scroll, no reload.
 *  On `/privacy`: returns `/#about` so the click navigates home and
 *  the browser scrolls to the anchor after load. */
function sectionHref(id: string): string {
  const onPortfolio =
    typeof window === "undefined" ||
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html";
  return onPortfolio ? `#${id}` : `/#${id}`;
}

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.7]);
  const bgColor = useTransform(bgOpacity, (v) => `rgba(10,10,15,${v})`);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.08]);
  const borderColor = useTransform(borderOpacity, (v) => `rgba(255,255,255,${v})`);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const [open, setOpen] = useState(false);

  const logoHref = sectionHref("top");
  const contactHref = sectionHref("contact");

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <motion.div
        style={{ backgroundColor: bgColor, borderColor }}
        className="border-b backdrop-blur-md"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* Left: logo */}
          <a href={logoHref} className="flex items-center gap-2 group">
            <span className="relative inline-flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75 pulse-ring" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--color-accent)]" />
            </span>
            <span className="font-mono text-sm tracking-tight text-white/90 group-hover:text-white">
              nuttapatk<span className="text-[var(--color-accent-2)]">.dev</span>
            </span>
          </a>

          {/* Center: section links */}
          <ul className="hidden md:flex items-center justify-center gap-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={sectionHref(s.id)}
                  className="px-3 py-2 text-sm text-white/70 hover:text-white rounded-md transition-colors hover:bg-white/5"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right: highlighted Hire button + mobile menu trigger */}
          <div className="flex items-center justify-end gap-2">
            <a
              href="/hire"
              onClick={() => trackHireMeClick("portfolio_navbar")}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
            >
              Hire me
            </a>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((o) => !o)}
              className="md:hidden text-white/80 p-2 -mr-2"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? (
                  <path d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <>
                    <path d="M3 6h18" />
                    <path d="M3 12h18" />
                    <path d="M3 18h18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-white/5 bg-black/70 backdrop-blur"
          >
            <ul className="px-6 py-4 grid gap-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={sectionHref(s.id)}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-white/80"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={contactHref}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-white/80"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/hire"
                  onClick={() => {
                    trackHireMeClick("portfolio_navbar_mobile");
                    setOpen(false);
                  }}
                  className="block py-2 text-[var(--color-accent-2)] font-medium"
                >
                  Hire me →
                </a>
              </li>
            </ul>
          </motion.div>
        )}

        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX: progress, transformOrigin: "0% 50%" }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-2)] to-transparent"
        />
      </motion.div>
    </motion.nav>
  );
}
