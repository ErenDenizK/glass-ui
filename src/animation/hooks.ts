import { useAnimation } from 'framer-motion'
import { useCallback } from 'react'

/**
 * Hook for button press animation
 */
export function useAnimatedPress() {
  const controls = useAnimation()
  
  const onPressStart = useCallback(() => {
    controls.start({ scale: 0.95 })
  }, [controls])
  
  const onPressEnd = useCallback(() => {
    controls.start({ scale: 1 })
  }, [controls])
  
  return { controls, onPressStart, onPressEnd }
}

/**
 * Hook for hover animation
 */
export function useAnimatedHover() {
  const controls = useAnimation()
  
  const onHoverStart = useCallback(() => {
    controls.start({ scale: 1.05, transition: { duration: 0.15 } })
  }, [controls])
  
  const onHoverEnd = useCallback(() => {
    controls.start({ scale: 1, transition: { duration: 0.15 } })
  }, [controls])
  
  return { controls, onHoverStart, onHoverEnd }
}

