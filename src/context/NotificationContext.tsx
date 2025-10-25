import { createContext, useContext } from 'react'
import type { NotificationType } from '../hooks/useNotification'

interface NotificationContextType {
  showNotification: (type: NotificationType, message: string) => string
  dismissNotification: (id: string) => void
  clearAll: () => void
}

export const NotificationContext = createContext<NotificationContextType | null>(null)

export function useNotificationContext() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotificationContext must be used within NotificationContext.Provider')
  }
  return context
}
