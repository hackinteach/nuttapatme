import { motion } from "framer-motion";
import { Section } from "./Section";
import { projects } from "../data";
import { ArrowUpRight, Folder } from "lucide-react";

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected Work"
      title="Projects"
      subtitle="A mix of production systems, school work, and weekend experiments."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p, i) => {
          const Wrapper = p.url ? "a" : "div";
          const wrapperProps = p.url
            ? { href: p.url, target: "_blank", rel: "noreferrer" }
            : {};
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <Wrapper
                {...wrapperProps}
                className="group block h-full glass rounded-2xl p-6 hover:border-white/20 transition-all relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[var(--color-accent)]/10 via-transparent to-[var(--color-accent-2)]/10 pointer-events-none" />

                <div className="relative flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/15 text-[var(--color-accent)] grid place-items-center">
                    <Folder size={18} />
                  </div>
                  {p.url && (
                    <ArrowUpRight
                      size={18}
                      className="text-white/40 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                    />
                  )}
                </div>

                <h3 className="relative text-lg font-semibold text-white">{p.title}</h3>
                <p className="relative text-sm text-white/60 mt-1.5">{p.summary}</p>

                <ul className="relative mt-4 space-y-1.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="text-xs text-white/55 leading-relaxed flex gap-2">
                      <span className="text-[var(--color-accent-2)] mt-1">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded text-white/60"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Wrapper>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
