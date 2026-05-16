// Self-hosted consent state — no third-party CMP.
//
// The HTML head sets a default-denied Consent Mode v2 state via gtag()
// before GTM loads. This module stores the user's choice in localStorage
// and forwards it to gtag('consent','update',...) so GTM (and any tags
// inside it gated by Consent Mode) react accordingly.

const STORAGE_KEY = "consent-v1";

/** Bump if the choice shape ever changes — invalidates older records. */
const SCHEMA_VERSION = 1;

export type ConsentChoice = {
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
};

export const ACCEPT_ALL: ConsentChoice = {
  preferences: true,
  statistics: true,
  marketing: true,
};

export const REJECT_ALL: ConsentChoice = {
  preferences: false,
  statistics: false,
  marketing: false,
};

/** Fired when the footer "Cookie settings" link asks the banner to reappear. */
export const CONSENT_RENEW_EVENT = "consent:renew";

type StoredConsent = ConsentChoice & { v: number; ts: number };

export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.v !== SCHEMA_VERSION) return null;
    return {
      preferences: !!parsed.preferences,
      statistics: !!parsed.statistics,
      marketing: !!parsed.marketing,
    };
  } catch {
    return null;
  }
}

export function hasUserDecided(): boolean {
  return getStoredConsent() !== null;
}

function pushConsentUpdate(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  const granted = "granted";
  const denied = "denied";
  const update = {
    ad_storage: choice.marketing ? granted : denied,
    ad_user_data: choice.marketing ? granted : denied,
    ad_personalization: choice.marketing ? granted : denied,
    analytics_storage: choice.statistics ? granted : denied,
    functionality_storage: choice.preferences ? granted : denied,
    personalization_storage: choice.preferences ? granted : denied,
  };
  // gtag is defined inline in the HTML head; this nudge updates the state
  // GTM reads to gate tags.
  window.gtag?.("consent", "update", update);
}

export function submitConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  const record: StoredConsent = { ...choice, v: SCHEMA_VERSION, ts: Date.now() };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // localStorage can throw in private mode / quota — consent still
    // forwards via gtag, just not remembered across sessions.
  }
  pushConsentUpdate(choice);
}

/** Re-apply the stored consent on page load so newly loaded tags get the state. */
export function applyStoredConsent(): void {
  const stored = getStoredConsent();
  if (stored) pushConsentUpdate(stored);
}

/** Footer "Cookie settings" handler — forgets the choice, triggers banner. */
export function openCookieSettings(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
  window.dispatchEvent(new Event(CONSENT_RENEW_EVENT));
}
