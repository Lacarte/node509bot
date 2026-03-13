import { useState, useRef, useEffect } from 'react'
import { events } from '../data/events'
import EventCard from '../components/EventCard'
import { EventCardSkeleton } from '../components/Skeleton'
import './Search.css'

const categories = ['Tout', 'Konsè', 'Festival', 'Nightlife']

export default function Search() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('Tout')
  const [loading, setLoading] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const t = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(t)
  }, [])

  const q = query.toLowerCase()
  const filtered = events.filter(e => {
    const matchCat = cat === 'Tout' || e.category === cat
    const matchQuery = !q || e.title.toLowerCase().includes(q) ||
      e.artist.toLowerCase().includes(q) ||
      e.venue.toLowerCase().includes(q) ||
      e.city.toLowerCase().includes(q)
    return matchCat && matchQuery
  })

  return (
    <div className="search-page">
      <header className="search-header">
        <div className="search-input-wrap">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Chache evènman, atis, kote..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="search-input"
          />
          {query && (
            <button className="search-clear" onClick={() => setQuery('')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          )}
        </div>
        <div className="search-cats">
          {categories.map(c => (
            <button
              key={c}
              className={`tab ${cat === c ? 'active' : ''}`}
              onClick={() => setCat(c)}
            >{c}</button>
          ))}
        </div>
      </header>

      <section className="search-results">
        {loading ? (
          <>
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </>
        ) : filtered.length > 0 ? (
          filtered.map(e => <EventCard key={e.id} event={e} />)
        ) : (
          <div className="search-empty">
            <div className="search-empty-icon">🔍</div>
            <h3>Pa gen rezilta</h3>
            <p>Eseye chache yon lòt bagay</p>
          </div>
        )}
      </section>
    </div>
  )
}
