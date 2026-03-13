export function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) return Promise.resolve('denied' as NotificationPermission)
  if (Notification.permission === 'granted') return Promise.resolve('granted')
  return Notification.requestPermission()
}

export function scheduleNotification(eventTitle: string, delayMs: number) {
  // Request permission first
  requestNotificationPermission().then(permission => {
    if (permission !== 'granted') return

    setTimeout(() => {
      new Notification('Node509 - Rapèl Evènman', {
        body: `${eventTitle} ap kòmanse nan 1 minit! Prepare w.`,
        icon: '/icons/logo.svg',
        badge: '/icons/logo.svg',
        tag: 'event-reminder',
        vibrate: [200, 100, 200],
      })
    }, delayMs)
  })
}
