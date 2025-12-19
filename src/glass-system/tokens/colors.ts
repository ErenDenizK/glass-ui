/**
 * Color system using HSL for easy manipulation
 * 
 * Inspired by Material Design 3 - bold, joyful, accessible
 */

export interface ColorToken {
  /** Base color in HSL format */
  base: string
  /** Semi-transparent version for glass backgrounds */
  glass: string
  /** Glow color for interactive effects */
  glow: string
  /** Text color for contrast */
  text: string
  /** Gradient colors for border glow [top, bottom] */
  border: readonly [string, string]
}

export const colors = {
  neutral: {
    base: 'hsl(240, 5%, 15%)',
    glass: 'hsla(240, 5%, 15%, 0.25)',
    glow: 'hsla(240, 10%, 60%, 0.4)',  // Increased saturation + lightness for visibility
    text: 'hsl(240, 21%, 96%)',
    border: ['hsl(240, 5%, 28%)', 'hsl(240, 5%, 22%)'],
  },
  
  primary: {
    base: 'hsl(217, 91%, 60%)',        // Electric blue
    glass: 'hsla(217, 91%, 60%, 0.15)',
    glow: 'hsla(217, 91%, 65%, 0.5)',  // Increased opacity + lightness
    text: 'hsl(217, 100%, 97%)',
    border: ['hsl(217, 91%, 65%)', 'hsl(217, 91%, 50%)'],
  },
  
  success: {
    base: 'hsl(142, 76%, 45%)',        // Vibrant green
    glass: 'hsla(142, 76%, 45%, 0.15)',
    glow: 'hsla(142, 76%, 50%, 0.5)',  // Increased opacity + lightness
    text: 'hsl(142, 76%, 97%)',
    border: ['hsl(142, 76%, 55%)', 'hsl(142, 76%, 35%)'],
  },
  
  danger: {
    base: 'hsl(0, 84%, 60%)',          // Bold red
    glass: 'hsla(0, 84%, 60%, 0.15)',
    glow: 'hsla(0, 84%, 65%, 0.5)',  // Increased opacity + lightness
    text: 'hsl(0, 100%, 97%)',
    border: ['hsl(0, 84%, 65%)', 'hsl(0, 84%, 50%)'],
  },
  
  warning: {
    base: 'hsl(38, 92%, 55%)',         // Warm orange
    glass: 'hsla(38, 92%, 55%, 0.15)',
    glow: 'hsla(38, 92%, 60%, 0.5)',  // Increased opacity + lightness
    text: 'hsl(38, 100%, 97%)',
    border: ['hsl(38, 92%, 65%)', 'hsl(38, 92%, 45%)'],
  },
  
  accent: {
    base: 'hsl(271, 81%, 56%)',        // Playful purple
    glass: 'hsla(271, 81%, 56%, 0.15)',
    glow: 'hsla(271, 81%, 62%, 0.5)',  // Increased opacity + lightness
    text: 'hsl(271, 100%, 97%)',
    border: ['hsl(271, 81%, 66%)', 'hsl(271, 81%, 46%)'],
  },
} as const

export type ColorName = keyof typeof colors

export function getColor(name: ColorName): ColorToken {
  return colors[name]
}

