// Thin wrapper around Cookiebot's global. Lets components call the
// consent API without TS errors and without each component having to
// know whether Cookiebot has loaded yet.
//
// Cookiebot dashboard must be set to template "Custom" so its default
// banner doesn't render alongside ours. See README/commit notes.

type CookiebotConsent = {
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
  method?: string;
  stamp?: string;
};

type CookiebotApi = {
  consent?: CookiebotConsent;
  consented?: boolean;
  declined?: boolean;
  hasResponse?: boolean;
  renew: () => void;
  show?: () => void;
  hide?: () => void;
  submitCustomConsent: (
    preferences: boolean,
    statistics: boolean,
    marketing: boolean,
  ) => void;
};

declare global {
  interface Window {
    Cookiebot?: CookiebotApi;
  }
}

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

export function hasCMP(): boolean {
  return typeof window !== "undefined" && !!window.Cookiebot;
}

export function hasUserDecided(): boolean {
  const cb = window.Cookiebot;
  if (!cb) return false;
  // hasResponse is the canonical "user has made a choice" flag in Cookiebot v3+.
  // Fall back to consented/declined for older versions.
  return !!(cb.hasResponse ?? cb.consented ?? cb.declined);
}

export function submitConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  window.Cookiebot?.submitCustomConsent(
    choice.preferences,
    choice.statistics,
    choice.marketing,
  );
}

export function openCookieSettings(): void {
  if (typeof window === "undefined") return;
  // On dev/preview the CMP isn't loaded, so this is a noop.
  window.Cookiebot?.renew();
}
