import { forwardRef, useState } from 'react'
import { GlassContainer } from '../../glass-system'
import { AnimatedContainer } from '../../animation'
import { cn } from '../../utils'
import { variantStyles, sizeStyles, iconOnlySizes, variantGlassDefaults } from './styles'
import type { ButtonProps } from './types'
import type { ShadowValue } from '../../glass-system/tokens'

/**
 * Button Component
 * 
 * Glass-enhanced button with animations and multiple variants
 * 
 * @example
 * // Default button
 * <Button>Click me</Button>
 * 
 * // With icon
 * <Button leadingIcon={<Icon />}>Save</Button>
 * 
 * // Loading state
 * <Button loading>Processing...</Button>
 * 
 * // Custom glass
 * <Button glass={{ blur: 'lg', opacity: 0.5 }}>Heavy Glass</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      glass,
      color = 'primary',
      radius = 'lg',
      shadow = 'sm',
      leadingIcon,
      trailingIcon,
      iconOnly = false,
      loading = false,
      fullWidth = false,
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Determine glass config
    const glassConfig = glass !== undefined 
      ? glass 
      : variantGlassDefaults[variant]
    
    // Icon-only mode overrides
    const isIconOnly = iconOnly || (!children && (leadingIcon || trailingIcon))
    
    // Disabled or loading state
    const isDisabled = disabled || loading
    
    // Hover state for shadow enhancement
    const [isHovered, setIsHovered] = useState(false)
    
    // Enhance shadow on hover (subtle depth increase)
    const getShadowValue = (): ShadowValue => {
      if (!isHovered || isDisabled || shadow === 'none') {
        return shadow
      }
      // Increase shadow depth by one level
      const shadowMap: Record<ShadowValue, ShadowValue> = {
        none: 'none',
        xs: 'sm',
        sm: 'md',
        md: 'lg',
        lg: 'xl',
        xl: 'xl', // Max out at xl
      }
      return shadowMap[shadow] || shadow
    }
    
    return (
      <AnimatedContainer
        // Hover: Subtle scale-up (Apple-style)
        whileHover={!isDisabled ? {
          scale: 1.015,
          transition: {
            duration: 0.2,
            ease: [0.4, 0.0, 0.2, 1], // Material Standard easing
          }
        } : undefined}
        
        // Tap: Quick scale-down (crisp feedback)
        whileTap={!isDisabled ? {
          scale: 0.97,
          transition: {
            duration: 0.1,
            ease: [0.4, 0.0, 1, 1], // Material Accelerate easing
          }
        } : undefined}
        
        onMouseEnter={() => !isDisabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        
        className={cn(
          fullWidth && 'w-full'
        )}
      >
        <GlassContainer
          as="button"
          ref={ref}
          glass={glassConfig}
          color={color}
          radius={radius}
          shadow={getShadowValue()}
          {...(props as Omit<React.HTMLAttributes<HTMLButtonElement>, 'color'>)}
          disabled={isDisabled}
          className={cn(
            // Base styles
            'relative inline-flex items-center justify-center',
            'transition-shadow duration-200', // Smooth shadow transition
            
            // Focus styles (smooth, glass-themed)
            'focus:outline-none',
            'focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
            'transition-shadow duration-200', // Smooth focus ring transition
            
            // Variant styles
            variantStyles[variant],
            
            // Size styles
            isIconOnly ? iconOnlySizes[size] : sizeStyles[size],
            
            // State styles
            isDisabled && 'opacity-50 cursor-not-allowed',
            !isDisabled && 'cursor-pointer',
            
            // Custom classes
            className
          )}
          {...props}
        >
          {/* Loading spinner */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
          
          {/* Content (hidden during loading) */}
          <div
            className={cn(
              'flex items-center justify-center gap-2',
              loading && 'opacity-0'
            )}
          >
            {leadingIcon && (
              <span 
                className="flex-shrink-0 flex items-center justify-center"
                style={{ 
                  transform: 'translateZ(0)',
                  WebkitFontSmoothing: 'antialiased'
                }}
              >
                {leadingIcon}
              </span>
            )}
            {children && <span>{children}</span>}
            {trailingIcon && (
              <span 
                className="flex-shrink-0 flex items-center justify-center"
                style={{ 
                  transform: 'translateZ(0)',
                  WebkitFontSmoothing: 'antialiased'
                }}
              >
                {trailingIcon}
              </span>
            )}
          </div>
        </GlassContainer>
      </AnimatedContainer>
    )
  }
)

Button.displayName = 'Button'

