import { profile } from "../data";
import { openCookieSettings } from "../lib/consent";
import { DeployInfo } from "./DeployInfo";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6 grid gap-3 text-xs text-white/40 font-mono">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="/privacy" className="hover:text-white/70">Privacy</a>
            <button
              type="button"
              onClick={openCookieSettings}
              className="hover:text-white/70"
            >
              Cookie settings
            </button>
            <span className="hidden sm:inline text-white/20">·</span>
            <DeployInfo />
          </div>
        </div>
      </div>
    </footer>
  );
}
