import type { ReactNode } from 'react'
import type { BlurValue, OpacityValue, ColorName, RadiusValue, ShadowValue } from '../../tokens'

/**
 * Glass effect configuration
 */
export interface GlassConfig {
  /** Blur intensity (default: 'md') */
  blur?: BlurValue | number
  
  /** Background opacity (default: 0.25) */
  opacity?: OpacityValue | number
  
  /** Enable border glow effect (default: false) */
  borderGlow?: boolean
}

/**
 * GlassContainer component props
 */
export interface GlassContainerProps {
  /**
   * Glass effect configuration
   * - `true`: Use default glass effect (blur: 'md', opacity: 0.25)
   * - `false`: Solid background, no glass effect
   * - `GlassConfig`: Custom glass configuration
   * @default true
   */
  glass?: boolean | GlassConfig
  
  /**
   * Color variant
   * @default 'neutral'
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
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties
  
  /**
   * Children elements
   */
  children: ReactNode
  
  /**
   * HTML element to render as
   * @default 'div'
   */
  as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'nav'
}

