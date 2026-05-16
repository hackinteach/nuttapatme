import { motion } from "framer-motion";
import { GraduationCap, MessageCircle, ArrowRight } from "lucide-react";
import { advisory, hire } from "../../hire-data";
import { trackBookCallClick } from "../../lib/analytics";

const icons = [GraduationCap, MessageCircle];

export function Advisory() {
  return (
    <section className="relative py-16 sm:py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-3xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-2)] mb-3">
            Also work with teams on
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight gradient-text">
            Training & advisory work.
          </h2>
          <p className="mt-3 text-white/60">
            Not ready for a full execution engagement? These shorter formats let me
            help your team without a long commitment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {advisory.map((s, i) => {
            const Icon = icons[i] ?? GraduationCap;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 flex flex-col"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-2)]/15 text-[var(--color-accent-2)] grid place-items-center shrink-0">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                </div>
                <p className="mt-2 text-sm text-white/55">{s.tagline}</p>

                <ul className="mt-5 space-y-2 flex-1">
                  {s.bullets.map((b) => (
                    <li key={b} className="text-sm text-white/75 leading-relaxed flex gap-2">
                      <span className="text-[var(--color-accent-2)] mt-1">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-4 border-t border-white/5">
                  <p className="text-xs font-mono uppercase tracking-wider text-white/40 mb-1">
                    Format
                  </p>
                  <p className="text-sm text-white/80">{s.format}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <a
            href={hire.bookingUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackBookCallClick("hire_advisory")}
            className="group inline-flex items-center gap-1.5 text-sm text-white/75 hover:text-white"
          >
            Tell me what you need
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
