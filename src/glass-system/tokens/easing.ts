/**
 * Material Design 3 easing curves.
 *
 * The control points are the single source of truth. The CSS `cubic-bezier()`
 * strings are derived from them, so a curve cannot drift between the
 * stylesheet and the animation layer — which it previously did: both
 * `animation/presets.ts` and `components/Button` re-declared `[0.4, 0, 0.2, 1]`
 * as a literal instead of reading this file.
 *
 * See: https://m3.material.io/styles/motion/easing-and-duration
 */

/**
 * Cubic-bezier control points, in the `[x1, y1, x2, y2]` form Framer Motion
 * and the Web Animations API expect.
 */
export const easingPoints = {
  /** Standard easing - most common, balanced motion */
  standard: [0.4, 0.0, 0.2, 1],
  /** Decelerate - elements entering the screen */
  decelerate: [0.0, 0.0, 0.2, 1],
  /** Accelerate - elements exiting the screen */
  accelerate: [0.4, 0.0, 1, 1],
  /** Emphasized - important state changes */
  emphasized: [0.2, 0.0, 0, 1],
  /** Sharp - quick in/out for temporary elements */
  sharp: [0.4, 0.0, 0.6, 1],
} as const

export type EasingValue = keyof typeof easingPoints

function toCubicBezier(points: readonly number[]): string {
  return `cubic-bezier(${points.join(', ')})`
}

/**
 * The same curves as CSS `cubic-bezier()` strings, for stylesheets and
 * `transition` shorthands.
 */
export const easing = {
  standard: toCubicBezier(easingPoints.standard),
  decelerate: toCubicBezier(easingPoints.decelerate),
  accelerate: toCubicBezier(easingPoints.accelerate),
  emphasized: toCubicBezier(easingPoints.emphasized),
  sharp: toCubicBezier(easingPoints.sharp),
} as const

/**
 * Get appropriate easing for animation type.
 */
export function getEasing(type: 'enter' | 'exit' | 'change' | 'temporary'): string {
  switch (type) {
    case 'enter':
      return easing.decelerate
    case 'exit':
      return easing.accelerate
    case 'change':
      return easing.emphasized
    case 'temporary':
      return easing.sharp
    default:
      return easing.standard
  }
}
