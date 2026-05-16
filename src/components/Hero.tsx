import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Mail, MapPin, ArrowDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile } from "../data";
import { openMail } from "../lib/email";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Apple-style parallax: content drifts up, background drifts down, content fades & scales
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const orbA = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const orbB = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0 grid-bg pointer-events-none"
      />

      <motion.div
        aria-hidden
        style={{ y: orbA }}
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[var(--color-accent)]/20 blur-3xl"
      >
        <motion.div
          className="w-full h-full"
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ y: orbB }}
        className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-[var(--color-accent-2)]/15 blur-3xl"
      >
        <motion.div
          className="w-full h-full"
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative max-w-6xl mx-auto px-6 pt-24 w-full"
      >
        <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-mono text-white/80">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for new projects
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] gradient-text"
          >
            {profile.name.split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-3">
                {word}
              </span>
            ))}
          </motion.h1>

          <motion.p variants={item} className="text-xl sm:text-2xl text-white/70 max-w-2xl">
            {profile.title} — {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-3 items-center text-sm text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} /> {profile.location}
            </span>
            <span className="text-white/20">·</span>
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">
              <GithubIcon width={14} height={14} /> {profile.alias}
            </a>
            <span className="text-white/20">·</span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">
              <LinkedinIcon width={14} height={14} /> LinkedIn
            </a>
            <span className="text-white/20">·</span>
            <button
              type="button"
              onClick={openMail}
              className="inline-flex items-center gap-1.5 hover:text-white cursor-pointer"
            >
              <Mail size={14} /> email
            </button>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap gap-3 pt-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition"
            >
              See projects
              <ArrowDown size={16} className="transition group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass text-white font-medium hover:bg-white/5 transition"
            >
              Get in touch
            </a>
            <a
              href="/hire"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass text-white font-medium hover:bg-white/5 transition"
            >
              Hire me →
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/40 text-xs flex flex-col items-center gap-2"
          >
            <span className="font-mono tracking-widest">SCROLL</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
