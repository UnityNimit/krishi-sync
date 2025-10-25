import { ReactNode } from 'react'

export interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'bordered' | 'flat'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const variantStyles = {
  default: 'bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700',
  elevated: 'bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700',
  bordered: 'bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700',
  flat: 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700'
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-6',
  lg: 'p-8'
}

export function Card({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'md'
}: CardProps) {
  return (
    <div className={`${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}>
      {children}
    </div>
  )
}
