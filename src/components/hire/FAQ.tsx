import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "../../hire-data";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-24 sm:py-32 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-2)] mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight gradient-text">
            Things clients usually ask.
          </h2>
        </motion.div>

        <ul className="grid gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={f.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="glass rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.02]"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-white text-base">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-white/50 shrink-0"
                  >
                    <Plus size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-white/70 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
