import { motion } from "framer-motion";
import { Section } from "./Section";
import { competitions } from "../data";
import { Trophy } from "lucide-react";

export function Competitions() {
  return (
    <Section
      id="competitions"
      eyebrow="Hackathons"
      title="Competitions"
      subtitle="A few weekends spent racing the clock with friends."
    >
      <div className="grid md:grid-cols-2 gap-5">
        {competitions.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-6 relative"
          >
            {c.highlight && (
              <span className="absolute -top-2.5 -right-2.5 text-[11px] font-mono px-2.5 py-1 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 text-amber-200 border border-amber-400/30">
                {c.highlight}
              </span>
            )}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-400/15 text-amber-300 grid place-items-center shrink-0">
                <Trophy size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white">{c.title}</h3>
                <p className="text-sm text-white/55 mt-0.5">
                  {c.role} · {c.host}
                </p>
                <p className="font-mono text-xs text-[var(--color-accent-2)] mt-1">{c.date}</p>
                <ul className="mt-3 space-y-1.5">
                  {c.bullets.map((b) => (
                    <li key={b} className="text-sm text-white/70 flex gap-2">
                      <span className="text-amber-300 mt-1.5">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
