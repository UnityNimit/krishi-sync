import type { WeatherAlertSeverity } from '../types'

type SeverityStyle = {
  badge: string
  subtle: string
  borderAccent: string
  icon: string
  text: string
}

export const weatherSeverityStyles: Record<WeatherAlertSeverity, SeverityStyle> = {
  info: {
    badge: 'bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-100',
    subtle: 'bg-sky-50 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-700',
    borderAccent: 'border-sky-400 dark:border-sky-600',
    icon: 'text-sky-600 dark:text-sky-400',
    text: 'text-sky-900 dark:text-sky-100'
  },
  watch: {
    badge: 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100',
    subtle: 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700',
    borderAccent: 'border-amber-500 dark:border-amber-600',
    icon: 'text-amber-600 dark:text-amber-400',
    text: 'text-amber-900 dark:text-amber-100'
  },
  warning: {
    badge: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100',
    subtle: 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700',
    borderAccent: 'border-red-500 dark:border-red-600',
    icon: 'text-red-600 dark:text-red-400',
    text: 'text-red-900 dark:text-red-100'
  }
}

export const formatForecastHour = (timestamp: string) => {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit'
  }).format(date)
}

export const formatRelativeTime = (timestamp: string) => {
  const target = new Date(timestamp)
  const now = new Date()
  const diff = Math.max(0, now.getTime() - target.getTime())
  const minutes = Math.round(diff / 60000)

  if (minutes < 1) {
    return 'just now'
  }

  if (minutes < 60) {
    return `${minutes} min ago`
  }

  const hours = Math.round(minutes / 60)

  if (hours < 24) {
    return `${hours} hr${hours > 1 ? 's' : ''} ago`
  }

  const days = Math.round(hours / 24)
  return `${days} day${days > 1 ? 's' : ''} ago`
}
