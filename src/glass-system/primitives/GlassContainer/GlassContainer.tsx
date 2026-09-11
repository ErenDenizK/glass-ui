import { forwardRef } from 'react'
import { cn } from '../../../utils/cn'
import { getColor, radius, shadows } from '../../tokens'
import { parseGlassConfig, withAlpha } from './utils'
import {
  GlassDepthContext,
  attenuateForDepth,
  childDepth,
  useGlassDepth,
} from './depth'
import type { GlassContainerProps } from './types'

/**
 * GlassContainer - core primitive for glass surfaces.
 *
 * Static presentation lives in styles.css inside `@layer glass-ui`; this
 * component only computes the *values* and hands them over as CSS custom
 * properties. That split is what makes `className` overrides work - see the
 * comment at the top of styles.css for the reasoning.
 *
 * Nesting is handled automatically: a surface rendered inside another surface
 * contributes less tint and less blur, because stacked glass compounds. See
 * depth.ts.
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
    const inheritedDepth = useGlassDepth()
    // `layer` is the escape hatch: state the depth yourself when the component
    // tree does not reflect the visual nesting.
    const depth = layer ?? inheritedDepth

    const resolved = parseGlassConfig(glass, panelPreset, buttonPreset)
    const { blur: blurPx, opacity } = attenuateForDepth(
      depth,
      parseFloat(resolved.blur),
      resolved.opacity
    )
    const borderGlow = resolved.borderGlow

    const colorToken = getColor(color)
    const blurEnabled = glass !== false && blurPx > 0

    // Feature detection happens in CSS (@supports), not JS, so the first
    // server render and the first client render always agree.
    const fallbackOpacity = Math.min(opacity + 0.2, 0.9)

    const cssVars = {
      '--glass-radius': radius[radiusValue],
      '--glass-bg': withAlpha(colorToken.glass, opacity),
      '--glass-bg-fallback': withAlpha(colorToken.glass, fallbackOpacity),
      '--glass-blur': `${blurPx}px`,
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
        <GlassDepthContext.Provider value={childDepth(depth, opacity)}>
          {children}
        </GlassDepthContext.Provider>
      </Element>
    )
  }
)

GlassContainer.displayName = 'GlassContainer'
