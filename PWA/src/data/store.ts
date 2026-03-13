import { useState, useEffect, useSyncExternalStore } from 'react'

// ── Generic localStorage hook ──
function useLocalStorage<T>(key: string, initial: T): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initial
    } catch { return initial }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

// ── Favorites ──
export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>('node509_favorites', [])

  return {
    favorites,
    isFavorite: (id: string) => favorites.includes(id),
    toggleFavorite: (id: string) => {
      setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
    },
  }
}

// ── Notification History ──
export interface NotificationItem {
  id: string
  title: string
  body: string
  timestamp: string
  read: boolean
  eventId?: string
  type: 'purchase' | 'reminder' | 'info'
}

export function useNotificationHistory() {
  const [notifications, setNotifications] = useLocalStorage<NotificationItem[]>('node509_notifications', [])

  return {
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
    addNotification: (n: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
      setNotifications(prev => [{
        ...n,
        id: `notif-${Date.now()}`,
        timestamp: new Date().toISOString(),
        read: false,
      }, ...prev])
    },
    markRead: (id: string) => {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    },
    markAllRead: () => {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    },
  }
}

// ── User Preferences ──
export function useUserPrefs() {
  const [prefs, setPrefs] = useLocalStorage('node509_prefs', {
    hasCompletedOnboarding: false,
    notificationsEnabled: true,
  })

  return {
    ...prefs,
    markOnboardingDone: () => setPrefs(p => ({ ...p, hasCompletedOnboarding: true })),
    toggleNotifications: () => setPrefs(p => ({ ...p, notificationsEnabled: !p.notificationsEnabled })),
  }
}

// ── Global notification count (observable outside React) ──
let _unreadCount = 0
const listeners = new Set<() => void>()

function updateUnreadCount() {
  try {
    const data = JSON.parse(localStorage.getItem('node509_notifications') || '[]')
    _unreadCount = data.filter((n: NotificationItem) => !n.read).length
  } catch { _unreadCount = 0 }
  listeners.forEach(l => l())
}

// Init
if (typeof window !== 'undefined') updateUnreadCount()

export function getUnreadCountSnapshot() { return _unreadCount }
export function subscribeUnreadCount(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useUnreadCount() {
  return useSyncExternalStore(subscribeUnreadCount, getUnreadCountSnapshot)
}

// Call this whenever notifications change
export function notifyUnreadChanged() { updateUnreadCount() }
