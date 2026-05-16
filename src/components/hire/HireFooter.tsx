import { profile } from "../../data";
import { openCookieSettings } from "../../lib/consent";

export function HireFooter() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-3 text-xs text-white/40 font-mono">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <ul className="flex flex-wrap gap-4">
          <li>
            <a href="/" className="hover:text-white/70">Portfolio</a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-white/70">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-white/70">
              GitHub
            </a>
          </li>
          <li>
            <a href="/privacy" className="hover:text-white/70">Privacy</a>
          </li>
          <li>
            <button type="button" onClick={openCookieSettings} className="hover:text-white/70">
              Cookie settings
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
}
