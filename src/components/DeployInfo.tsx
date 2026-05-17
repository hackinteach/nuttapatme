// Footer line surfacing build metadata. Reads compile-time constants
// injected by Vite's `define` (see vite.config.ts). Updates live for the
// "deployed N ago" label so a long-open tab gradually ages.

import { useEffect, useState } from "react";

function relativeTime(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  if (!Number.isFinite(ms) || ms < 0) return "just now";
  const s = Math.floor(ms / 1000);
  if (s < 45) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toISOString().slice(0, 10);
}

export function DeployInfo() {
  const [ago, setAgo] = useState(() => relativeTime(__BUILD_TIME__));

  useEffect(() => {
    const id = setInterval(() => setAgo(relativeTime(__BUILD_TIME__)), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <a
      href="/api/status"
      title={`Build: ${__BUILD_BRANCH__}@${__BUILD_SHA__} · ${__BUILD_TIME__}`}
      className="group inline-flex items-center gap-1.5 hover:text-white/70 transition-colors"
    >
      <span className="relative inline-flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      <span>
        {__BUILD_BRANCH__}@<span className="text-white/60 group-hover:text-white/80">{__BUILD_SHA__}</span>
      </span>
      <span className="text-white/30">·</span>
      <span>deployed {ago}</span>
    </a>
  );
}
