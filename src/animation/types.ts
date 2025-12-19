import type { Variants, Transition } from 'framer-motion'

/**
 * Animation preset names
 */
export type AnimationPreset = 
  | 'fadeIn'
  | 'slideUp'
  | 'scale'
  | 'hover'

/**
 * Animation configuration
 */
export interface AnimationConfig {
  variants?: Variants
  transition?: Transition
  initial?: string | boolean
  animate?: string
  exit?: string
  whileHover?: string | object
  whileTap?: string | object
}

