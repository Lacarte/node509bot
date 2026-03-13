import './Categories.css'

const categories = [
  { icon: '🎤', name: 'Konsè', count: '120+' },
  { icon: '🎪', name: 'Festival', count: '45+' },
  { icon: '🎷', name: 'Jazz', count: '30+' },
  { icon: '🎭', name: 'Teyat', count: '25+' },
  { icon: '🏟️', name: 'Espò', count: '60+' },
  { icon: '🎉', name: 'Nightlife', count: '80+' },
]

export default function Categories() {
  return (
    <section className="categories" id="categories">
      <div className="container">
        <div className="section-header">
          <h2>Kategori Evènman</h2>
          <p>Eksplore pa kalite evènman ou renmen</p>
        </div>

        <div className="categories-grid">
          {categories.map(c => (
            <button key={c.name} className="category-card">
              <span className="category-icon">{c.icon}</span>
              <h4>{c.name}</h4>
              <span className="category-count">{c.count} evènman</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
