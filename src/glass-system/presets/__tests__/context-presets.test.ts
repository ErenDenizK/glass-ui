import { describe, it, expect } from 'vitest'
import { getPreset, listPresets, contextPresets } from '../context-presets'
import type { PresetName } from '../types'

describe('Context Presets', () => {
  it('lists all presets', () => {
    const presets = listPresets()
    expect(presets).toHaveLength(6)
    expect(presets).toContain('modal')
    expect(presets).toContain('button')
    expect(presets).toContain('card')
    expect(presets).toContain('nav')
    expect(presets).toContain('stats')
    expect(presets).toContain('background')
  })

  it('gets preset by name', () => {
    const modal = getPreset('modal')
    expect(modal.blur).toBe('lg')
    expect(modal.opacity).toBe(0.7)
    expect(modal.borderGlow).toBe(true)
    
    const button = getPreset('button')
    expect(button.blur).toBe('md')
    expect(button.opacity).toBe(0.25)
    expect(button.borderGlow).toBe(true)
    
    const card = getPreset('card')
    expect(card.blur).toBe('sm')
    expect(card.opacity).toBe(0.15)
    expect(card.borderGlow).toBe(false)
  })

  it('has valid preset configs', () => {
    Object.entries(contextPresets).forEach(([name, config]) => {
      expect(config.description).toBeTruthy()
      expect(config.description.length).toBeGreaterThan(0)
      expect(config.useCases.length).toBeGreaterThan(0)
      expect(typeof config.blur).toBe('string')
      // Opacity can be number or OpacityValue string
      expect(['number', 'string']).toContain(typeof config.opacity)
      if (typeof config.opacity === 'number') {
        expect(config.opacity).toBeGreaterThanOrEqual(0)
        expect(config.opacity).toBeLessThanOrEqual(1)
      }
      expect(typeof config.borderGlow).toBe('boolean')
      
      // Verify preset name is valid
      expect(['modal', 'button', 'card', 'nav', 'stats', 'background']).toContain(name)
    })
  })

  it('presets have distinct configurations', () => {
    const modal = getPreset('modal')
    const background = getPreset('background')
    
    // Modal should have higher opacity than background (both are numbers in our presets)
    if (typeof modal.opacity === 'number' && typeof background.opacity === 'number') {
      expect(modal.opacity).toBeGreaterThan(background.opacity)
    }
    
    // Modal should have border glow, background should not
    expect(modal.borderGlow).toBe(true)
    expect(background.borderGlow).toBe(false)
  })

  it('all presets have use cases', () => {
    const presets = listPresets()
    
    presets.forEach((presetName) => {
      const preset = getPreset(presetName as PresetName)
      expect(preset.useCases.length).toBeGreaterThan(0)
      preset.useCases.forEach((useCase) => {
        expect(typeof useCase).toBe('string')
        expect(useCase.length).toBeGreaterThan(0)
      })
    })
  })
})

