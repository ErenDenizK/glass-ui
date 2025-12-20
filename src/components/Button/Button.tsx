import { forwardRef, useState } from 'react'
import { GlassContainer } from '../../glass-system'
import { AnimatedContainer } from '../../animation'
import { cn } from '../../utils'
import { variantStyles, sizeStyles, iconOnlySizes, variantGlassDefaults } from './styles'
import type { ButtonProps } from './types'

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
    
    return (
      <AnimatedContainer
        // Hover: Subtle scale-up
        whileHover={!isDisabled ? {
          scale: 1.015,
          transition: {
            duration: 0.2,
            ease: [0.4, 0.0, 0.2, 1], // Material Standard
          }
        } : undefined}
        
        // Tap: Quick scale-down (impact feel)
        whileTap={!isDisabled ? {
          scale: 0.97,
          transition: {
            duration: 0.1,
            ease: [0.4, 0.0, 1, 1], // Material Accelerate
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
          // Shadow depth increases on hover (elevation)
          shadow={isHovered && !isDisabled && shadow !== 'none' 
            ? shadow === 'xs' ? 'sm'
              : shadow === 'sm' ? 'md'
              : shadow === 'md' ? 'lg'
              : shadow === 'lg' ? 'xl'
              : shadow
            : shadow
          }
          disabled={isDisabled}
          className={cn(
            // Base styles
            'relative inline-flex items-center justify-center',
            'transition-shadow duration-200', // Smooth shadow transition
            
            // Focus styles
            'focus:outline-none',
            'focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
            
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
          {...(props as Omit<React.HTMLAttributes<HTMLButtonElement>, 'color'>)}
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

