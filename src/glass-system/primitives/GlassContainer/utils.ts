import { blur, validateBlur, getOpacity } from '../../tokens'
import { getPreset, listPresets } from '../../presets/context-presets'
import type { GlassConfig, PanelPreset, ButtonPreset } from './types'
import type { BlurValue, OpacityValue } from '../../tokens'
import type { PresetName } from '../../presets/types'

/**
 * Panel presets for container/background glass
 */
const panelPresets: Record<PanelPreset, { blur: BlurValue; opacity: number }> = {
  light: { blur: 'sm', opacity: 0.15 },
  medium: { blur: 'md', opacity: 0.25 },
  heavy: { blur: 'lg', opacity: 0.4 },
}

/**
 * Button presets for interactive glass
 */
const buttonPresets: Record<ButtonPreset, { blur: BlurValue; opacity: number }> = {
  solid: { blur: 'sm', opacity: 0.7 },   // Looks solid
  glass: { blur: 'md', opacity: 0.3 },   // Classic glass
  minimal: { blur: 'xs', opacity: 0.1 }, // Barely visible
}

/**
 * Calculate glass config based on layer depth
 */
function getLayerConfig(layer: 1 | 2 | 3): { blur: string; opacity: number } {
  const configs = {
    1: { blur: blur.md, opacity: 0.2 },      // Outermost
    2: { blur: blur.lg, opacity: 0.35 },     // Inner (auto darker)
    3: { blur: blur.lg, opacity: 0.5 },     // Innermost (darkest)
  }
  return configs[layer]
}

/**
 * Parse glass config with layer, panel, and button preset support
 */
export function parseGlassConfig(
  glass: boolean | GlassConfig | PresetName | undefined,
  layer?: 1 | 2 | 3,
  panelPreset?: PanelPreset,
  buttonPreset?: ButtonPreset
): {
  blur: string
  opacity: number
  borderGlow: boolean
} {
  // Layer preset takes precedence
  if (layer) {
    const config = getLayerConfig(layer)
    return {
      blur: config.blur,
      opacity: config.opacity,
      borderGlow: false,
    }
  }
  
  // Panel preset
  if (panelPreset) {
    const config = panelPresets[panelPreset]
    return {
      blur: blur[config.blur],
      opacity: config.opacity,
      borderGlow: false,
    }
  }
  
  // Button preset
  if (buttonPreset) {
    const config = buttonPresets[buttonPreset]
    return {
      blur: blur[config.blur],
      opacity: config.opacity,
      borderGlow: false,
    }
  }
  
  // Glass disabled
  if (glass === false) {
    return {
      blur: '0px',
      opacity: 1,
      borderGlow: false,
    }
  }
  
  // Default glass
  if (glass === true || glass === undefined) {
    return {
      blur: blur.md,
      opacity: getOpacity('normal'),
      borderGlow: false,
    }
  }
  
  // Check if it's a preset name (string)
  if (typeof glass === 'string') {
    const presets = listPresets()
    if (presets.includes(glass as PresetName)) {
      const preset = getPreset(glass as PresetName)
      return {
        blur: parseBlurValue(preset.blur),
        opacity: parseOpacityValue(preset.opacity),
        borderGlow: preset.borderGlow,
      }
    }
    // If string but not a valid preset, fall back to default
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Invalid preset name: "${glass}". Using default.`)
    }
    return {
      blur: blur.md,
      opacity: getOpacity('normal'),
      borderGlow: false,
    }
  }
  
  // Custom config object
  const config = glass as GlassConfig
  
  return {
    blur: parseBlurValue(config.blur),
    opacity: parseOpacityValue(config.opacity),
    borderGlow: config.borderGlow ?? false,
  }
}

/**
 * Parse blur value (token or number)
 */
function parseBlurValue(value: BlurValue | number | undefined): string {
  if (value === undefined) {
    return blur.md // default
  }
  
  if (typeof value === 'number') {
    const validated = validateBlur(value)
    return `${validated}px`
  }
  
  return blur[value]
}

/**
 * Parse opacity value (token or number)
 */
function parseOpacityValue(value: OpacityValue | number | undefined): number {
  if (value === undefined) {
    return getOpacity('normal') // default
  }
  
  if (typeof value === 'number') {
    return Math.max(0, Math.min(1, value))
  }
  
  return getOpacity(value)
}

/**
 * Check if backdrop-filter is supported
 */
export function supportsBackdropFilter(): boolean {
  if (typeof window === 'undefined') return false
  
  // Check if CSS.supports is available (not available in jsdom)
  if (typeof CSS === 'undefined' || !CSS.supports) {
    return false
  }
  
  return (
    CSS.supports('backdrop-filter', 'blur(1px)') ||
    CSS.supports('-webkit-backdrop-filter', 'blur(1px)')
  )
}

/**
 * Detect if device is low-end (for performance optimization)
 */
export function isLowEndDevice(): boolean {
  if (typeof navigator === 'undefined') return false
  
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 2
  
  // Check device memory (if available)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const memory = (navigator as any).deviceMemory || 4
  
  // Check connection (if available)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connection = (navigator as any).connection
  const slowConnection = 
    connection?.effectiveType === '2g' || 
    connection?.effectiveType === 'slow-2g'
  
  return cores < 4 || memory < 4 || slowConnection
}

