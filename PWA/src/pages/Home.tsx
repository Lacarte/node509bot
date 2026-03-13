import { useState, useEffect } from 'react'
import { events } from '../data/events'
import EventCard from '../components/EventCard'
import { EventCardSkeleton } from '../components/Skeleton'
import './Home.css'

const categories = ['Tout', 'Konsè', 'Festival', 'Nightlife']

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Bonjou'
  if (h < 18) return 'Bon aprè-midi'
  return 'Bonswa'
}

export default function Home() {
  const [cat, setCat] = useState('Tout')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350)
    return () => clearTimeout(t)
  }, [])

  const filtered = cat === 'Tout' ? events : events.filter(e => e.category === cat)
  const featured = events[0]

  return (
    <div className="home">
      <header className="home-header">
        <div className="home-header-bg" />
        <div className="home-hero">
          <div className="home-top-row">
            <img src="/icons/logo-symbol.svg" alt="Node509" className="home-logo" />
            <div className="home-greeting">
              <span className="greeting-label">{getGreeting()}</span>
              <h1>NODE<span>509</span></h1>
            </div>
          </div>
          <p className="home-subtitle">Dekouvri evènman ki ap vini an Ayiti</p>
        </div>

        {/* Featured event banner */}
        <div className="home-featured" style={{ background: featured.gradient }}>
          <div className="featured-content">
            <span className="featured-badge">Featured</span>
            <h2>{featured.title}</h2>
            <p>{featured.venue} · {featured.date.split('-').reverse().join('/')}</p>
          </div>
          <span className="featured-emoji">{featured.emoji}</span>
        </div>
      </header>

      <nav className="home-tabs">
        {categories.map(c => (
          <button
            key={c}
            className={`tab ${cat === c ? 'active' : ''}`}
            onClick={() => setCat(c)}
          >{c}</button>
        ))}
      </nav>

      <div className="section-label">
        <span>Evènman yo</span>
        <span className="section-count">{filtered.length}</span>
      </div>

      <section className="events-feed">
        {loading ? (
          <>
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </>
        ) : filtered.length > 0 ? (
          filtered.map((e, i) => (
            <div key={e.id} className="event-card-anim" style={{ animationDelay: `${i * 60}ms` }}>
              <EventCard event={e} />
            </div>
          ))
        ) : (
          <div className="feed-empty">
            <p>Pa gen evènman nan kategori sa a</p>
          </div>
        )}
      </section>
    </div>
  )
}
