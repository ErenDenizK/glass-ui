import type { ButtonVariant, ButtonSize } from './types'
import type { GlassConfig, PresetName } from '../../glass-system'

/**
 * Button variant styles
 */
export const variantStyles: Record<ButtonVariant, string> = {
  primary: 'font-semibold text-white',
  secondary: 'font-medium text-white hover:bg-white/10',
  ghost: 'font-medium text-white hover:bg-white/10',
  outline: 'font-medium text-white border border-white/30 hover:border-white/60',
}

/**
 * Button size styles (padding, text size)
 */
export const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
}

/**
 * Icon-only button sizes (square)
 */
export const iconOnlySizes: Record<ButtonSize, string> = {
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-3',
  xl: 'p-4',
}

/**
 * Glass preset per variant
 */
export const variantGlassDefaults: Record<ButtonVariant, boolean | GlassConfig | PresetName> = {
  primary: 'button', // blur md, opacity 0.25, rim glow
  secondary: { blur: 'sm', opacity: 0.15, borderGlow: false },
  ghost: { blur: 'xs', opacity: 0.05, borderGlow: false },
  // No rim glow: the variant's identity is its border, and the glow's
  // pseudo-element border would sit on top of it.
  outline: { blur: 'sm', opacity: 0.08, borderGlow: false },
}

