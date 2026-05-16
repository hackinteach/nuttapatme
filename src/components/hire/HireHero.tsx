import { motion, type Variants } from "framer-motion";
import { Calendar, ArrowRight, Check } from "lucide-react";
import { hire } from "../../hire-data";
import { trackBookCallClick } from "../../lib/analytics";
import { TechOrbit } from "./TechOrbit";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const wins = [
  "CKAD + GitOps certified",
  "5+ years in production",
  "Async-friendly (UTC+7)",
];

export function HireHero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <motion.div
        aria-hidden
        className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[var(--color-accent)]/20 blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-32 -right-20 w-[28rem] h-[28rem] rounded-full bg-[var(--color-accent-2)]/15 blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 w-full grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
        <motion.div variants={container} initial="hidden" animate="show" className="grid gap-7">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-mono text-white/80">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {hire.capacity}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] gradient-text max-w-4xl"
          >
            Senior DevOps & Kubernetes engineer for hire.
          </motion.h1>

          <motion.p variants={item} className="text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
            I help product teams ship on GCP and Kubernetes — without hiring a full platform crew.
            Terraform, GitOps, CI/CD pipelines, and migrations that actually finish on time.
          </motion.p>

          <motion.ul variants={item} className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
            {wins.map((w) => (
              <li key={w} className="inline-flex items-center gap-1.5">
                <Check size={16} className="text-[var(--color-accent-2)]" />
                {w}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="flex flex-wrap gap-3 pt-4">
            <a
              href={hire.bookingUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackBookCallClick("hire_hero")}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-medium hover:bg-white/90 transition"
            >
              <Calendar size={18} />
              Book a free 20-min intro call
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass text-white font-medium hover:bg-white/5 transition"
            >
              See what I do
            </a>
          </motion.div>

          <motion.p variants={item} className="text-xs text-white/40 font-mono">
            No sales call. No deck. We talk through your problem and figure out if I'm the right fit.
          </motion.p>
        </motion.div>

        {/* Tech-stack orbital — desktop only. Below lg, hero is single column. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block relative"
        >
          <TechOrbit />
        </motion.div>
      </div>
    </section>
  );
}
