/**
 * Opacity tokens for glass backgrounds
 * 
 * Full range 0-1 to support both glass and solid backgrounds.
 * Glass effect is OPTIONAL - users can use opacity: 1 for solid.
 */

export const opacity = {
  transparent: 0,
  subtle: 0.05,      // Very light glass (backgrounds)
  light: 0.1,        // Light glass (cards)
  normal: 0.25,      // DEFAULT - standard glass (buttons)
  medium: 0.5,       // Medium glass (navigation)
  strong: 0.7,       // Strong glass (modals)
  opaque: 0.9,       // Almost solid
  solid: 1,          // Completely solid (no glass)
} as const

export type OpacityValue = keyof typeof opacity

/**
 * Get opacity value from token or number
 */
export function getOpacity(value: OpacityValue | number): number {
  if (typeof value === 'number') {
    return Math.max(0, Math.min(1, value))
  }
  return opacity[value]
}

