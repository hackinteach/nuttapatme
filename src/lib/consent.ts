// Thin wrapper around Cookiebot's global. Lets components call
// openCookieSettings() without TS errors and without each component
// having to know whether Cookiebot has loaded yet.

type CookiebotApi = {
  renew: () => void;
  show?: () => void;
  hide?: () => void;
  consent?: {
    necessary: boolean;
    preferences: boolean;
    statistics: boolean;
    marketing: boolean;
  };
};

declare global {
  interface Window {
    Cookiebot?: CookiebotApi;
  }
}

export function hasCMP(): boolean {
  return typeof window !== "undefined" && !!window.Cookiebot;
}

export function openCookieSettings(): void {
  if (typeof window === "undefined") return;
  // On dev/preview the CMP isn't loaded, so this is a noop.
  window.Cookiebot?.renew();
}
