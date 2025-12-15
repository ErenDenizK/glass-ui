/**
 * Blur tokens for glass effects
 * 
 * IMPORTANT: Max blur is 20px due to exponential performance cost beyond this value.
 * See DECISIONS.md#4-performance-blur-limits
 */

export const MAX_BLUR = 20 // px - Hard limit

export const blur = {
  none: '0px',
  subtle: '2px',  // Barely visible, very soft
  xs: '4px',      // Light blur
  sm: '6px',      // Soft blur
  md: '10px',     // DEFAULT - optimal blur
  lg: '16px',     // Heavy blur
  max: '20px',    // MAX - extreme blur (performance limit)
} as const

export const blurMobile = {
  none: '0px',
  subtle: '1px',
  xs: '2px',
  sm: '4px',
  md: '6px',      // Conservative for mobile
  lg: '10px',
  max: '12px',     // MAX for mobile
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

