import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

export interface ChartWrapperProps {
  title: string
  description?: string
  icon?: LucideIcon
  children: ReactNode
  className?: string
  actions?: ReactNode
  loading?: boolean
  error?: string
}

export function ChartWrapper({
  title,
  description,
  icon: Icon,
  children,
  className = '',
  actions,
  loading = false,
  error
}: ChartWrapperProps) {
  return (
    <div className={`card ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {Icon && <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />}
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
          )}
        </div>
        {actions && <div className="ml-4">{actions}</div>}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-64 text-red-600 dark:text-red-400">
          <p>{error}</p>
        </div>
      ) : (
        <div className="w-full">{children}</div>
      )}
    </div>
  )
}
