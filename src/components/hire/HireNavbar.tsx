import { motion, useScroll, useTransform } from "framer-motion";
import { hire } from "../../hire-data";

export function HireNavbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.7]);
  const bgColor = useTransform(bgOpacity, (v) => `rgba(10,10,15,${v})`);

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
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <span className="relative inline-flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75 pulse-ring" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--color-accent)]" />
            </span>
            <span className="font-mono text-sm tracking-tight text-white/90 group-hover:text-white">
              nuttapatk<span className="text-[var(--color-accent-2)]">.dev</span>
            </span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href="/"
              className="hidden sm:inline-flex px-3 py-2 text-sm text-white/70 hover:text-white rounded-md transition-colors hover:bg-white/5"
            >
              Portfolio
            </a>
            <a
              href={hire.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
            >
              Book a call
            </a>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
