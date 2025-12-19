import type { PresetRegistry, PresetName, PresetConfig } from './types'

/**
 * Context-aware glass presets
 * 
 * Each preset is optimized for specific use cases based on:
 * - Visual hierarchy (how prominent should it be?)
 * - Content density (how much text/UI?)
 * - Interaction type (static vs interactive)
 * - Background context (foreground vs background)
 */
export const contextPresets: PresetRegistry = {
  /**
   * Modal/Dialog overlays
   * - High prominence (foreground)
   * - Needs strong separation from background
   * - Readable content critical
   */
  modal: {
    blur: 'lg',
    opacity: 0.7,
    borderGlow: true,
    description: 'Modal dialogs and overlays that need strong separation',
    useCases: [
      'Dialog boxes',
      'Modal windows',
      'Popups',
      'Alert overlays',
    ],
  },

  /**
   * Interactive buttons
   * - Medium prominence
   * - Needs to feel clickable
   * - Hover/active states important
   */
  button: {
    blur: 'md',
    opacity: 0.25,
    borderGlow: true,
    description: 'Interactive buttons with glass effect',
    useCases: [
      'Primary buttons',
      'Secondary buttons',
      'Icon buttons',
      'Action triggers',
    ],
  },

  /**
   * Content cards
   * - Low-medium prominence
   * - Content-heavy (text, images)
   * - Subtle glass for elegance
   */
  card: {
    blur: 'sm',
    opacity: 0.15,
    borderGlow: false,
    description: 'Content cards with subtle glass effect',
    useCases: [
      'Product cards',
      'Article previews',
      'Dashboard widgets',
      'Info boxes',
    ],
  },

  /**
   * Navigation bars
   * - Persistent UI element
   * - Needs balance (visible but not distracting)
   * - Often scrolls over content
   */
  nav: {
    blur: 'md',
    opacity: 0.5,
    borderGlow: false,
    description: 'Navigation bars and headers',
    useCases: [
      'Top navigation',
      'Sidebars',
      'Tab bars',
      'Toolbars',
    ],
  },

  /**
   * Stats/metrics displays
   * - Very subtle (info-dense)
   * - Background element
   * - Shouldn't distract from content
   */
  stats: {
    blur: 'xs',
    opacity: 0.08,
    borderGlow: false,
    description: 'Stats, metrics, and data displays',
    useCases: [
      'Dashboard stats',
      'Metric cards',
      'KPI displays',
      'Data tables',
    ],
  },

  /**
   * Page backgrounds
   * - Very subtle ambient effect
   * - Shouldn't compete with content
   * - Adds depth without distraction
   */
  background: {
    blur: 'subtle',
    opacity: 0.05,
    borderGlow: false,
    description: 'Page backgrounds and ambient sections',
    useCases: [
      'Page sections',
      'Hero backgrounds',
      'Ambient overlays',
      'Decorative elements',
    ],
  },
} as const

/**
 * Get preset configuration by name
 */
export function getPreset(name: PresetName): PresetConfig {
  return contextPresets[name]
}

/**
 * List all available presets
 */
export function listPresets(): PresetName[] {
  return Object.keys(contextPresets) as PresetName[]
}

