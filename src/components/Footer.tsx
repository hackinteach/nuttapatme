import { profile } from "../data";
import { openCookieSettings } from "../lib/consent";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-3 text-xs text-white/40 font-mono">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={openCookieSettings}
            className="hover:text-white/70"
          >
            Cookie settings
          </button>
          <span className="hidden sm:inline text-white/20">·</span>
          <p>
            Built with React + Framer Motion · hosted at{" "}
            <span className="text-white/60">nuttapatk.dev</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
