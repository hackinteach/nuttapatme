// Anti-scraping helpers. The email is never written to the DOM verbatim
// and never appears as a `mailto:` href until the user actually interacts.

const PARTS = {
  // Stored ROT13 + reversed so static crawlers reading bundled JS can't grep for it either.
  // Original: "webmaster" / "hackinteach.com"
  u: "ergfnzorj", // "webmaster" reversed then rot13 -> see decode()
  d: "zbp.upnrgavxpnu", // "hackinteach.com" reversed then rot13
};

function rot13(s: string) {
  return s.replace(/[a-z]/gi, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}

function decode(s: string) {
  return rot13(s).split("").reverse().join("");
}

export function getEmail(): string {
  return `${decode(PARTS.u)}@${decode(PARTS.d)}`;
}

/** Human-friendly display that scrapers won't pattern-match. */
export const EMAIL_DISPLAY = "webmaster [at] hackinteach [dot] com";

/** Opens the user's mail client without a static mailto in the DOM. */
export function openMail() {
  if (typeof window === "undefined") return;
  window.location.href = `mailto:${getEmail()}`;
}

/** Copies the real email to clipboard. Returns true on success. */
export async function copyEmail(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(getEmail());
    return true;
  } catch {
    return false;
  }
}
