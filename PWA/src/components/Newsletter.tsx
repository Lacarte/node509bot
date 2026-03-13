import { useState } from 'react'
import './Newsletter.css'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section className="newsletter" id="newsletter">
      <div className="container">
        <div className="newsletter-inner">
          <div className="nl-glow" />
          <h2>Pa Rate Okenn Evènman</h2>
          <p>Enskri pou resevwa notifikasyon sou evènman ki ap vini</p>

          {submitted ? (
            <div className="nl-success">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Mèsi! Ou enskri avèk siksè.
            </div>
          ) : (
            <form className="nl-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Antre email ou..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary">Enskri</button>
            </form>
          )}

          <span className="nl-note">Rejwenn 10,000+ moun ki renmen mizik</span>
        </div>
      </div>
    </section>
  )
}
