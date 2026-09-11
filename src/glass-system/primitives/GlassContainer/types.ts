import type { ReactNode, HTMLAttributes } from 'react'
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
 * GlassContainer component props.
 *
 * Extends HTMLAttributes because the component spreads its rest props onto the
 * rendered element - `onClick`, `id`, `aria-*` and friends all pass through.
 * `color` is omitted so it can carry our ColorName token instead of the HTML
 * presentational attribute.
 */
export interface GlassContainerProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
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
   * Override the nesting depth of this surface.
   *
   * Depth is normally detected automatically: a GlassContainer inside another
   * GlassContainer renders at depth 2, and contributes less tint and blur
   * because stacked glass compounds. Set this only when the component tree does
   * not match the visual nesting - a portalled overlay that is a sibling in the
   * DOM but reads as an inner panel, for instance.
   *
   * 1 = outermost (full strength) · 3 = innermost (most attenuated)
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

