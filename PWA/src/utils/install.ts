let deferredPrompt: BeforeInstallPromptEvent | null = null
let promptShown = false

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

// Capture the install prompt event
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  deferredPrompt = e as BeforeInstallPromptEvent
})

export function triggerInstallPrompt() {
  if (promptShown || !deferredPrompt) return

  // Show after a short delay so the success screen is visible first
  setTimeout(() => {
    if (!deferredPrompt) return
    promptShown = true
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null
    })
  }, 3000)
}

export function canInstall(): boolean {
  return deferredPrompt !== null && !promptShown
}
