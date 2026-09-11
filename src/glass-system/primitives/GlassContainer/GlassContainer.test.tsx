import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GlassContainer } from './GlassContainer'

/**
 * These assert the *contract* - which classes are applied and which custom
 * properties carry the computed values - rather than concrete inline CSS.
 * The presentation itself lives in styles.css, which jsdom does not evaluate.
 */
const vars = (el: HTMLElement) => ({
  radius: el.style.getPropertyValue('--glass-radius'),
  bg: el.style.getPropertyValue('--glass-bg'),
  bgFallback: el.style.getPropertyValue('--glass-bg-fallback'),
  blur: el.style.getPropertyValue('--glass-blur'),
  shadow: el.style.getPropertyValue('--glass-shadow'),
  glow: el.style.getPropertyValue('--glass-glow'),
})

describe('GlassContainer', () => {
  it('renders children correctly', () => {
    render(<GlassContainer>Test Content</GlassContainer>)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies the glass surface classes by default', () => {
    const { container } = render(<GlassContainer>Content</GlassContainer>)
    const element = container.firstChild as HTMLElement

    expect(element).toHaveClass('glass-surface')
    expect(element).toHaveClass('glass-surface--blur')
    expect(vars(element).blur).toBe('10px') // blur.md
  })

  it('drops the blur class when glass=false', () => {
    const { container } = render(<GlassContainer glass={false}>Content</GlassContainer>)
    const element = container.firstChild as HTMLElement

    expect(element).toHaveClass('glass-surface')
    expect(element).not.toHaveClass('glass-surface--blur')
    // Solid: fully opaque background.
    expect(vars(element).bg).toContain('1)')
  })

  it('applies custom blur value', () => {
    const { container } = render(<GlassContainer glass={{ blur: 'lg' }}>Content</GlassContainer>)
    expect(vars(container.firstChild as HTMLElement).blur).toBe('16px')
  })

  it('clamps blur to the documented 20px maximum', () => {
    const { container } = render(<GlassContainer glass={{ blur: 50 }}>Content</GlassContainer>)
    expect(vars(container.firstChild as HTMLElement).blur).toBe('20px')
  })

  it('exposes a higher-opacity background for browsers without backdrop-filter', () => {
    const { container } = render(<GlassContainer glass={{ opacity: 0.2 }}>Content</GlassContainer>)
    const { bg, bgFallback } = vars(container.firstChild as HTMLElement)

    expect(bg).toContain('0.2)')
    expect(bgFallback).toContain('0.4')
  })

  it('adds the glow class and glow custom properties when borderGlow is on', () => {
    const { container } = render(
      <GlassContainer glass={{ borderGlow: true }}>Content</GlassContainer>
    )
    const element = container.firstChild as HTMLElement

    expect(element).toHaveClass('glass-surface--glow')
    expect(vars(element).glow).toBeTruthy()
  })

  it('omits glow custom properties when borderGlow is off', () => {
    const { container } = render(
      <GlassContainer glass={{ borderGlow: false }}>Content</GlassContainer>
    )
    const element = container.firstChild as HTMLElement

    expect(element).not.toHaveClass('glass-surface--glow')
    expect(vars(element).glow).toBe('')
  })

  it('accepts custom className alongside its own classes', () => {
    const { container } = render(<GlassContainer className="custom-class">Content</GlassContainer>)
    const element = container.firstChild as HTMLElement

    expect(element).toHaveClass('custom-class')
    expect(element).toHaveClass('glass-surface')
  })

  it('keeps a consumer radius utility in the class list', () => {
    // Regression: border-radius used to be written inline, which silently beat
    // any utility class a consumer passed.
    const { container } = render(<GlassContainer className="rounded-full">Content</GlassContainer>)
    const element = container.firstChild as HTMLElement

    expect(element).toHaveClass('rounded-full')
    expect(element.style.borderRadius).toBe('')
  })

  it('forwards arbitrary DOM props to the element', () => {
    const onClick = vi.fn()
    const { container } = render(
      <GlassContainer id="surface" data-testid="glass" onClick={onClick}>
        Content
      </GlassContainer>
    )
    const element = container.firstChild as HTMLElement

    expect(element.id).toBe('surface')
    expect(element).toHaveAttribute('data-testid', 'glass')
  })

  it('renders as different element when "as" prop provided', () => {
    const { container } = render(<GlassContainer as="section">Content</GlassContainer>)
    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('forwards ref correctly for div element', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<GlassContainer ref={ref}>Content</GlassContainer>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('forwards ref correctly for non-div elements', () => {
    const ref = React.createRef<HTMLElement>()
    render(
      <GlassContainer as="section" ref={ref}>
        Content
      </GlassContainer>
    )
    expect(ref.current?.tagName.toLowerCase()).toBe('section')
  })

  describe('with presets', () => {
    it.each([
      ['modal', '16px'],
      ['button', '10px'],
      ['card', '6px'],
      ['nav', '10px'],
      ['stats', '4px'],
      ['background', '2px'],
    ] as const)('resolves the %s preset blur to %s', (preset, expected) => {
      const { container } = render(<GlassContainer glass={preset}>Content</GlassContainer>)
      const element = container.firstChild as HTMLElement

      expect(element).toHaveClass('glass-surface--blur')
      expect(vars(element).blur).toBe(expected)
    })

    it('gives the button preset a rim glow', () => {
      const { container } = render(<GlassContainer glass="button">Content</GlassContainer>)
      expect(container.firstChild as HTMLElement).toHaveClass('glass-surface--glow')
    })

    it('falls back to the default preset on an unknown name', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const invalidPreset = 'invalid' as unknown as 'modal'

      const { container } = render(<GlassContainer glass={invalidPreset}>Content</GlassContainer>)
      const element = container.firstChild as HTMLElement

      expect(element).toHaveClass('glass-surface')
      expect(vars(element).blur).toBe('10px') // blur.md default
      consoleSpy.mockRestore()
    })
  })
})
