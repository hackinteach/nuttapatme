import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { hire } from "../../hire-data";
import { trackBookCallClick } from "../../lib/analytics";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
];

export function HireNavbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.7]);
  const bgColor = useTransform(bgOpacity, (v) => `rgba(10,10,15,${v})`);
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <motion.div
        style={{ backgroundColor: bgColor }}
        className="border-b border-white/5 backdrop-blur-md"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* Left: logo */}
          <a href="/" className="flex items-center gap-2 group">
            <span className="relative inline-flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75 pulse-ring" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--color-accent)]" />
            </span>
            <span className="font-mono text-sm tracking-tight text-white/90 group-hover:text-white">
              nuttapatk<span className="text-[var(--color-accent-2)]">.dev</span>
            </span>
          </a>

          {/* Center: anchor links */}
          <ul className="hidden md:flex items-center justify-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="px-3 py-2 text-sm text-white/70 hover:text-white rounded-md transition-colors hover:bg-white/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/"
                className="px-3 py-2 text-sm text-white/50 hover:text-white rounded-md transition-colors hover:bg-white/5"
              >
                Portfolio
              </a>
            </li>
          </ul>

          {/* Right: highlighted CTA + mobile trigger */}
          <div className="flex items-center justify-end gap-2">
            <a
              href={hire.bookingUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackBookCallClick("hire_navbar")}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
            >
              Book a call
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
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block py-2 text-white/80">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/" onClick={() => setOpen(false)} className="block py-2 text-white/80">
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href={hire.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    trackBookCallClick("hire_navbar_mobile");
                    setOpen(false);
                  }}
                  className="block py-2 text-[var(--color-accent-2)] font-medium"
                >
                  Book a call →
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </motion.div>
    </motion.nav>
  );
}
