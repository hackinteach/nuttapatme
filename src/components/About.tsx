import { motion } from "framer-motion";
import { Section } from "./Section";
import { profile, skills, certifications, education } from "../data";
import { GraduationCap, Award } from "lucide-react";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="A backend engineer who likes shipping things">
      <div className="grid lg:grid-cols-5 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 glass rounded-2xl p-8"
        >
          <p className="text-lg leading-relaxed text-white/80">{profile.blurb}</p>

          <div className="mt-8 grid gap-6">
            <div className="flex items-start gap-3">
              <div className="mt-1 w-9 h-9 rounded-lg bg-[var(--color-accent)]/15 text-[var(--color-accent)] grid place-items-center shrink-0">
                <GraduationCap size={18} />
              </div>
              <div>
                <h3 className="font-medium text-white">{education.school}</h3>
                <p className="text-sm text-white/60">{education.degree}</p>
                <p className="text-xs font-mono text-white/40 mt-1">{education.period}</p>
                <p className="text-xs text-[var(--color-accent-2)] mt-1">{education.honors}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 w-9 h-9 rounded-lg bg-[var(--color-accent-2)]/15 text-[var(--color-accent-2)] grid place-items-center shrink-0">
                <Award size={18} />
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">Certifications</h3>
                <ul className="grid gap-1.5">
                  {certifications.map((c) => (
                    <li key={c.title} className="text-sm text-white/70">
                      <span className="text-white">{c.title}</span>{" "}
                      <span className="text-white/40">— {c.org}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2 grid gap-4"
        >
          {skills.map((group, gi) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.05 }}
              className="glass rounded-xl p-4"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-white/40 mb-3">
                {group.group}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: gi * 0.05 + i * 0.03 }}
                    whileHover={{ y: -2 }}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white/80"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
