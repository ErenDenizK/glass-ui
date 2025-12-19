/**
 * Variant system for components
 * 
 * Type-safe variant management with defaults and overrides
 */

export type VariantConfig<T extends string> = Record<T, string>

export function createVariants<T extends string>(
  base: string,
  variants: VariantConfig<T>
) {
  return function getVariant(variant: T): string {
    return `${base} ${variants[variant]}`
  }
}

/**
 * Example usage:
 * 
 * const buttonVariants = createVariants('base-button', {
 *   primary: 'bg-blue-500',
 *   secondary: 'bg-gray-500',
 * })
 * 
 * buttonVariants('primary') // 'base-button bg-blue-500'
 */

