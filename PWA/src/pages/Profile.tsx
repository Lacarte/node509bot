import { useNavigate } from 'react-router-dom'
import { getTickets, events } from '../data/events'
import { useFavorites, useNotificationHistory, useUserPrefs } from '../data/store'
import { canInstall, triggerInstallPrompt } from '../utils/install'
import { showToast } from '../components/Toast'
import EventCard from '../components/EventCard'
import './Profile.css'

export default function Profile() {
  const navigate = useNavigate()
  const tickets = getTickets()
  const { favorites } = useFavorites()
  const { unreadCount } = useNotificationHistory()
  const { notificationsEnabled, toggleNotifications } = useUserPrefs()

  const totalSpent = tickets.reduce((s, t) => s + t.total, 0)
  const favEvents = events.filter(e => favorites.includes(e.id))

  const handleClearData = () => {
    if (confirm('Efase tout done lokal? Sa pral retire tikè, favoris, ak notifikasyon.')) {
      localStorage.removeItem('node509_tickets')
      localStorage.removeItem('node509_favorites')
      localStorage.removeItem('node509_notifications')
      showToast('Done efase', 'info')
      setTimeout(() => window.location.reload(), 500)
    }
  }

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="profile-header-bg" />
        <div className="profile-header-row">
          <img src="/icons/logo-symbol.svg" alt="Node509" className="profile-logo" />
          <div>
            <h1>Pwofil</h1>
            <p className="profile-tagline">Node509 · Tikè Evènman</p>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="profile-stats">
        <div className="stat-card stat-card--green">
          <span className="stat-value">{tickets.length}</span>
          <span className="stat-label">Tikè</span>
        </div>
        <div className="stat-card stat-card--amber">
          <span className="stat-value">{favorites.length}</span>
          <span className="stat-label">Favoris</span>
        </div>
        <div className="stat-card stat-card--surface">
          <span className="stat-value">{totalSpent > 0 ? `${(totalSpent/1000).toFixed(1)}k` : '0'}</span>
          <span className="stat-label">HTG depanse</span>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="profile-section">
        <h2>Aksyon Rapid</h2>
        <div className="action-list">
          <button className="action-item" onClick={() => navigate('/notifications')}>
            <div className="action-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </div>
            <span>Notifikasyon</span>
            {unreadCount > 0 && <span className="action-badge">{unreadCount}</span>}
            <svg className="action-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          {canInstall() && (
            <button className="action-item" onClick={() => { triggerInstallPrompt(); showToast('Enstale Node509!') }}>
              <div className="action-icon action-icon--green">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              </div>
              <span>Enstale App la</span>
              <svg className="action-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          )}
        </div>
      </section>

      {/* Favorites */}
      {favEvents.length > 0 && (
        <section className="profile-section">
          <h2>Favoris Mwen</h2>
          <div className="profile-favs">
            {favEvents.map(e => <EventCard key={e.id} event={e} />)}
          </div>
        </section>
      )}

      {/* Settings */}
      <section className="profile-section">
        <h2>Paramèt</h2>
        <div className="action-list">
          <div className="action-item">
            <div className="action-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </div>
            <span>Notifikasyon</span>
            <label className="toggle">
              <input type="checkbox" checked={notificationsEnabled} onChange={toggleNotifications} />
              <div className="toggle-track" />
            </label>
          </div>

          <button className="action-item action-item--danger" onClick={handleClearData}>
            <div className="action-icon action-icon--danger">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </div>
            <span>Efase Tout Done</span>
            <svg className="action-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </section>

      {/* About */}
      <div className="profile-about">
        <img src="/icons/logo.svg" alt="" className="about-logo" />
        <p className="about-version">Node509 v1.0.0</p>
        <p className="about-tagline">Fèt ak kè an Ayiti</p>
      </div>
    </div>
  )
}
