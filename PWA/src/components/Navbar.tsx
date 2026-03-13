import { useState, useEffect } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="logo">
          <img src="/icons/logo.svg" alt="Node509" className="logo-icon" />
          <span className="logo-text">NODE<span className="logo-accent">509</span></span>
        </a>

        <div className="nav-links">
          <a href="#events">Events</a>
          <a href="#categories">Categories</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About</a>
        </div>

        <div className="nav-actions">
          <a href="#newsletter" className="btn btn-primary btn-sm">Get Tickets</a>
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger${menuOpen ? ' open' : ''}`}>
              <span /><span /><span />
            </span>
          </button>
        </div>
      </div>

      <div className={`mobile-menu${menuOpen ? ' active' : ''}`}>
        <a href="#events" onClick={() => setMenuOpen(false)}>Events</a>
        <a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a>
        <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#newsletter" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Get Tickets</a>
      </div>
    </nav>
  )
}
