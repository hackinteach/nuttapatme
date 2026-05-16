import { motion } from "framer-motion";
import { trustedBy, credentials } from "../../hire-data";

export function TrustStrip() {
  return (
    <section className="relative py-14 border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-6 grid gap-10 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
            Shipped production systems across
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {trustedBy.map((c) => (
              <li key={c} className="text-white/85 font-medium">
                {c}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          {credentials.map((c) => (
            <div key={c.label} className="glass rounded-xl p-4">
              <dt className="text-xs font-mono uppercase tracking-wider text-white/40">
                {c.label}
              </dt>
              <dd className="mt-1 text-lg font-semibold text-white">{c.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
