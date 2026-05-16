import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, subtitle, children }: Props) {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start 0.9", "end 0.1"],
  });
  // Apple-style: title parallaxes slightly and fades in as the section enters view.
  const titleY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section id={id} className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={headerRef} style={{ y: titleY, opacity: titleOpacity }} className="mb-12 sm:mb-16">
          {eyebrow && (
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-2)] mb-3">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight gradient-text">
            {title}
          </h2>
          {subtitle && <p className="mt-4 text-white/60 max-w-2xl">{subtitle}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
