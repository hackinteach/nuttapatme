import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { hire } from "../../hire-data";
import { EmailButton } from "../EmailButton";
import { trackBookCallClick } from "../../lib/analytics";

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ringScale = useTransform(scrollYProgress, [0, 1], [0.7, 1.2]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />
      <motion.div
        aria-hidden
        style={{ scale: ringScale, rotate: ringRotate }}
        className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[70rem] h-[70rem] rounded-full border border-white/5"
      >
        <div className="absolute inset-12 rounded-full border border-white/5" />
        <div className="absolute inset-24 rounded-full border border-white/5" />
        <div className="absolute inset-36 rounded-full border border-white/5" />
      </motion.div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-2)] mb-4"
        >
          Ready to talk?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-4xl sm:text-6xl font-semibold tracking-tight gradient-text"
        >
          Let's de-risk your infra.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-white/70 max-w-xl mx-auto"
        >
          20 minutes. Free. No deck. Walk away with a clearer picture of what to do next —
          whether you hire me or not.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <a
            href={hire.bookingUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackBookCallClick("hire_final_cta")}
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-medium hover:bg-white/90 transition"
          >
            <Calendar size={18} />
            Book a free 20-min intro call
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <p className="text-xs text-white/40 font-mono mt-1">or reach me directly —</p>
          <EmailButton variant="ghost" />
        </motion.div>
      </div>
    </section>
  );
}
