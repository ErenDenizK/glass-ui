import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { GlassContainer } from './GlassContainer'
import { attenuateForDepth, childDepth, clampDepth } from './depth'

const alphaOf = (el: HTMLElement) => {
  const bg = el.style.getPropertyValue('--glass-bg')
  return parseFloat(bg.slice(bg.lastIndexOf(',') + 1))
}
const blurOf = (el: HTMLElement) => parseFloat(el.style.getPropertyValue('--glass-blur'))

/** Alpha you actually see once N surfaces composite over one another. */
const compositeAlpha = (alphas: number[]) =>
  1 - alphas.reduce((remaining, a) => remaining * (1 - a), 1)

describe('glass depth', () => {
  describe('attenuateForDepth', () => {
    it('leaves a lone surface untouched', () => {
      expect(attenuateForDepth(1, 10, 0.25)).toEqual({ blur: 10, opacity: 0.25 })
    })

    it('reduces, never raises, blur and opacity as depth grows', () => {
      const d1 = attenuateForDepth(1, 10, 0.25)
      const d2 = attenuateForDepth(2, 10, 0.25)
      const d3 = attenuateForDepth(3, 10, 0.25)

      expect(d2.opacity).toBeLessThan(d1.opacity)
      expect(d3.opacity).toBeLessThan(d2.opacity)
      expect(d2.blur).toBeLessThan(d1.blur)
      expect(d3.blur).toBeLessThan(d2.blur)
    })

    it('flattens beyond the deepest level instead of vanishing', () => {
      expect(attenuateForDepth(9, 10, 0.25)).toEqual(attenuateForDepth(3, 10, 0.25))
    })
  })

  describe('clampDepth', () => {
    it('keeps depth inside the supported range', () => {
      expect(clampDepth(0)).toBe(1)
      expect(clampDepth(2)).toBe(2)
      expect(clampDepth(42)).toBe(3)
    })
  })

  describe('childDepth', () => {
    it('descends one level under a translucent surface', () => {
      expect(childDepth(1, 0.25)).toBe(2)
    })

    it('restarts under an opaque surface, which hides the backdrop entirely', () => {
      expect(childDepth(2, 1)).toBe(1)
    })
  })

  describe('in the tree', () => {
    it('detects nesting without being told', () => {
      const { container } = render(
        <GlassContainer data-testid="outer">
          <GlassContainer data-testid="inner">content</GlassContainer>
        </GlassContainer>
      )
      const outer = container.firstChild as HTMLElement
      const inner = outer.querySelector('.glass-surface') as HTMLElement

      expect(alphaOf(inner)).toBeLessThan(alphaOf(outer))
      expect(blurOf(inner)).toBeLessThan(blurOf(outer))
    })

    it('sees through intervening markup', () => {
      const { container } = render(
        <GlassContainer>
          <div><section><GlassContainer data-testid="deep">content</GlassContainer></section></div>
        </GlassContainer>
      )
      const outer = container.firstChild as HTMLElement
      const inner = outer.querySelector('.glass-surface') as HTMLElement

      expect(alphaOf(inner)).toBeLessThan(alphaOf(outer))
    })

    it('keeps a three-deep stack from compounding into mud', () => {
      // Regression: the old layer prop raised opacity 0.20 -> 0.35 -> 0.50 with
      // depth, which composited to an effective 0.74 - opaque, not glass.
      const { container } = render(
        <GlassContainer glass="card">
          <GlassContainer glass="card">
            <GlassContainer glass="card">content</GlassContainer>
          </GlassContainer>
        </GlassContainer>
      )
      const surfaces = Array.from(
        container.querySelectorAll<HTMLElement>('.glass-surface')
      )
      expect(surfaces).toHaveLength(3)

      const composite = compositeAlpha(surfaces.map(alphaOf))
      expect(composite).toBeLessThan(0.3)
      // Still reads as progressively denser, rather than flat.
      expect(composite).toBeGreaterThan(alphaOf(surfaces[0]))
    })

    it('restarts depth under a solid surface', () => {
      const { container } = render(
        <GlassContainer glass={false}>
          <GlassContainer data-testid="inner">content</GlassContainer>
        </GlassContainer>
      )
      const inner = (container.firstChild as HTMLElement)
        .querySelector('.glass-surface') as HTMLElement

      // Depth 1 again: full strength, because the solid parent hides the backdrop.
      expect(alphaOf(inner)).toBeCloseTo(0.25, 5)
    })

    it('lets the layer prop override detected depth', () => {
      const { container } = render(
        <GlassContainer layer={3} data-testid="forced">content</GlassContainer>
      )
      const el = container.firstChild as HTMLElement

      expect(alphaOf(el)).toBeLessThan(0.25)
    })

    it('keeps the preset when a layer is given', () => {
      // Regression: `layer` used to replace the whole config, so an explicit
      // preset was silently discarded along with its border glow.
      const { container } = render(
        <GlassContainer layer={2} glass="modal">content</GlassContainer>
      )
      expect(container.firstChild as HTMLElement).toHaveClass('glass-surface--glow')
    })
  })
})
