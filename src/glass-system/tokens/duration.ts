/**
 * Material Design 3 duration tokens, in milliseconds.
 *
 * NOTE ON RESPONSIVE DURATION
 * ---------------------------
 * `docs/decisions.md` section 5 specified separate mobile and desktop scales.
 * That was never implemented — there was no media-query resolution anywhere in
 * the library, `durationMobile` was a byte-identical duplicate of `duration`,
 * and `getDuration()` had no callers. The unused tables were removed rather
 * than left to imply a feature that does not exist; see `docs/decisions.md`
 * section 5 for the amended record.
 *
 * See: https://m3.material.io/styles/motion/easing-and-duration
 */

export const duration = {
  instant: 0,
  short: 100,        // Micro-interactions
  medium: 300,       // DEFAULT
  long: 500,         // Large transitions
  extraLong: 700,    // Dramatic effects (use sparingly)
} as const

export type DurationValue = keyof typeof duration

/** Duration in seconds, which is the unit Framer Motion transitions take. */
export function durationSeconds(value: DurationValue): number {
  return duration[value] / 1000
}
