import type { ButtonVariant, ButtonSize } from './types'
import type { GlassConfig, PresetName } from '../../glass-system'

/**
 * Button variant styles
 */
export const variantStyles: Record<ButtonVariant, string> = {
  primary: 'font-semibold text-white',
  secondary: 'font-medium text-white',
  ghost: 'font-medium text-white hover:bg-white/5',
  outline: 'font-medium text-white border-2 border-white/20 hover:border-white/40',
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
  primary: 'button',  // Use button preset
  secondary: { blur: 'sm', opacity: 0.15, borderGlow: false },
  ghost: { blur: 'xs', opacity: 0.05, borderGlow: false },
  outline: { blur: 'sm', opacity: 0.1, borderGlow: true },
}

