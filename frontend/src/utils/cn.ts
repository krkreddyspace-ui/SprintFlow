import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines conditional CSS classes and resolves Tailwind class conflicts.
 * Example: cn('px-4 py-2 bg-blue-500', isPrimary && 'bg-indigo-600', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
