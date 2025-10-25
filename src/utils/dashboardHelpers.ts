import { DashboardLayoutConfig } from '../types/navigation'
import { getNavigationForStakeholder } from '../config/navigation'
import { ReactNode } from 'react'

export function createDashboardConfig(
  appName: string,
  stakeholder?: 'farmer' | 'buyer' | 'policymaker' | 'logistics' | 'all',
  options?: {
    logo?: ReactNode
    showSidebar?: boolean
    showTopbar?: boolean
    sidebarCollapsible?: boolean
    userMenu?: ReactNode
    footer?: ReactNode
  }
): DashboardLayoutConfig {
  return {
    appName,
    logo: options?.logo,
    navigation: getNavigationForStakeholder(stakeholder),
    showSidebar: options?.showSidebar ?? false,
    showTopbar: options?.showTopbar ?? true,
    sidebarCollapsible: options?.sidebarCollapsible ?? true,
    userMenu: options?.userMenu,
    footer: options?.footer
  }
}

export function formatCurrency(value: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(value)
}

export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat('en-IN', options).format(value)
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`
}

export function getVariantForValue(
  value: number,
  thresholds: { success?: number; warning?: number; danger?: number }
): 'success' | 'warning' | 'danger' | 'default' {
  if (thresholds.danger !== undefined && value <= thresholds.danger) {
    return 'danger'
  }
  if (thresholds.warning !== undefined && value <= thresholds.warning) {
    return 'warning'
  }
  if (thresholds.success !== undefined && value >= thresholds.success) {
    return 'success'
  }
  return 'default'
}

export function getTrendDirection(
  current: number,
  previous: number
): 'up' | 'down' | 'neutral' {
  if (current > previous) return 'up'
  if (current < previous) return 'down'
  return 'neutral'
}

export function calculatePercentageChange(
  current: number,
  previous: number
): string {
  if (previous === 0) return '0%'
  const change = ((current - previous) / previous) * 100
  const prefix = change > 0 ? '+' : ''
  return `${prefix}${change.toFixed(1)}%`
}
