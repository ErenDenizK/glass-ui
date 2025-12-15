import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes with clsx
 * 
 * Combines clsx for conditional classes and tailwind-merge to handle
 * conflicting Tailwind classes properly.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

