import { useState, useCallback } from 'react'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export interface Notification {
  id: string
  type: NotificationType
  message: string
  timestamp: number
}

export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const showNotification = useCallback((type: NotificationType, message: string) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    const notification: Notification = {
      id,
      type,
      message,
      timestamp: Date.now()
    }

    setNotifications(prev => [...prev, notification])

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 5000)

    return id
  }, [])

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  return {
    notifications,
    showNotification,
    dismissNotification,
    clearAll
  }
}
