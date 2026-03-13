import { useState, useEffect } from 'react'
import { getTickets, type Ticket } from '../data/events'
import './MyTickets.css'

export default function MyTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    setTickets(getTickets())
  }, [])

  const formatDate = (d: string) => {
    const date = new Date(d)
    const months = ['Jan','Fev','Mas','Avr','Me','Jen','Jiy','Out','Sep','Okt','Nov','Des']
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  const formatPurchaseDate = (d: string) => {
    const date = new Date(d)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
  }

  return (
    <div className="my-tickets">
      <header className="tickets-header">
        <h1>Tikè Mwen</h1>
        <span className="ticket-count">{tickets.length}</span>
      </header>

      {tickets.length === 0 ? (
        <div className="tickets-empty">
          <div className="empty-icon">🎫</div>
          <h2>Pa gen tikè</h2>
          <p>Ou poko achte okenn tikè. Ale nan paj dakèy pou jwenn evènman.</p>
        </div>
      ) : (
        <div className="tickets-list">
          {tickets.map(t => (
            <div key={t.id} className="ticket-card" onClick={() => setExpanded(expanded === t.id ? null : t.id)}>
              <div className="ticket-top">
                <div className="ticket-event-visual" style={{ background: t.event.gradient }}>
                  <span>{t.event.emoji}</span>
                </div>
                <div className="ticket-info">
                  <h3>{t.event.title}</h3>
                  <p>{formatDate(t.event.date)} · {t.event.time}</p>
                  <p>{t.event.venue}, {t.event.city}</p>
                </div>
                <div className="ticket-qty-badge">{t.qty}×</div>
              </div>

              {expanded === t.id && (
                <div className="ticket-expanded">
                  <div className="ticket-qr">
                    <img src={t.qrCode} alt="QR Code" />
                    <span className="qr-label">{t.id}</span>
                  </div>
                  <div className="ticket-details">
                    <div className="td-row">
                      <span>Total</span>
                      <strong>{t.total.toLocaleString()} {t.event.currency}</strong>
                    </div>
                    <div className="td-row">
                      <span>Peman</span>
                      <span>{t.paymentMethod}</span>
                    </div>
                    <div className="td-row">
                      <span>Telefòn</span>
                      <span>+509 {t.phone}</span>
                    </div>
                    <div className="td-row">
                      <span>Achte</span>
                      <span>{formatPurchaseDate(t.purchasedAt)}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="ticket-tear" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
