import './UpcomingEvents.css'

const upcoming = [
  { day: '06', month: 'FEV', title: 'KAI Live in Concert', venue: 'Karibe Hotel, Port-au-Prince', price: '2,500 HTG' },
  { day: '14', month: 'FEV', title: 'Rutshelle Valentine Special', venue: 'Royal Oasis, Port-au-Prince', price: '3,000 HTG' },
  { day: '20', month: 'FEV', title: 'Carnival Pre-Party', venue: 'Champ de Mars, Port-au-Prince', price: '1,500 HTG' },
  { day: '22', month: 'FEV', title: 'Kanaval Jacmel 2026', venue: 'Jacmel, Ayiti', price: '500 HTG' },
  { day: '28', month: 'FEV', title: 'Kompa Night Live', venue: 'Marriott, Port-au-Prince', price: '2,000 HTG' },
]

export default function UpcomingEvents() {
  return (
    <section className="upcoming-events">
      <div className="container">
        <div className="section-header">
          <h2>Pwochen Evènman</h2>
          <p>Pa rate okenn evènman ki ap vini</p>
        </div>

        <div className="upcoming-list">
          {upcoming.map((e, i) => (
            <div key={i} className="upcoming-item">
              <div className="upcoming-date-box">
                <span className="u-day">{e.day}</span>
                <span className="u-month">{e.month}</span>
              </div>
              <div className="upcoming-info">
                <h4>{e.title}</h4>
                <p>{e.venue}</p>
              </div>
              <div className="upcoming-price">
                <span>Depi</span>
                <strong>{e.price}</strong>
              </div>
              <button className="btn btn-outline btn-sm upcoming-btn">Tikè</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
