import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getEvent, addTicket, generateQR } from '../data/events'
import { scheduleNotification } from '../utils/notifications'
import { triggerInstallPrompt } from '../utils/install'
import { useNotificationHistory } from '../data/store'
import { hapticSuccess } from '../utils/haptics'
import './Checkout.css'

type Step = 'qty' | 'pay' | 'processing' | 'done'

export default function Checkout() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const event = getEvent(id || '')

  const { addNotification } = useNotificationHistory()
  const [step, setStep] = useState<Step>('qty')
  const [qty, setQty] = useState(1)
  const [phone, setPhone] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  if (!event) {
    navigate('/')
    return null
  }

  const total = event.price * qty

  function handlePay() {
    if (!phone || phone.length < 8) {
      setError('Antre yon nimewo telefòn valid')
      return
    }
    if (!pin || pin.length < 4) {
      setError('PIN dwe gen omwen 4 chif')
      return
    }
    setError('')
    setStep('processing')

    // Simulate payment processing
    setTimeout(() => {
      const ticketId = `TKT-${Date.now()}`
      const ticket = {
        id: ticketId,
        eventId: event.id,
        event,
        qty,
        total,
        purchasedAt: new Date().toISOString(),
        paymentMethod: 'MonCash',
        phone,
        qrCode: generateQR(ticketId),
      }
      addTicket(ticket)

      // Schedule push notification in 2 minutes
      scheduleNotification(event.title, 2 * 60 * 1000)

      // Log to notification history
      addNotification({
        title: 'Peman Reyisi',
        body: `Ou achte ${qty} tikè pou ${event.title} — ${total.toLocaleString()} ${event.currency}`,
        eventId: event.id,
        type: 'purchase',
      })

      // Trigger PWA install prompt after first purchase
      triggerInstallPrompt()
      hapticSuccess()

      setStep('done')
    }, 2500)
  }

  if (step === 'processing') {
    return (
      <div className="checkout">
        <div className="checkout-processing">
          <div className="spinner" />
          <p>Ap trete peman...</p>
          <span className="processing-sub">MonCash</span>
        </div>
      </div>
    )
  }

  if (step === 'done') {
    return (
      <div className="checkout">
        <div className="checkout-success">
          <div className="success-icon">✓</div>
          <h2>Peman Reyisi!</h2>
          <p>Ou achte {qty} tikè pou</p>
          <strong>{event.title}</strong>
          <div className="success-total">{total.toLocaleString()} {event.currency}</div>
          <p className="success-note">Ou pral resevwa yon notifikasyon 1 minit anvan evènman an.</p>
          <button className="btn btn-primary" onClick={() => navigate('/tickets')}>
            Wè Tikè Mwen
          </button>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/')}>
            Retounen Lakay
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout">
      <div className="checkout-header">
        <button className="detail-back" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
        </button>
        <h1>Checkout</h1>
      </div>

      <div className="checkout-body">
        {/* Event summary */}
        <div className="checkout-event">
          <div className="checkout-event-visual" style={{ background: event.gradient }}>
            <span>{event.emoji}</span>
          </div>
          <div>
            <h3>{event.title}</h3>
            <p>{event.venue}, {event.city}</p>
          </div>
        </div>

        {step === 'qty' && (
          <div className="checkout-section">
            <label className="checkout-label">Kantite tikè</label>
            <div className="qty-picker">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="qty-btn">−</button>
              <span className="qty-value">{qty}</span>
              <button onClick={() => setQty(Math.min(event.spotsLeft, qty + 1))} className="qty-btn">+</button>
            </div>

            <div className="checkout-summary">
              <div className="summary-row">
                <span>Pri tikè</span>
                <span>{event.price.toLocaleString()} {event.currency}</span>
              </div>
              <div className="summary-row">
                <span>Kantite</span>
                <span>×{qty}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{total.toLocaleString()} {event.currency}</span>
              </div>
            </div>

            <button className="btn btn-primary btn-full" onClick={() => setStep('pay')}>
              Kontinye ak Peman
            </button>
          </div>
        )}

        {step === 'pay' && (
          <div className="checkout-section">
            <div className="moncash-header">
              <div className="moncash-logo">MonCash</div>
              <span className="moncash-secure">Peman Sekirize</span>
            </div>

            <div className="form-group">
              <label>Nimewo Telefòn</label>
              <div className="input-wrapper">
                <span className="input-prefix">+509</span>
                <input
                  type="tel"
                  placeholder="XXXX XXXX"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 8))}
                  maxLength={8}
                />
              </div>
            </div>

            <div className="form-group">
              <label>PIN MonCash</label>
              <input
                type="password"
                placeholder="• • • •"
                value={pin}
                onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="pin-input"
                maxLength={6}
              />
            </div>

            {error && <p className="checkout-error">{error}</p>}

            <div className="checkout-summary compact">
              <div className="summary-row total">
                <span>Total</span>
                <span>{total.toLocaleString()} {event.currency}</span>
              </div>
            </div>

            <button className="btn btn-primary btn-full" onClick={handlePay}>
              Peye {total.toLocaleString()} {event.currency}
            </button>
            <button className="btn-text" onClick={() => setStep('qty')}>← Retounen</button>
          </div>
        )}
      </div>
    </div>
  )
}
