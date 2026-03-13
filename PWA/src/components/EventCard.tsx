import { Link } from 'react-router-dom'
import type { Event } from '../data/events'
import { useFavorites } from '../data/store'
import { showToast } from './Toast'
import { hapticMedium } from '../utils/haptics'
import './EventCard.css'

function formatDate(d: string) {
  const date = new Date(d)
  const months = ['Jan','Fev','Mas','Avr','Me','Jen','Jiy','Out','Sep','Okt','Nov','Des']
  return `${date.getDate()} ${months[date.getMonth()]}`
}

export default function EventCard({ event }: { event: Event }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(event.id)

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(event.id)
    hapticMedium()
    showToast(fav ? 'Retire nan favoris' : 'Ajoute nan favoris')
  }

  return (
    <Link to={`/event/${event.id}`} className="event-card">
      <div className="event-visual" style={{ background: event.gradient }}>
        <span className="event-emoji">{event.emoji}</span>
        {event.badge && (
          <span className={`event-badge ${event.badge === 'Sold Out' ? 'sold-out' : ''}`}>
            {event.badge}
          </span>
        )}
        <button className={`fav-btn ${fav ? 'fav-btn--active' : ''}`} onClick={handleFav} aria-label="Favoris">
          <svg width="18" height="18" viewBox="0 0 24 24" fill={fav ? 'var(--primary)' : 'none'} stroke={fav ? 'var(--primary)' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
      <div className="event-info">
        <div className="event-meta">
          <span className="event-date">{formatDate(event.date)}</span>
          <span className="event-dot" />
          <span className="event-time">{event.time}</span>
        </div>
        <h3>{event.title}</h3>
        <p className="event-venue">{event.venue}, {event.city}</p>
        <div className="event-bottom">
          <strong className="event-price">{event.price.toLocaleString()} {event.currency}</strong>
          {event.spotsLeft > 0 ? (
            <span className="spots">{event.spotsLeft} plas</span>
          ) : (
            <span className="spots sold-out">Ranpli</span>
          )}
        </div>
      </div>
    </Link>
  )
}
