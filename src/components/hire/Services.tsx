import { motion } from "framer-motion";
import { services } from "../../hire-data";
import { Server, Cloud, Compass, Check } from "lucide-react";

const icons = [Server, Cloud, Compass];

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 max-w-3xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-2)] mb-3">
            What I do
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight gradient-text">
            Where I focus.
          </h2>
          <p className="mt-4 text-white/65">
            Not a generalist. These are the engagements where I can move the
            fastest and where I've shipped the most production work.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[i] ?? Server;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 flex flex-col"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/15 text-[var(--color-accent)] grid place-items-center">
                  <Icon size={18} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-1.5 text-sm text-white/55">{s.tagline}</p>

                <ul className="mt-5 space-y-2 flex-1">
                  {s.bullets.map((b) => (
                    <li key={b} className="text-sm text-white/75 leading-relaxed flex gap-2">
                      <Check size={15} className="text-[var(--color-accent-2)] mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <dl className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <dt className="text-white/40 font-mono uppercase tracking-wider">Scope</dt>
                    <dd className="text-white/80 mt-0.5">{s.scope}</dd>
                  </div>
                  <div>
                    <dt className="text-white/40 font-mono uppercase tracking-wider">Timeline</dt>
                    <dd className="text-white/80 mt-0.5">{s.timeline}</dd>
                  </div>
                </dl>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-sm text-white/50 max-w-2xl"
        >
          Working on something that doesn't quite fit one of these? Talk to me anyway —
          if it's not my lane, I'll tell you and point you somewhere better.
        </motion.p>
      </div>
    </section>
  );
}
