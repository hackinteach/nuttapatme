import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Calendar, ArrowUpRight } from "lucide-react";
import { hire } from "../../hire-data";
import { ContactForm } from "../ContactForm";
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
    <section ref={ref} id="contact" className="relative py-32 overflow-hidden border-t border-white/5">
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

      <div className="relative max-w-2xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-2)] mb-4 text-center"
        >
          Ready to talk?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-4xl sm:text-6xl font-semibold tracking-tight gradient-text text-center"
        >
          Let's de-risk your infra.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-white/70 max-w-xl mx-auto text-center"
        >
          Send me a note about what's stuck — I'll reply within a day with a clearer
          picture of what to do next, whether you hire me or not.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10"
        >
          <ContactForm source="hire_final" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-white/40 font-mono mb-3">or prefer a live call —</p>
          <a
            href={hire.bookingUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackBookCallClick("hire_final_cta")}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-white/85 text-sm font-medium hover:bg-white/5 transition"
          >
            <Calendar size={15} />
            Book a free 20-min intro call
            <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
