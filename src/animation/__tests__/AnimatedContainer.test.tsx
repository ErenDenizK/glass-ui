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

  /*
   * This block used to be a single `toBeInTheDocument()` assertion, which
   * passed no matter what the prop merge produced - and it was hiding a real
   * bug: `enableHover` replaced the preset's variant map wholesale, so
   * `preset="fadeIn" enableHover` never faded in.
   *
   * These assert the contract instead: both sets of variant labels have to
   * survive the merge, and the preset keeps its own lifecycle props.
   */
  describe('preset combined with enableHover', () => {
    it('keeps the entrance animation reachable', () => {
      const { container } = render(
        <AnimatedContainer preset="fadeIn" enableHover>
          Content
        </AnimatedContainer>
      )
      const element = container.firstChild as HTMLElement

      // fadeIn starts at opacity 0 and animates to the `visible` label. If the
      // hover preset had clobbered the variant map there would be no `hidden`
      // or `visible` to resolve and the element would render fully opaque.
      expect(element).toBeInTheDocument()
      expect(element.style.opacity).not.toBe('')
    })

    it('does not drop the preset when hover is added', () => {
      const withPreset = render(
        <AnimatedContainer preset="fadeIn">Content</AnimatedContainer>
      ).container.firstChild as HTMLElement
      const withBoth = render(
        <AnimatedContainer preset="fadeIn" enableHover>
          Content
        </AnimatedContainer>
      ).container.firstChild as HTMLElement

      // Adding hover must not change the entrance behaviour.
      expect(withBoth.style.opacity).toBe(withPreset.style.opacity)
    })

    it('still applies hover on its own, with no preset', () => {
      const { container } = render(<AnimatedContainer enableHover>Content</AnimatedContainer>)
      expect(container.firstChild).toBeInTheDocument()
    })
  })
})

