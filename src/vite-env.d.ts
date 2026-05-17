/// <reference types="vite/client" />

declare module "@fontsource-variable/inter";
declare module "@fontsource-variable/jetbrains-mono";

interface Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}

// Vite `define` injects these at build time. See vite.config.ts.
declare const __BUILD_SHA__: string;
declare const __BUILD_BRANCH__: string;
declare const __BUILD_TIME__: string;
