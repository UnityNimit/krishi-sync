import { useEffect } from 'react'

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options?: {
    ctrl?: boolean
    shift?: boolean
    alt?: boolean
  }
) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const matchesKey = event.key.toLowerCase() === key.toLowerCase()
      const matchesCtrl = options?.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey
      const matchesShift = options?.shift ? event.shiftKey : !event.shiftKey
      const matchesAlt = options?.alt ? event.altKey : !event.altKey

      if (matchesKey && matchesCtrl && matchesShift && matchesAlt) {
        event.preventDefault()
        callback()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [key, callback, options])
}
