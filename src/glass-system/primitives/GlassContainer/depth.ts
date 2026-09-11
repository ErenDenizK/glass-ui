import { createContext, useContext } from 'react'

/**
 * Nesting depth for glass surfaces.
 *
 * THE PROBLEM
 * -----------
 * Stacked glass compounds twice over. Each surface composites its own tint over
 * whatever is already there, so three surfaces at 0.25 do not read as 0.25 -
 * they read as 1 - 0.75³ = 0.58. And each `backdrop-filter` re-blurs a backdrop
 * the parent has already blurred.
 *
 * The old `layer` prop was meant to manage this but went the wrong way: it
 * raised opacity 0.20 -> 0.35 -> 0.50 and blur 10px -> 16px -> 16px as you went
 * deeper. Measured on a three-deep stack, the innermost surface landed at an
 * effective 0.74 opacity - opaque mud, not glass.
 *
 * THE MODEL
 * ---------
 * A parent has already separated its content from the backdrop. A child nested
 * inside it needs to do *less* work, not more, because it inherits that
 * separation. So each level contributes a fraction of what it would contribute
 * standing alone.
 *
 * Depth 1 is left at ×1 on purpose: a single surface - which is almost every
 * surface - looks exactly as it did before. Only nesting changes.
 */
export const GlassDepthContext = createContext<number>(1)

/** Deepest level that still gets its own attenuation; beyond this it is flat. */
export const MAX_DEPTH = 3

export type GlassDepth = 1 | 2 | 3

/**
 * Per-level multipliers, applied to whatever the surface already resolved to -
 * preset, custom config or default. They scale a value rather than replace it,
 * so nesting a `card` still looks like a card, just lighter.
 *
 * Chosen so the *cumulative* tint grows gently instead of racing to opaque.
 * For the 0.15 card preset the compounded result across three levels is 0.25,
 * against 0.39 if every level contributed in full.
 */
const attenuation: Record<GlassDepth, { opacity: number; blur: number }> = {
  1: { opacity: 1, blur: 1 },
  2: { opacity: 0.45, blur: 0.6 },
  3: { opacity: 0.3, blur: 0.4 },
}

/** Clamp any number to a usable depth level. */
export function clampDepth(depth: number): GlassDepth {
  if (depth <= 1) return 1
  if (depth >= MAX_DEPTH) return MAX_DEPTH
  return depth as GlassDepth
}

/**
 * Scale a surface's resolved blur and opacity for the depth it sits at.
 */
export function attenuateForDepth(
  depth: number,
  blurPx: number,
  opacity: number
): { blur: number; opacity: number } {
  const factor = attenuation[clampDepth(depth)]
  return {
    blur: blurPx * factor.blur,
    opacity: opacity * factor.opacity,
  }
}

/**
 * The depth a GlassContainer's children should render at.
 *
 * An effectively opaque surface hides the backdrop entirely, so nothing behind
 * it can compound any further - its children start over at depth 1.
 */
export function childDepth(depth: number, opacity: number): number {
  return opacity >= 0.95 ? 1 : depth + 1
}

/** Read the depth of the surrounding glass surface. */
export function useGlassDepth(): number {
  return useContext(GlassDepthContext)
}
