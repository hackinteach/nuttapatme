/// <reference types="vite/client" />

declare module "@fontsource-variable/inter";
declare module "@fontsource-variable/jetbrains-mono";

interface Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}
