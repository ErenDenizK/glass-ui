/**
 * Border radius tokens (Swiss design inspired - clean corners)
 */

export const radius = {
  none: '0',
  sm: '0.25rem',    // 4px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px - DEFAULT
  xl: '1rem',       // 16px
  '2xl': '1.5rem',  // 24px
  full: '9999px',   // Fully rounded
} as const

export type RadiusValue = keyof typeof radius

