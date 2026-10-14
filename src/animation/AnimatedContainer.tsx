import { motion, type HTMLMotionProps, type TargetAndTransition, type VariantLabels } from 'framer-motion'
import { forwardRef } from 'react'
import { animationPresets } from './presets'
import type { AnimationPreset } from './types'

export interface AnimatedContainerProps extends Omit<HTMLMotionProps<'div'>, 'animate'> {
  /**
   * Animation preset
   * @default undefined
   */
  preset?: AnimationPreset
  
  /**
   * Enable hover animation
   * @default false
   */
  enableHover?: boolean
  
  /**
   * Custom animation (overrides preset)
   */
  animate?: VariantLabels | TargetAndTransition | boolean
}

/**
 * AnimatedContainer - Thin wrapper around Framer Motion
 * 
 * Provides simple, consistent animations for components
 * 
 * @example
 * <AnimatedContainer preset="fadeIn">Content</AnimatedContainer>
 * <AnimatedContainer enableHover>Hoverable</AnimatedContainer>
 */
export const AnimatedContainer = forwardRef<HTMLDivElement, AnimatedContainerProps>(
  ({ preset, enableHover, children, animate, ...props }, ref) => {
    const presetConfig = preset ? animationPresets[preset] : undefined
    const hoverConfig = enableHover ? animationPresets.hover : undefined

    /*
     * `enableHover` used to spread the whole hover preset over the chosen one.
     * Because the hover preset carries `variants` but no `initial`/`animate`,
     * `preset="fadeIn" enableHover` kept fadeIn's `initial: 'hidden'` while
     * replacing the variant map with hover's - which has no `hidden` label to
     * resolve - so the entrance animation silently stopped happening.
     *
     * Merging the variant maps keeps both sets of labels reachable, and the
     * hover states are applied through `whileHover`/`whileTap` rather than by
     * overwriting the preset's lifecycle props.
     */
    const finalProps = {
      ...presetConfig,
      ...(hoverConfig && {
        variants: { ...presetConfig?.variants, ...hoverConfig.variants },
        transition: presetConfig?.transition ?? hoverConfig.transition,
        whileHover: hoverConfig.whileHover,
        whileTap: hoverConfig.whileTap,
      }),
      ...props,
      ...(animate !== undefined && { animate }),
    }
    
    return (
      <motion.div ref={ref} {...finalProps}>
        {children}
      </motion.div>
    )
  }
)

AnimatedContainer.displayName = 'AnimatedContainer'

