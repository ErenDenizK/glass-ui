/**
 * Blur tokens for glass effects
 * 
 * IMPORTANT: Max blur is 20px due to exponential performance cost beyond this value.
 * See DECISIONS.md#4-performance-blur-limits
 */

export const MAX_BLUR = 20 // px - Hard limit

export const blur = {
  none: '0px',
  xs: '4px',     // Minimal (stats, subtle effects)
  sm: '8px',     // Cards, light glass
  md: '12px',    // DEFAULT - buttons, modals (optimal)
  lg: '20px',    // MAX - overlays, backgrounds
} as const

export const blurMobile = {
  none: '0px',
  xs: '2px',     // Half of desktop
  sm: '4px',
  md: '8px',     // Conservative for mobile
  lg: '12px',    // MAX for mobile
} as const

export type BlurValue = keyof typeof blur
export type BlurMobileValue = keyof typeof blurMobile

/**
 * Validates blur value and enforces maximum limit
 * @param value - Blur value in pixels
 * @returns Clamped value within safe range
 */
export function validateBlur(value: number): number {
  if (value > MAX_BLUR) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `Blur value ${value}px exceeds maximum ${MAX_BLUR}px. ` +
        `High blur values cause exponential performance cost. ` +
        `Clamping to ${MAX_BLUR}px. See: DECISIONS.md#4-performance-blur-limits`
      )
    }
    return MAX_BLUR
  }
  return Math.max(0, value)
}

