import type { Variants, Transition } from 'framer-motion'

/**
 * Material Design 3 Motion Presets
 * 
 * Simple, professional animations for components
 */

// Standard easing curves (converted from CSS to Framer Motion format)
// Framer Motion uses array format [x1, y1, x2, y2] instead of CSS cubic-bezier
const standardEasing = [0.4, 0.0, 0.2, 1]
const emphasizedEasing = [0.2, 0.0, 0, 1]

// Spring physics (Stripe-inspired)
export const springTransitions = {
  // Playful spring for hover
  playful: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
    mass: 0.5,
  } as Transition,
  
  // Snappy spring for tap
  snappy: {
    type: 'spring',
    stiffness: 500,
    damping: 30,
    mass: 0.3,
  } as Transition,
  
  // Gentle spring for subtle interactions
  gentle: {
    type: 'spring',
    stiffness: 300,
    damping: 20,
    mass: 0.8,
  } as Transition,
} as const

// Base transitions
export const transitions = {
  standard: {
    duration: 0.3,
    ease: standardEasing,
  } as Transition,
  
  quick: {
    duration: 0.15,
    ease: standardEasing,
  } as Transition,
  
  emphasized: {
    duration: 0.4,
    ease: emphasizedEasing,
  } as Transition,
  
  // Add spring transitions
  ...springTransitions,
} as const

// Fade animation
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

// Slide up animation
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

// Scale animation
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
}

// Hover animation (for buttons, cards) - Updated for multi-axis movement
export const hoverVariants: Variants = {
  initial: { 
    scale: 1,
    y: 0,
  },
  hover: { 
    scale: 1.02,
    y: -2,
  },
  tap: { 
    scale: 0.98,
    y: 0,
  },
}

// Playful hover (Stripe-style with slight overshoot)
export const playfulHoverVariants: Variants = {
  initial: { 
    scale: 1,
    y: 0,
  },
  hover: { 
    scale: 1.03,
    y: -3,
  },
  tap: { 
    scale: 0.97,
    y: 1,
  },
}

// Combined presets
export const animationPresets = {
  fadeIn: {
    variants: fadeVariants,
    transition: transitions.standard,
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
  },
  
  slideUp: {
    variants: slideUpVariants,
    transition: transitions.emphasized,
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
  },
  
  scale: {
    variants: scaleVariants,
    transition: transitions.emphasized,
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
  },
  
  hover: {
    variants: hoverVariants,
    transition: transitions.quick,
    whileHover: 'hover',
    whileTap: 'tap',
  },
  
  // Playful hover preset
  playfulHover: {
    variants: playfulHoverVariants,
    transition: transitions.playful,
    whileHover: 'hover',
    whileTap: 'tap',
  },
} as const

