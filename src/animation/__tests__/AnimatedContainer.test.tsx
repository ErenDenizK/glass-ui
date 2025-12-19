import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { AnimatedContainer } from '../AnimatedContainer'

describe('AnimatedContainer', () => {
  it('renders children', () => {
    const { getByText } = render(
      <AnimatedContainer>Test Content</AnimatedContainer>
    )
    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('applies fadeIn preset', () => {
    const { container } = render(
      <AnimatedContainer preset="fadeIn">Content</AnimatedContainer>
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies slideUp preset', () => {
    const { container } = render(
      <AnimatedContainer preset="slideUp">Content</AnimatedContainer>
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies scale preset', () => {
    const { container } = render(
      <AnimatedContainer preset="scale">Content</AnimatedContainer>
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it('enables hover animation', () => {
    const { container } = render(
      <AnimatedContainer enableHover>Content</AnimatedContainer>
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<AnimatedContainer ref={ref}>Content</AnimatedContainer>)
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('accepts custom className', () => {
    const { container } = render(
      <AnimatedContainer className="custom-class">Content</AnimatedContainer>
    )
    const element = container.firstChild as HTMLElement
    
    expect(element.className).toContain('custom-class')
  })

  it('combines preset and hover', () => {
    const { container } = render(
      <AnimatedContainer preset="fadeIn" enableHover>
        Content
      </AnimatedContainer>
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})

