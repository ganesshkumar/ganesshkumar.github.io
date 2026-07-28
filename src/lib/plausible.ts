/**
 * Typed access to the Plausible tracker loaded in the root layout
 * (src/app/layout.tsx). Until the async tracker script finishes loading, calls
 * are buffered on the `window.plausible.q` queue set up there, so events fired
 * early are not lost. See docs/quality-and-growth/analytics-instrumentation.md.
 */

type PlausibleOptions = {
  props?: Record<string, string | number | boolean>;
  callback?: () => void;
};

declare global {
  interface Window {
    plausible?: (event: string, options?: PlausibleOptions) => void;
  }
}

/** Fire a custom Plausible event. Safe no-op during SSR or if analytics is blocked. */
export function trackEvent(event: string, options?: PlausibleOptions): void {
  if (typeof window === "undefined") return;
  window.plausible?.(event, options);
}
