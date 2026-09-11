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
 * Parse glass config with panel and button preset support.
 *
 * Nesting depth is applied separately, by GlassContainer - see depth.ts. It
 * used to be handled here, where it replaced the caller's entire config; now it
 * scales whatever this function resolves, so `layer={2} glass="modal"` keeps
 * being a modal.
 */
export function parseGlassConfig(
  glass: boolean | GlassConfig | PresetName | undefined,
  panelPreset?: PanelPreset,
  buttonPreset?: ButtonPreset
): {
  blur: string
  opacity: number
  borderGlow: boolean
} {
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
 * Rewrite an hsl()/hsla() colour token with a new alpha channel.
 *
 * Tokens are authored as `hsla(217, 91%, 60%, 0.15)`; presets and the layer
 * system need the same hue at a different opacity. Anything that is not an
 * hsl/hsla string is returned untouched so a custom token cannot break render.
 */
export function withAlpha(color: string, alpha: number): string {
  const match = color.match(/hsla?\(([^)]+)\)/)
  if (!match) return color

  const [h, s, l] = match[1].split(',').map((part) => part.trim())
  if (h === undefined || s === undefined || l === undefined) return color

  return `hsla(${h}, ${s}, ${l}, ${alpha})`
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

