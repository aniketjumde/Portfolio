/** Shared motion curves for this design system. */

/** Slow-out exponential — the primary curve for entrances. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Gentle in-out for ambient / looping motion. */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
} as const;
