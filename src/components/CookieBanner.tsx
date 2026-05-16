import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import {
  ACCEPT_ALL,
  REJECT_ALL,
  hasUserDecided,
  submitConsent,
  type ConsentChoice,
} from "../lib/consent";

// Cookiebot fires these custom events on window. We use them to know when
// the API is ready and to react to a renewal triggered from the footer.
const EVT_READY = "CookiebotOnDialogInit";
const EVT_DISPLAY = "CookiebotOnDialogDisplay";
const EVT_ACCEPT = "CookiebotOnAccept";
const EVT_DECLINE = "CookiebotOnDecline";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [choice, setChoice] = useState<ConsentChoice>({
    preferences: false,
    statistics: false,
    marketing: false,
  });

  useEffect(() => {
    // If the user has already decided, stay hidden. If Cookiebot is missing
    // (dev/preview/adblocked), also stay hidden — the page already works
    // because the default consent state is "denied everything".
    function evaluate() {
      if (typeof window === "undefined") return;
      if (!window.Cookiebot) return;
      setVisible(!hasUserDecided());
    }

    // Initial check + react to Cookiebot lifecycle events.
    evaluate();
    window.addEventListener(EVT_READY, evaluate);
    window.addEventListener(EVT_DISPLAY, () => setVisible(true)); // footer "Cookie settings" triggers renew -> display
    window.addEventListener(EVT_ACCEPT, () => setVisible(false));
    window.addEventListener(EVT_DECLINE, () => setVisible(false));

    return () => {
      window.removeEventListener(EVT_READY, evaluate);
    };
  }, []);

  function apply(c: ConsentChoice) {
    submitConsent(c);
    setVisible(false);
    setExpanded(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 sm:inset-x-auto sm:bottom-6 sm:right-6 z-[100] px-4 sm:px-0"
        >
          <div className="max-w-md mx-auto sm:mx-0 glass rounded-2xl p-5 shadow-2xl border-white/10 backdrop-blur-xl bg-black/80">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--color-accent)]/15 text-[var(--color-accent)] grid place-items-center shrink-0">
                <Cookie size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">
                  Cookies, briefly.
                </p>
                <p className="mt-1 text-sm text-white/65 leading-relaxed">
                  I use a few to measure site traffic and ad performance. Necessary
                  cookies keep the site running.{" "}
                  <a
                    href="/privacy"
                    className="text-[var(--color-accent-2)] hover:underline"
                  >
                    Details
                  </a>
                  .
                </p>
              </div>
              <button
                aria-label="Close"
                onClick={() => apply(REJECT_ALL)}
                className="text-white/40 hover:text-white/80 -mt-0.5 -mr-1 shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 grid gap-2">
                    <CategoryRow
                      label="Necessary"
                      description="Required for the site to function. Always on."
                      checked
                      disabled
                    />
                    <CategoryRow
                      label="Statistics"
                      description="Anonymous traffic measurement (GA4)."
                      checked={choice.statistics}
                      onChange={(v) =>
                        setChoice((c) => ({ ...c, statistics: v }))
                      }
                    />
                    <CategoryRow
                      label="Marketing"
                      description="Ad performance tracking (Google Ads)."
                      checked={choice.marketing}
                      onChange={(v) =>
                        setChoice((c) => ({ ...c, marketing: v }))
                      }
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-4 flex flex-wrap gap-2">
              {expanded ? (
                <>
                  <button
                    onClick={() => apply(choice)}
                    className="flex-1 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
                  >
                    Save choices
                  </button>
                  <button
                    onClick={() => apply(ACCEPT_ALL)}
                    className="px-4 py-2 rounded-full glass text-white text-sm font-medium hover:bg-white/5 transition"
                  >
                    Accept all
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => apply(ACCEPT_ALL)}
                    className="flex-1 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
                  >
                    Accept all
                  </button>
                  <button
                    onClick={() => apply(REJECT_ALL)}
                    className="px-4 py-2 rounded-full glass text-white text-sm font-medium hover:bg-white/5 transition"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => setExpanded(true)}
                    className="px-4 py-2 rounded-full text-white/70 text-sm font-medium hover:text-white transition"
                  >
                    Customize
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type RowProps = {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
};

function CategoryRow({ label, description, checked, disabled, onChange }: RowProps) {
  return (
    <label
      className={`flex items-start gap-3 rounded-lg p-3 border border-white/5 ${
        disabled ? "opacity-70" : "hover:bg-white/[0.02] cursor-pointer"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 accent-[var(--color-accent)]"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-white/55">{description}</p>
      </div>
    </label>
  );
}
