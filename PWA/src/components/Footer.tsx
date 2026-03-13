import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="logo">
              <img src="/icons/logo.svg" alt="Node509" className="logo-icon" />
              <span className="logo-text">NODE<span className="logo-accent">509</span></span>
            </a>
            <p>Platfòm tikè evènman #1 an Ayiti. Dekouvri, achte, ak patisipe nan evènman ki pi cho nan peyi a.</p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="TikTok">🎵</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Platfòm</h4>
            <ul>
              <li><a href="#">Tout Evènman</a></li>
              <li><a href="#">Kategori</a></li>
              <li><a href="#">Atis</a></li>
              <li><a href="#">Lokal</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Konpayi</h4>
            <ul>
              <li><a href="#">Konsènan Nou</a></li>
              <li><a href="#">Kontakte Nou</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Kondisyon Itilizasyon</a></li>
              <li><a href="#">Confidansyalite</a></li>
              <li><a href="#">Ranbousman</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; 2026 Node509. Fèt avèk <span>❤️</span> an Ayiti
          </p>
          <div className="footer-payments">
            <span className="pay-badge">MonCash</span>
            <span className="pay-badge">Natcash</span>
            <span className="pay-badge">Visa</span>
            <span className="pay-badge">MC</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
