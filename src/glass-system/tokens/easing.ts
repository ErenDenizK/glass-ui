/**
 * Material Design 3 easing curves
 * 
 * Based on official Material motion guidelines
 * See: https://m3.material.io/styles/motion/easing-and-duration
 */

export const easing = {
  /** Standard easing - most common, balanced motion */
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  
  /** Decelerate - elements entering the screen */
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  
  /** Accelerate - elements exiting the screen */
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
  
  /** Emphasized - important state changes */
  emphasized: 'cubic-bezier(0.2, 0.0, 0, 1)',
  
  /** Sharp - quick in/out for temporary elements */
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
} as const

export type EasingValue = keyof typeof easing

/**
 * Get appropriate easing for animation type
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

