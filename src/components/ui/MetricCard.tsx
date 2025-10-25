import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

export interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
  trend?: {
    direction: 'up' | 'down' | 'neutral'
    value: string
  }
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  className?: string
  children?: ReactNode
}

const variantStyles = {
  default: 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700',
  primary: 'bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 border-primary-200 dark:border-primary-700',
  success: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-700',
  warning: 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 border-amber-200 dark:border-amber-700',
  danger: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-red-200 dark:border-red-700',
  info: 'bg-gradient-to-br from-sky-50 to-blue-100 dark:from-sky-900/30 dark:to-blue-800/30 border-sky-200 dark:border-sky-700'
}

const textColorMap = {
  default: 'text-gray-600 dark:text-gray-300',
  primary: 'text-primary-800 dark:text-primary-200',
  success: 'text-green-800 dark:text-green-200',
  warning: 'text-amber-800 dark:text-amber-200',
  danger: 'text-red-800 dark:text-red-200',
  info: 'text-sky-800 dark:text-sky-200'
}

const iconColorMap = {
  default: 'text-gray-600 dark:text-gray-400',
  primary: 'text-primary-600 dark:text-primary-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-amber-600 dark:text-amber-400',
  danger: 'text-red-600 dark:text-red-400',
  info: 'text-sky-600 dark:text-sky-400'
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  className = '',
  children
}: MetricCardProps) {
  const variantClass = variantStyles[variant]
  const textColor = textColorMap[variant]
  const iconColor = iconColorMap[variant]

  return (
    <div className={`card ${variantClass} ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${textColor}`}>{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          {subtitle && (
            <p className={`text-sm ${textColor} mt-1`}>{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${
                trend.direction === 'up' 
                  ? 'text-green-600 dark:text-green-400' 
                  : trend.direction === 'down' 
                  ? 'text-red-600 dark:text-red-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→'} {trend.value}
              </span>
            </div>
          )}
        </div>
        {Icon && <Icon className={`h-12 w-12 ${iconColor}`} />}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}
