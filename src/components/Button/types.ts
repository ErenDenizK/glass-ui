import type { ReactNode, ButtonHTMLAttributes } from 'react'
import type { ColorName, RadiusValue, ShadowValue } from '../../glass-system/tokens'
import type { PresetName } from '../../glass-system/presets/types'
import type { GlassConfig } from '../../glass-system/primitives/GlassContainer/types'

/**
 * Button variants
 */
export type ButtonVariant = 
  | 'primary'    // Solid glass, most prominent
  | 'secondary'  // Medium glass, balanced
  | 'ghost'      // Minimal glass, subtle
  | 'outline'    // Border emphasis, transparent

/**
 * Button sizes
 */
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

/**
 * Icon position
 */
export type IconPosition = 'leading' | 'trailing'

/**
 * Button component props
 */
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /**
   * Button variant style
   * @default 'primary'
   */
  variant?: ButtonVariant
  
  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize
  
  /**
   * Glass effect configuration
   * @default 'button' preset
   */
  glass?: boolean | GlassConfig | PresetName
  
  /**
   * Color variant
   * @default 'primary'
   */
  color?: ColorName
  
  /**
   * Border radius
   * @default 'lg'
   */
  radius?: RadiusValue
  
  /**
   * Shadow depth
   * @default 'sm'
   */
  shadow?: ShadowValue
  
  /**
   * Leading icon (before text)
   */
  leadingIcon?: ReactNode
  
  /**
   * Trailing icon (after text)
   */
  trailingIcon?: ReactNode
  
  /**
   * Icon-only mode (no text)
   */
  iconOnly?: boolean
  
  /**
   * Loading state (shows spinner, disables interaction)
   * @default false
   */
  loading?: boolean
  
  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean
  
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Button content
   */
  children?: ReactNode
}

