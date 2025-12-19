import type { BlurValue, OpacityValue } from '../tokens'

/**
 * Context-aware preset configuration
 */
export interface PresetConfig {
  /** Blur intensity for this context */
  blur: BlurValue
  
  /** Background opacity */
  opacity: OpacityValue | number
  
  /** Enable border glow */
  borderGlow: boolean
  
  /** Recommended usage description */
  description: string
  
  /** Use cases */
  useCases: string[]
}

/**
 * Available preset names
 */
export type PresetName = 
  | 'modal'
  | 'button' 
  | 'card'
  | 'nav'
  | 'stats'
  | 'background'

/**
 * Preset registry
 */
export type PresetRegistry = Record<PresetName, PresetConfig>

