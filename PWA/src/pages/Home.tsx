import { useState, useEffect } from 'react'
import { events } from '../data/events'
import EventCard from '../components/EventCard'
import { EventCardSkeleton } from '../components/Skeleton'
import './Home.css'

const categories = ['Tout', 'Konsè', 'Festival', 'Nightlife']

export default function Home() {
  const [cat, setCat] = useState('Tout')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350)
    return () => clearTimeout(t)
  }, [])

  const filtered = cat === 'Tout' ? events : events.filter(e => e.category === cat)

  return (
    <div className="home">
      <header className="home-header">
        <div className="home-hero">
          <img src="/icons/logo.svg" alt="Node509" className="home-logo" />
          <h1>NODE<span>509</span></h1>
          <p>Dekouvri evènman ki ap vini an Ayiti</p>
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
