// Anti-scraping helpers. The email is never written to the DOM verbatim
// and never appears as a `mailto:` href until the user actually interacts.

// User/domain are stored ROT13 + reversed. decode() is the inverse.
// Do not document the cleartext in this file — that defeats the purpose
// in a public repo.
const PARTS = {
  u: "ergfnzorj",
  d: "zbp.upnrgavxpnu",
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
