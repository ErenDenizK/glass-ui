import type { ReactNode } from 'react'
import type { BlurValue, OpacityValue, ColorName, RadiusValue, ShadowValue } from '../../tokens'
import type { PresetName } from '../../presets/types'

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
 * Panel preset names
 */
export type PanelPreset = 'light' | 'medium' | 'heavy'

/**
 * Button preset names
 */
export type ButtonPreset = 'solid' | 'glass' | 'minimal'

/**
 * GlassContainer component props
 */
export interface GlassContainerProps {
  /**
   * Glass effect configuration
   * - `true`: Use default glass effect (blur: 'md', opacity: 0.25)
   * - `false`: Solid background, no glass effect
   * - `GlassConfig`: Custom glass configuration
   * - `PresetName`: Use context-aware preset
   * @default true
   */
  glass?: boolean | GlassConfig | PresetName
  
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
  as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'nav' | 'button'
  
  /**
   * Disabled state (for button elements)
   */
  disabled?: boolean
  
  /**
   * Layer depth (1 = outermost, 2 = inner, 3 = innermost)
   * Auto-adjusts opacity/blur for nested glass
   */
  layer?: 1 | 2 | 3
  
  /**
   * Panel preset (for container/background glass)
   */
  panelPreset?: PanelPreset
  
  /**
   * Button preset (for interactive glass)
   */
  buttonPreset?: ButtonPreset
}

