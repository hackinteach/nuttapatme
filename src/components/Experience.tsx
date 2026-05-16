import { motion } from "framer-motion";
import { Section } from "./Section";
import { experience } from "../data";

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Five years across backend, infra & full-stack">
      <div className="relative">
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent sm:-translate-x-1/2" />

        <div className="grid gap-12">
          {experience.map((job, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={job.company + job.period}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="relative grid sm:grid-cols-2 gap-6"
              >
                <div className={`hidden sm:block ${left ? "" : "sm:order-2"}`}>
                  <div className={`pt-4 ${left ? "text-right pr-12" : "pl-12"}`}>
                    <p className="font-mono text-sm text-[var(--color-accent-2)]">{job.period}</p>
                    <p className="text-white/40 text-sm mt-1">{job.location}</p>
                  </div>
                </div>

                <div className={`pl-12 sm:pl-0 ${left ? "sm:order-2 sm:pl-12" : "sm:pr-12"}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="glass rounded-2xl p-6 group"
                  >
                    <div className="flex items-baseline justify-between gap-3 flex-wrap">
                      <h3 className="text-xl font-semibold text-white">{job.company}</h3>
                      <span className="font-mono text-xs text-white/40 sm:hidden">{job.period}</span>
                    </div>
                    <p className="text-[var(--color-accent)] font-medium mt-0.5">{job.role}</p>
                    <ul className="mt-4 space-y-2">
                      {job.bullets.map((b) => (
                        <li key={b} className="text-sm text-white/70 leading-relaxed flex gap-2">
                          <span className="text-[var(--color-accent-2)] mt-1.5">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    {job.stack && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {job.stack.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-white/60 border border-white/10"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="absolute left-4 sm:left-1/2 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--color-accent)] ring-4 ring-[var(--color-bg)]"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
