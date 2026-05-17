import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, AlertCircle } from "lucide-react";
import { trackContactFormSubmit } from "../lib/analytics";
import { EMAIL_DISPLAY, copyEmail } from "../lib/email";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  /** Where this form lives — tagged on the dataLayer event for funnel analysis. */
  source: "portfolio_contact" | "hire_final" | string;
  /** Optional helper text shown above the form. */
  hint?: string;
};

export function ContactForm({ source, hint }: Props) {
  // Captured once on mount. Server rejects submissions faster than MIN_DWELL_MS.
  const renderedAt = useMemo(() => Date.now(), []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _website: honeypot,
          _renderedAt: renderedAt,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? `HTTP ${res.status}`);
      }
      trackContactFormSubmit(source);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  }

  async function handleCopyEmail() {
    const ok = await copyEmail();
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-300 grid place-items-center mx-auto mb-3">
          <Check size={22} />
        </div>
        <h3 className="text-lg font-semibold text-white">Thanks — got it.</h3>
        <p className="mt-2 text-sm text-white/65">
          I read every message and usually reply within a day.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-5 sm:p-6 grid gap-4 text-left">
      {hint && <p className="text-sm text-white/60">{hint}</p>}

      {/* Honeypot — bots fill this; humans don't see it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label>
          Don't fill this if you're human
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Name" required>
          <input
            type="text"
            required
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className={inputCls}
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            required
            maxLength={200}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Subject">
        <input
          type="text"
          maxLength={200}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Project inquiry, audit request, just saying hi…"
          className={inputCls}
        />
      </Field>

      <Field label="Message" required>
        <textarea
          required
          maxLength={5000}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputCls} resize-y min-h-[120px]`}
        />
      </Field>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-200"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-red-100">Couldn't send the message.</p>
              <p className="text-red-200/80 text-xs mt-0.5">
                {errorMsg ?? "Something went wrong."} You can email me directly at{" "}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="font-mono underline hover:text-white"
                >
                  {EMAIL_DISPLAY}
                </button>
                {copied && <span className="ml-2 text-emerald-300">copied!</span>}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-xs text-white/40">
          By sending, you accept the{" "}
          <a href="/privacy" className="underline hover:text-white/70">
            privacy policy
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-medium hover:bg-white/90 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          <Send size={16} />
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-lg bg-white/[0.03] border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/60 focus:border-transparent transition";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-mono uppercase tracking-wider text-white/50">
        {label}
        {required && <span className="text-[var(--color-accent-2)] ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}
