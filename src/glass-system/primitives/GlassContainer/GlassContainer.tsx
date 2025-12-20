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
export const GlassContainer = forwardRef<HTMLDivElement | HTMLButtonElement, GlassContainerProps>(
  (
    {
      glass = true,
      layer,
      panelPreset,
      buttonPreset,
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
    const { blur: blurValue, opacity: opacityValue, borderGlow } = parseGlassConfig(
      glass,
      layer,
      panelPreset,
      buttonPreset
    )
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
    
    // Helper to adjust opacity in HSL string for layered glow effects
    const adjustGlowOpacity = (glowColor: string, newOpacity: number): string => {
      const match = glowColor.match(/hsla?\(([^)]+)\)/)
      if (match) {
        const hslValues = match[1].split(',').slice(0, 3).join(',').trim()
        return `hsla(${hslValues}, ${newOpacity})`
      }
      return glowColor
    }
    
    const componentProps: React.HTMLAttributes<HTMLElement> & { disabled?: boolean } = {
      className: cn(
        // Base styles
        'relative',
        
        // Custom classes
        className
      ),
      style: {
        // Border radius
        borderRadius: radiusValue !== 'none' ? radius[radiusValue] : undefined,
        
        // Shadow and border glow (multi-layered ethereal effect)
        boxShadow: borderGlow
          ? [
              shadow !== 'none' ? shadows[shadow] : null,
              // Inner highlights (glass edge refraction)
              'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
              'inset 0 -1px 1px 0 rgba(255, 255, 255, 0.05)',
              // Layered glow (tight to wide, decreasing opacity)
              `0 0 20px 2px ${colorToken.glow}`,
              `0 0 40px 4px ${adjustGlowOpacity(colorToken.glow, 0.2)}`,
              `0 0 60px 6px ${adjustGlowOpacity(colorToken.glow, 0.1)}`,
            ]
              .filter(Boolean)
              .join(', ')
          : shadow !== 'none' ? shadows[shadow] : undefined,
        
        // Background color with opacity
        backgroundColor,
        
        // Backdrop filter (with fallback)
        ...(hasBackdropFilter && glass !== false && {
          backdropFilter: `blur(${blurValue})`,
          WebkitBackdropFilter: `blur(${blurValue})`,
        }),
        
        // GPU acceleration
        transform: 'translateZ(0)',
        
        // Border glow - Subtle border (structure without dominance)
        ...(borderGlow && {
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }),
        
        // User styles override
        ...style,
      },
      ...props,
    }
    
    // Render based on Component type with proper ref handling
    // Forward ref to all element types
    if (Component === 'div') {
      return (
        <div ref={ref as React.Ref<HTMLDivElement>} {...componentProps}>
          {children}
        </div>
      )
    }
    
    if (Component === 'button') {
      return (
        <button ref={ref as React.Ref<HTMLButtonElement>} {...componentProps}>
          {children}
        </button>
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

