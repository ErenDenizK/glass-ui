import { forwardRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { GlassContainer } from '../../glass-system'
import { cn } from '../../utils'
import { variantStyles, sizeStyles, iconOnlySizes, variantGlassDefaults } from './styles'
import type { ButtonProps } from './types'

/**
 * The button *is* the animated element.
 *
 * It used to be wrapped in a `motion.div`, which is `display: block` - so two
 * adjacent buttons stacked into a column and `fullWidth` stretched the wrapper
 * while leaving the button at its intrinsic width. Animating the glass surface
 * directly removes the wrapper and both bugs with it.
 */
const MotionGlassContainer = motion.create(GlassContainer)

/**
 * Button - glass-enhanced button with Material Design 3 motion.
 *
 * @example
 * <Button>Click me</Button>
 * <Button leadingIcon={<Icon />}>Save</Button>
 * <Button loading>Processing…</Button>
 * <Button glass={{ blur: 'lg', opacity: 0.5 }}>Heavy glass</Button>
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
    const glassConfig = glass !== undefined ? glass : variantGlassDefaults[variant]
    const isIconOnly = iconOnly || (!children && Boolean(leadingIcon || trailingIcon))
    const isDisabled = disabled || loading

    // docs/philosophy.md #3: honour the OS "reduce motion" setting.
    const reduceMotion = useReducedMotion()
    const animated = !isDisabled && !reduceMotion

    return (
      <MotionGlassContainer
        as="button"
        ref={ref}
        glass={glassConfig}
        color={color}
        radius={radius}
        shadow={shadow}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        whileHover={
          animated
            ? { scale: 1.015, transition: { duration: 0.2, ease: [0.4, 0.0, 0.2, 1] } }
            : undefined
        }
        whileTap={
          animated
            ? { scale: 0.97, transition: { duration: 0.1, ease: [0.4, 0.0, 1, 1] } }
            : undefined
        }
        className={cn(
          'inline-flex items-center justify-center',
          'transition-shadow duration-200',

          // Keyboard focus. This is only visible because the glass surface no
          // longer writes box-shadow inline - Tailwind's ring compiles to
          // box-shadow and inline styles used to win.
          'focus:outline-none',
          'focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2',
          'focus-visible:ring-offset-black/20',

          variantStyles[variant],
          isIconOnly ? iconOnlySizes[size] : sizeStyles[size],

          fullWidth && 'w-full',
          isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',

          className
        )}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </span>
        )}

        <span className={cn('flex items-center justify-center gap-2', loading && 'opacity-0')}>
          {leadingIcon && (
            <span className="flex-shrink-0 flex items-center justify-center">{leadingIcon}</span>
          )}
          {children && <span>{children}</span>}
          {trailingIcon && (
            <span className="flex-shrink-0 flex items-center justify-center">{trailingIcon}</span>
          )}
        </span>
      </MotionGlassContainer>
    )
  }
)

Button.displayName = 'Button'
