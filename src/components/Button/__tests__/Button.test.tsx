import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '../Button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies variant styles', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('font-semibold')
    
    rerender(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole('button')).toHaveClass('font-medium')
  })

  it('applies size styles', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-3', 'py-1.5', 'text-sm')
    
    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3', 'text-lg')
  })

  it('renders with leading icon', () => {
    render(
      <Button leadingIcon={<span data-testid="icon">🔥</span>}>
        With Icon
      </Button>
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByText('With Icon')).toBeInTheDocument()
  })

  it('renders with trailing icon', () => {
    render(
      <Button trailingIcon={<span data-testid="icon">→</span>}>
        Next
      </Button>
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders icon-only mode', () => {
    render(<Button iconOnly leadingIcon={<span data-testid="icon">⚙️</span>} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveClass('p-2') // icon-only padding
  })

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByRole('button')).toHaveClass('opacity-50', 'cursor-not-allowed')
    // Spinner should be visible
    expect(document.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('disables button', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByRole('button')).toHaveClass('opacity-50', 'cursor-not-allowed')
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not trigger click when disabled', () => {
    const handleClick = vi.fn()
    render(<Button disabled onClick={handleClick}>Click</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies fullWidth', () => {
    const { container } = render(<Button fullWidth>Full Width</Button>)
    const animatedContainer = container.firstChild as HTMLElement
    expect(animatedContainer).toHaveClass('w-full')
  })

  it('accepts custom glass config', () => {
    render(<Button glass={{ blur: 'lg', opacity: 0.8 }}>Custom Glass</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('uses preset glass config', () => {
    render(<Button glass="modal">Modal Style</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLButtonElement | null }
    render(<Button ref={ref}>Button</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('hides content during loading', () => {
    render(<Button loading>Loading Text</Button>)
    const contentDiv = screen.getByText('Loading Text').parentElement
    expect(contentDiv).toHaveClass('opacity-0')
  })

  it('renders all variants correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    
    rerender(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    
    rerender(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    
    rerender(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})

