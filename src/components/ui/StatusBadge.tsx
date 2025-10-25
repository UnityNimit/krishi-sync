import { ReactNode } from 'react'

export interface StatusBadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const variantStyles = {
  default: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
  primary: 'bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-200',
  success: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200',
  warning: 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200',
  danger: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200',
  info: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200',
  neutral: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
}

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base'
}

export function StatusBadge({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '' 
}: StatusBadgeProps) {
  return (
    <span className={`badge ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  )
}
