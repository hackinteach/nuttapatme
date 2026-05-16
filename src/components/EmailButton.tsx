import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";
import { copyEmail, openMail, EMAIL_DISPLAY } from "../lib/email";

type Props = {
  variant?: "primary" | "ghost";
  showLabel?: boolean;
};

export function EmailButton({ variant = "primary", showLabel = true }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const ok = await copyEmail();
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const base =
    "group inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium transition relative overflow-hidden";
  const styles =
    variant === "primary"
      ? "bg-white text-black hover:bg-white/90"
      : "glass text-white hover:bg-white/5";

  return (
    <div className="inline-flex items-center gap-2">
      <button onClick={openMail} className={`${base} ${styles}`}>
        <Mail size={16} />
        {showLabel && (
          <span className="font-mono text-sm" aria-label="email address obfuscated to prevent scraping">
            {EMAIL_DISPLAY}
          </span>
        )}
        <ArrowUpRight
          size={16}
          className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
        />
      </button>
      <button
        onClick={handleCopy}
        aria-label="Copy email"
        className="relative w-11 h-11 grid place-items-center rounded-full glass text-white hover:bg-white/5 transition"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="text-emerald-300"
            >
              <Check size={16} />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <Copy size={16} />
            </motion.span>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-mono text-emerald-300 whitespace-nowrap"
            >
              copied
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
