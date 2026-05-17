import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile } from "../data";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ringScale = useTransform(scrollYProgress, [0, 1], [0.7, 1.2]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

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

      <div className="relative max-w-2xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-2)] mb-4 text-center"
        >
          Get in touch
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-4xl sm:text-6xl font-semibold tracking-tight gradient-text text-center"
        >
          Let's build something.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-white/65 max-w-xl mx-auto text-center"
        >
          Whether it's a Go service, GCP infra to wrangle, or a side-project idea — drop me a line.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10"
        >
          <ContactForm source="portfolio_contact" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex items-center justify-center gap-3 text-sm text-white/55"
        >
          <span>Prefer somewhere else?</span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-white transition"
          >
            <LinkedinIcon width={14} height={14} /> LinkedIn
            <ArrowUpRight size={12} />
          </a>
          <span className="text-white/20">·</span>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-white transition"
          >
            <GithubIcon width={14} height={14} /> GitHub
            <ArrowUpRight size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
