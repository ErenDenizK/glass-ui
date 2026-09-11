import { forwardRef } from 'react'
import { cn } from '../../../utils/cn'
import { getColor, radius, shadows } from '../../tokens'
import { parseGlassConfig, withAlpha } from './utils'
import type { GlassContainerProps } from './types'

/**
 * GlassContainer - core primitive for glass surfaces.
 *
 * Static presentation lives in styles.css inside `@layer glass-ui`; this
 * component only computes the *values* and hands them over as CSS custom
 * properties. That split is what makes `className` overrides work - see the
 * comment at the top of styles.css for the reasoning.
 *
 * @example
 * ```tsx
 * <GlassContainer>Content</GlassContainer>
 * <GlassContainer glass={{ blur: 'lg', opacity: 0.5, borderGlow: true }}>…</GlassContainer>
 * <GlassContainer glass={false} color="primary">Solid</GlassContainer>
 * <GlassContainer className="rounded-full">Overrides still apply</GlassContainer>
 * ```
 */
export const GlassContainer = forwardRef<HTMLElement, GlassContainerProps>(
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
    const { blur: blurValue, opacity, borderGlow } = parseGlassConfig(
      glass,
      layer,
      panelPreset,
      buttonPreset
    )
    const colorToken = getColor(color)
    const blurEnabled = glass !== false && blurValue !== '0px'

    // Feature detection happens in CSS (@supports), not JS, so the first
    // server render and the first client render always agree.
    const fallbackOpacity = Math.min(opacity + 0.2, 0.9)

    const cssVars = {
      '--glass-radius': radius[radiusValue],
      '--glass-bg': withAlpha(colorToken.glass, opacity),
      '--glass-bg-fallback': withAlpha(colorToken.glass, fallbackOpacity),
      '--glass-blur': blurValue,
      '--glass-shadow': shadow !== 'none' ? shadows[shadow] : 'none',
      ...(borderGlow && {
        '--glass-glow': colorToken.glow,
        '--glass-glow-mid': withAlpha(colorToken.glow, 0.2),
        '--glass-glow-far': withAlpha(colorToken.glow, 0.1),
      }),
    } as React.CSSProperties

    const Element = Component as React.ElementType

    return (
      <Element
        ref={ref}
        className={cn(
          'glass-surface',
          blurEnabled && 'glass-surface--blur',
          borderGlow && 'glass-surface--glow',
          className
        )}
        style={{ ...cssVars, ...style }}
        {...props}
      >
        {children}
      </Element>
    )
  }
)

GlassContainer.displayName = 'GlassContainer'
