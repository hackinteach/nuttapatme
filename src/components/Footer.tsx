import { profile } from "../data";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-3 text-xs text-white/40 font-mono">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>
          Built with React + Framer Motion · hosted at{" "}
          <span className="text-white/60">nuttapatk.dev</span>
        </p>
      </div>
    </footer>
  );
}
