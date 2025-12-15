/**
 * Shadow tokens for depth (used with glass effects)
 * 
 * Combines outer shadows with subtle inner highlights
 */

export const shadows = {
  none: 'none',
  
  xs: '0 2px 4px rgba(0, 0, 0, 0.05)',
  
  sm: '0 4px 6px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  
  md: '0 8px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
  
  lg: '0 16px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  
  xl: '0 24px 48px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.25)',
} as const

export type ShadowValue = keyof typeof shadows

