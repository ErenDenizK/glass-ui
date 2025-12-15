import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GlassContainer } from './GlassContainer'

describe('GlassContainer', () => {
  it('renders children correctly', () => {
    render(<GlassContainer>Test Content</GlassContainer>)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
  
  it('applies default glass effect', () => {
    const { container } = render(<GlassContainer>Content</GlassContainer>)
    const element = container.firstChild as HTMLElement
    
    // Should have backdrop-filter (if supported)
    const style = element.style
    const webkitBackdropFilter = (style as unknown as Record<string, string>)['-webkit-backdrop-filter']
    expect(style.backdropFilter || webkitBackdropFilter).toBeTruthy()
    
    // Should have GPU acceleration
    expect(style.transform).toBe('translateZ(0)')
  })
  
  it('disables glass when glass=false', () => {
    const { container } = render(
      <GlassContainer glass={false}>Content</GlassContainer>
    )
    const element = container.firstChild as HTMLElement
    
    // Should not have backdrop-filter (glass disabled)
    const webkitBackdropFilter = (element.style as unknown as Record<string, string>)['-webkit-backdrop-filter']
    expect(element.style.backdropFilter || webkitBackdropFilter).toBeFalsy()
    
    // Should have solid background (opacity 1)
    expect(element.style.backgroundColor).toBeTruthy()
  })
  
  it('applies custom blur value', () => {
    const { container } = render(
      <GlassContainer glass={{ blur: 'lg' }}>Content</GlassContainer>
    )
    const element = container.firstChild as HTMLElement
    
    const webkitBackdropFilter = (element.style as unknown as Record<string, string>)['-webkit-backdrop-filter']
    expect(
      element.style.backdropFilter || webkitBackdropFilter
    ).toContain('20px')
  })
  
  it('validates blur maximum', () => {
    const { container } = render(
      <GlassContainer glass={{ blur: 50 }}>Content</GlassContainer>
    )
    const element = container.firstChild as HTMLElement
    
    // Should clamp to MAX_BLUR (20px)
    const webkitBackdropFilter = (element.style as unknown as Record<string, string>)['-webkit-backdrop-filter']
    const filter = element.style.backdropFilter || webkitBackdropFilter
    expect(filter).toContain('20px')
  })
  
  it('applies border glow class when enabled', () => {
    const { container } = render(
      <GlassContainer glass={{ borderGlow: true }}>Content</GlassContainer>
    )
    const element = container.firstChild as HTMLElement
    
    expect(element.className).toContain('glass-border-glow')
  })
  
  it('accepts custom className', () => {
    const { container } = render(
      <GlassContainer className="custom-class">Content</GlassContainer>
    )
    const element = container.firstChild as HTMLElement
    
    expect(element.className).toContain('custom-class')
  })
  
  it('renders as different element when "as" prop provided', () => {
    const { container } = render(
      <GlassContainer as="section">Content</GlassContainer>
    )
    
    expect(container.querySelector('section')).toBeInTheDocument()
  })
  
  it('forwards ref correctly for div element', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<GlassContainer ref={ref}>Content</GlassContainer>)
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
  
  it('forwards ref correctly for non-div elements', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<GlassContainer as="section" ref={ref}>Content</GlassContainer>)
    
    expect(ref.current).toBeInstanceOf(HTMLElement)
    expect(ref.current?.tagName.toLowerCase()).toBe('section')
  })
})

