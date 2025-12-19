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
    // Get preset config
    const presetConfig = preset ? animationPresets[preset] : {}
    
    // Merge hover if enabled
    const finalProps = {
      ...presetConfig,
      ...(enableHover && animationPresets.hover),
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

