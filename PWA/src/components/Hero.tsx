import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-orb hero-orb--1" />
        <div className="hero-orb hero-orb--2" />
        <div className="hero-orb hero-orb--3" />
        <div className="hero-grid-pattern" />
      </div>

      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse-dot" />
            Platfom #1 an Ayiti
          </div>

          <h1>
            Dekouvri Evènman <span className="highlight">Pi Cho</span> an Ayiti
          </h1>

          <p className="hero-subtitle">
            Achte tikè pou konsè, festival, ak evènman eksklizif nan tout peyi Ayiti.
          </p>

          <div className="hero-search">
            <div className="search-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input type="text" placeholder="Chèche evènman, atis, oswa lokal..." />
            </div>
            <button className="btn btn-primary">Explore</button>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-value">500+</span>
              <span className="stat-label">Evènman</span>
            </div>
            <div className="stat-divider" />
            <div className="hero-stat">
              <span className="stat-value">50K+</span>
              <span className="stat-label">Tikè Vann</span>
            </div>
            <div className="stat-divider" />
            <div className="hero-stat">
              <span className="stat-value">100+</span>
              <span className="stat-label">Atis</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-logo-glow">
            <img src="/icons/logo.svg" alt="Node509" />
          </div>
        </div>
      </div>

      <div className="scroll-cue">
        <div className="scroll-line" />
      </div>
    </section>
  )
}
