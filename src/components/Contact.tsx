import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile } from "../data";
import { EmailButton } from "./EmailButton";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ringScale = useTransform(scrollYProgress, [0, 1], [0.7, 1.2]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const titleY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />
      <motion.div
        aria-hidden
        style={{ scale: ringScale, rotate: ringRotate }}
        className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[80rem] h-[80rem] rounded-full border border-white/5"
      >
        <div className="absolute inset-12 rounded-full border border-white/5" />
        <div className="absolute inset-24 rounded-full border border-white/5" />
        <div className="absolute inset-36 rounded-full border border-white/5" />
        <div className="absolute inset-48 rounded-full border border-white/5" />
      </motion.div>

      <motion.div style={{ y: titleY }} className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-2)] mb-4"
        >
          Get in touch
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-4xl sm:text-6xl font-semibold tracking-tight gradient-text"
        >
          Let's build something.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-white/65 max-w-xl mx-auto"
        >
          Whether it's a Go service, GCP infra to wrangle, or a side-project idea — drop me a line.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <EmailButton variant="primary" />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-full glass text-white font-medium hover:bg-white/5 transition"
            >
              <LinkedinIcon width={16} height={16} />
              LinkedIn
              <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-full glass text-white font-medium hover:bg-white/5 transition"
            >
              <GithubIcon width={16} height={16} />
              GitHub
              <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
