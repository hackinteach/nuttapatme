// Thin GTM dataLayer wrapper. Components shouldn't reach into
// window.dataLayer directly — call these helpers so events are
// uniformly shaped and GTM triggers stay stable.

type DataLayerEvent = Record<string, unknown> & { event: string };

function push(event: DataLayerEvent): void {
  if (typeof window === "undefined") return;
  // dataLayer is initialized inline in index.html. Falling back is safe.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

/** Fired when a visitor clicks any "Book a call" / Cal.com link. */
export function trackBookCallClick(source: string): void {
  push({ event: "book_call_click", source });
}

/** Fired when a visitor clicks the "Hire me" link from the portfolio. */
export function trackHireMeClick(source: string): void {
  push({ event: "hire_me_click", source });
}

/** Fired when a visitor successfully submits the contact form. */
export function trackContactFormSubmit(source: string): void {
  push({ event: "contact_form_submit", source });
}
