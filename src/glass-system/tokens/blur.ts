import { isDevEnvironment } from '../../utils/env'

/**
 * Blur tokens for glass effects
 * 
 * IMPORTANT: Max blur is 20px due to exponential performance cost beyond this value.
 * See docs/decisions.md section 4 (Performance: Blur Limits)
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

export type BlurValue = keyof typeof blur

/**
 * Validates blur value and enforces maximum limit
 * @param value - Blur value in pixels
 * @returns Clamped value within safe range
 */
export function validateBlur(value: number): number {
  if (value > MAX_BLUR) {
    if (isDevEnvironment()) {
      console.warn(
        `Blur value ${value}px exceeds maximum ${MAX_BLUR}px. ` +
        `High blur values cause exponential performance cost. ` +
        `Clamping to ${MAX_BLUR}px. See: docs/decisions.md section 4`
      )
    }
    return MAX_BLUR
  }
  return Math.max(0, value)
}

