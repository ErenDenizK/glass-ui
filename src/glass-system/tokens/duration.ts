/**
 * Material Design 3 duration tokens
 * 
 * Platform-aware: Desktop is ~30% faster than mobile
 * See: https://m3.material.io/styles/motion/easing-and-duration
 */

export const duration = {
  instant: 0,
  short: 100,        // Micro-interactions
  medium: 300,       // DEFAULT - mobile standard
  long: 500,         // Large transitions
  extraLong: 700,    // Dramatic effects (use sparingly)
} as const

export const durationDesktop = {
  instant: 0,
  short: 50,
  medium: 200,       // ~30% faster than mobile
  long: 400,
  extraLong: 600,
} as const

export const durationMobile = {
  instant: 0,
  short: 100,
  medium: 300,       // Standard mobile duration
  long: 500,
  extraLong: 700,
} as const

export type DurationValue = keyof typeof duration

/**
 * Get platform-appropriate duration
 */
export function getDuration(
  value: DurationValue,
  platform: 'mobile' | 'desktop' = 'mobile'
): number {
  const durations = platform === 'desktop' ? durationDesktop : durationMobile
  return durations[value]
}

