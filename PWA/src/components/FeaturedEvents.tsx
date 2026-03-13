import './FeaturedEvents.css'

const events = [
  { id: 1, title: 'KAI Live in Concert', date: '6 Fev 2026', venue: 'Karibe Hotel, PaP', price: '2,500 HTG', badge: 'Hot', gradient: 'concert', emoji: '🎤' },
  { id: 2, title: 'Rutshelle Valentine Special', date: '14 Fev 2026', venue: 'Royal Oasis, PaP', price: '3,000 HTG', badge: 'VIP', gradient: 'romantic', emoji: '💃' },
  { id: 3, title: 'Carnival Pre-Party', date: '20 Fev 2026', venue: 'Champ de Mars', price: '1,500 HTG', badge: 'Trending', gradient: 'carnival', emoji: '🎭' },
  { id: 4, title: 'Harmonik Love Edition', date: '14 Fev 2026', venue: 'NH Hotel, PaP', price: '3,500 HTG', badge: 'Sold Out', gradient: 'jazz', emoji: '🎷' },
  { id: 5, title: 'Kanaval 2026', date: '22 Fev 2026', venue: 'Jacmel, Ayiti', price: '500 HTG', badge: 'Free Entry', gradient: 'festival', emoji: '🎉' },
  { id: 6, title: 'Kompa Night Live', date: '28 Fev 2026', venue: 'Marriott, PaP', price: '2,000 HTG', badge: 'New', gradient: 'party', emoji: '🎶' },
]

export default function FeaturedEvents() {
  return (
    <section className="featured-events" id="events">
      <div className="container">
        <div className="section-header">
          <h2>Evènman an Vedèt</h2>
          <p>Dekouvri evènman ki pi popilè nan moman sa a</p>
        </div>

        <div className="events-grid">
          {events.map(e => (
            <article key={e.id} className="event-card">
              <div className={`event-image ${e.gradient}`}>
                <span className="event-emoji">{e.emoji}</span>
                <span className="event-badge">{e.badge}</span>
                <button className="event-fav" aria-label="Favorite">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
              </div>
              <div className="event-body">
                <div className="event-date">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {e.date}
                </div>
                <h3 className="event-title">{e.title}</h3>
                <div className="event-venue">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {e.venue}
                </div>
                <div className="event-footer">
                  <div className="event-price">
                    <span>Depi</span>
                    <strong>{e.price}</strong>
                  </div>
                  <button className="btn btn-primary btn-sm">Achte Tikè</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
