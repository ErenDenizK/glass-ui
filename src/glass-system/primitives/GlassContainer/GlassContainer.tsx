import { forwardRef } from 'react'
import { cn } from '../../../utils/cn'
import { getColor, radius, shadows } from '../../tokens'
import { parseGlassConfig, supportsBackdropFilter } from './utils'
import type { GlassContainerProps } from './types'

/**
 * GlassContainer - Core primitive for glass effects
 * 
 * Applies glassmorphism effects (backdrop-filter, opacity, border glow) to content.
 * Glass effect is OPTIONAL - can be used as solid container too.
 * 
 * @example
 * ```tsx
 * // Default glass
 * <GlassContainer>Content</GlassContainer>
 * 
 * // Custom glass
 * <GlassContainer glass={{ blur: 'lg', opacity: 0.5, borderGlow: true }}>
 *   Content
 * </GlassContainer>
 * 
 * // Solid (no glass)
 * <GlassContainer glass={false} color="primary">
 *   Content
 * </GlassContainer>
 * ```
 */
export const GlassContainer = forwardRef<HTMLDivElement, GlassContainerProps>(
  (
    {
      glass = true,
      color = 'neutral',
      radius: radiusValue = 'lg',
      shadow = 'sm',
      className,
      style,
      children,
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    const { blur: blurValue, opacity: opacityValue, borderGlow } = parseGlassConfig(glass)
    const colorToken = getColor(color)
    const hasBackdropFilter = supportsBackdropFilter()
    
    // If backdrop-filter not supported, increase opacity for visibility
    const finalOpacity = hasBackdropFilter ? opacityValue : Math.min(opacityValue + 0.2, 0.9)
    
    // Replace opacity in hsla string
    // Extract HSL values and rebuild with new opacity for robustness
    // Handles both hsl() and hsla() formats
    const hslaMatch = colorToken.glass.match(/hsla?\(([^)]+)\)/)
    const backgroundColor = hslaMatch
      ? `hsla(${hslaMatch[1].split(',').slice(0, 3).join(',').trim()}, ${finalOpacity})`
      : colorToken.glass // Fallback: use original if format is unexpected
    
    const componentProps: React.HTMLAttributes<HTMLElement> = {
      className: cn(
        // Base styles
        'relative',
        
        // Border glow (::before will be added via styles)
        borderGlow && 'glass-border-glow',
        
        // Custom classes
        className
      ),
      style: {
        // Border radius
        borderRadius: radiusValue !== 'none' ? radius[radiusValue] : undefined,
        
        // Shadow
        boxShadow: shadow !== 'none' ? shadows[shadow] : undefined,
        
        // Background color with opacity
        backgroundColor,
        
        // Backdrop filter (with fallback)
        ...(hasBackdropFilter && glass !== false && {
          backdropFilter: `blur(${blurValue})`,
          WebkitBackdropFilter: `blur(${blurValue})`,
        }),
        
        // GPU acceleration
        transform: 'translateZ(0)',
        
        // Border glow variables (for ::before pseudo-element)
        ...(borderGlow && {
          '--border-gradient-top': colorToken.border[0],
          '--border-gradient-bottom': colorToken.border[1],
        } as React.CSSProperties),
        
        // User styles override
        ...style,
      },
      ...props,
    }
    
    // Render based on Component type with proper ref handling
    // Forward ref to all element types
    if (Component === 'div') {
      return (
        <div ref={ref} {...componentProps}>
          {children}
        </div>
      )
    }
    
    // For other HTML elements, forward ref with proper typing
    const Element = Component as 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'nav'
    return (
      <Element ref={ref as React.Ref<HTMLElement>} {...componentProps}>
        {children}
      </Element>
    )
  }
)

GlassContainer.displayName = 'GlassContainer'

