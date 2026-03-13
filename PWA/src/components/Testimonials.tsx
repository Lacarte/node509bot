import './Testimonials.css'

const testimonials = [
  {
    text: "Node509 te fè li fasil pou m achte tikè pou Kanaval. Mwen te resevwa e-tikè mwen nan yon segond!",
    name: 'Marie-Claire J.',
    role: 'Fan Mizik',
    initials: 'MJ',
  },
  {
    text: "Pi bon platfòm pou evènman an Ayiti. Peman ak MonCash trè rapid e sekirize.",
    name: 'Jean-Pierre D.',
    role: 'Organizatè Evènman',
    initials: 'JD',
  },
  {
    text: "Mwen renmen eksperyans lan! QR code la travay pafètman nan antre. Pa gen pwoblèm.",
    name: 'Sandra L.',
    role: 'Kliyan Fidèl',
    initials: 'SL',
  },
]

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2>Sa Kliyan Nou Yo Di</h2>
          <p>Eksperyans reyèl ak Node509</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="t-stars">{'★'.repeat(5)}</div>
              <p className="t-text">"{t.text}"</p>
              <div className="t-author">
                <div className="t-avatar">{t.initials}</div>
                <div>
                  <h5>{t.name}</h5>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
