import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getEvent } from '../data/events'
import { useFavorites } from '../data/store'
import { showToast } from '../components/Toast'
import { hapticMedium } from '../utils/haptics'
import './EventDetail.css'

export default function EventDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const event = getEvent(id || '')
  const { isFavorite, toggleFavorite } = useFavorites()

  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    if (!event) return
    const update = () => {
      const target = new Date(`${event.date}T${event.time}`).getTime()
      const diff = target - Date.now()
      if (diff <= 0) { setCountdown('Evènman fini'); return }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      if (d === 0 && h === 0) setCountdown('Jodi a!')
      else if (d === 0) setCountdown(`Nan ${h} èdtan`)
      else setCountdown(`Nan ${d} jou, ${h}h`)
    }
    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [event])

  if (!event) {
    return (
      <div className="detail-empty">
        <p>Evènman pa jwenn</p>
        <Link to="/" className="btn btn-primary btn-sm">Retounen</Link>
      </div>
    )
  }

  const dateObj = new Date(event.date)
  const months = ['Janvye','Fevriye','Mas','Avril','Me','Jen','Jiyè','Out','Septanm','Oktòb','Novanm','Desanm']
  const days = ['Dimanch','Lendi','Madi','Mèkredi','Jedi','Vandredi','Samdi']
  const fullDate = `${days[dateObj.getDay()]}, ${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`
  const soldOut = event.spotsLeft === 0
  const fav = isFavorite(event.id)

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try { await navigator.share({ title: event.title, text: event.description, url }) } catch {}
    } else {
      await navigator.clipboard.writeText(url)
      showToast('Lyen kopye!')
    }
  }

  const handleFav = () => {
    toggleFavorite(event.id)
    hapticMedium()
    showToast(fav ? 'Retire nan favoris' : 'Ajoute nan favoris')
  }

  return (
    <div className="detail">
      <div className="detail-hero" style={{ background: event.gradient }}>
        <button className="detail-back" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
        </button>
        <div className="detail-hero-actions">
          <button className="detail-action-btn" onClick={handleFav}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill={fav ? '#fff' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button className="detail-action-btn" onClick={handleShare}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
          </button>
        </div>
        <span className="detail-emoji">{event.emoji}</span>
        {event.badge && <span className={`detail-badge ${event.badge === 'Sold Out' ? 'sold-out' : ''}`}>{event.badge}</span>}
      </div>

      <div className="detail-body">
        <h1>{event.title}</h1>
        <p className="detail-artist">{event.artist}</p>

        <div className="detail-chips">
          <div className="chip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            {fullDate}
          </div>
          <div className="chip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            {event.time}
          </div>
          <div className="chip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
            {event.venue}, {event.city}
          </div>
          {countdown && (
            <div className={`chip chip-countdown ${countdown === 'Jodi a!' ? 'chip-today' : ''} ${countdown === 'Evènman fini' ? 'chip-past' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>
              {countdown}
            </div>
          )}
        </div>

        <div className="detail-section">
          <h2>Detay</h2>
          <p>{event.description}</p>
        </div>

        <div className="detail-footer">
          <div className="detail-price-block">
            <span className="detail-price">{event.price.toLocaleString()} {event.currency}</span>
            {!soldOut && <span className="detail-spots">{event.spotsLeft} plas disponib</span>}
            {soldOut && <span className="detail-spots sold-out">Ranpli</span>}
          </div>
          {!soldOut ? (
            <Link to={`/checkout/${event.id}`} className="btn btn-primary">
              Achte Tikè
            </Link>
          ) : (
            <button className="btn btn-disabled" disabled>Ranpli</button>
          )}
        </div>
      </div>
    </div>
  )
}
