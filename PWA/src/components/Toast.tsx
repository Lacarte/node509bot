import { useState, useEffect } from 'react'
import './Toast.css'

type ToastType = 'success' | 'error' | 'info'
interface ToastData { message: string; type: ToastType }

const emitter = new EventTarget()

export function showToast(message: string, type: ToastType = 'success') {
  emitter.dispatchEvent(new CustomEvent('toast', { detail: { message, type } }))
}

export default function Toast() {
  const [toast, setToast] = useState<ToastData | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      const { message, type } = (e as CustomEvent<ToastData>).detail
      setToast({ message, type })
      setVisible(true)
      setTimeout(() => setVisible(false), 2500)
      setTimeout(() => setToast(null), 2800)
    }
    emitter.addEventListener('toast', handler)
    return () => emitter.removeEventListener('toast', handler)
  }, [])

  if (!toast) return null

  return (
    <div className={`toast toast--${toast.type} ${visible ? 'toast--in' : 'toast--out'}`}>
      <span className="toast-icon">
        {toast.type === 'success' && '✓'}
        {toast.type === 'error' && '✕'}
        {toast.type === 'info' && 'ℹ'}
      </span>
      {toast.message}
    </div>
  )
}
