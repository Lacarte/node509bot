import { useState, useRef } from 'react'
import { useUserPrefs } from '../data/store'
import './Onboarding.css'

const slides = [
  {
    emoji: '',
    useLogo: true,
    title: 'Byenveni nan Node509',
    desc: 'Dekouvri evènman ki pi cho an Ayiti. Konsè, festival, nightlife — tout nan yon sèl plas.',
  },
  {
    emoji: '🎫',
    useLogo: false,
    title: 'Achte tikè fasil',
    desc: 'Peye ak MonCash epi resevwa tikè dijital ou imedyatman ak kòd QR.',
  },
  {
    emoji: '🔔',
    useLogo: false,
    title: 'Pa rate anyen',
    desc: 'Resevwa notifikasyon pou evènman ou renmen anvan yo kòmanse.',
  },
]

export default function Onboarding() {
  const { hasCompletedOnboarding, markOnboardingDone } = useUserPrefs()
  const [index, setIndex] = useState(0)
  const [exiting, setExiting] = useState(false)
  const touchRef = useRef<number>(0)

  if (hasCompletedOnboarding) return null

  const finish = () => {
    setExiting(true)
    setTimeout(() => markOnboardingDone(), 400)
  }

  const next = () => {
    if (index < slides.length - 1) setIndex(i => i + 1)
    else finish()
  }

  const onTouchStart = (e: React.TouchEvent) => { touchRef.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchRef.current
    if (dx < -50) next()
    else if (dx > 50 && index > 0) setIndex(i => i - 1)
  }

  const slide = slides[index]

  return (
    <div
      className={`onboarding ${exiting ? 'onboarding--exit' : ''}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button className="onboarding-skip" onClick={finish}>Sote</button>

      <div className="onboarding-slide" key={index}>
        {slide.useLogo ? (
          <div className="onboarding-logo-wrap">
            <img src="/icons/logo.svg" alt="Node509" className="onboarding-logo" />
          </div>
        ) : (
          <div className="onboarding-emoji">{slide.emoji}</div>
        )}
        <h2>{slide.title}</h2>
        <p>{slide.desc}</p>
      </div>

      <div className="onboarding-footer">
        <div className="onboarding-dots">
          {slides.map((_, i) => (
            <span key={i} className={`onboarding-dot ${i === index ? 'active' : ''}`} />
          ))}
        </div>
        <button className="btn btn-primary" onClick={next}>
          {index === slides.length - 1 ? 'Kòmanse' : 'Pwochen'}
        </button>
      </div>
    </div>
  )
}
