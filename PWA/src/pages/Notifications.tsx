import { useNavigate } from 'react-router-dom'
import { useNotificationHistory } from '../data/store'
import './Notifications.css'

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'kounye a'
  if (mins < 60) return `${mins} min de sa`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h de sa`
  const days = Math.floor(hrs / 24)
  return `${days}j de sa`
}

export default function Notifications() {
  const navigate = useNavigate()
  const { notifications, markRead, markAllRead, unreadCount } = useNotificationHistory()

  const handleTap = (n: typeof notifications[0]) => {
    markRead(n.id)
    if (n.eventId) navigate(`/event/${n.eventId}`)
  }

  return (
    <div className="notif-page">
      <header className="notif-header">
        <button className="detail-back" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
        </button>
        <h1>Notifikasyon</h1>
        {unreadCount > 0 && (
          <button className="notif-mark-all" onClick={markAllRead}>
            Make tout li
          </button>
        )}
      </header>

      {notifications.length === 0 ? (
        <div className="notif-empty">
          <div className="notif-empty-icon">🔔</div>
          <h3>Pa gen notifikasyon</h3>
          <p>Notifikasyon ou yo ap parèt isit la.</p>
        </div>
      ) : (
        <div className="notif-list">
          {notifications.map(n => (
            <button
              key={n.id}
              className={`notif-item ${!n.read ? 'notif-item--unread' : ''}`}
              onClick={() => handleTap(n)}
            >
              <div className={`notif-icon notif-icon--${n.type}`}>
                {n.type === 'purchase' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                )}
                {n.type === 'reminder' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                )}
                {n.type === 'info' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                )}
              </div>
              <div className="notif-content">
                <strong>{n.title}</strong>
                <p>{n.body}</p>
              </div>
              <div className="notif-meta">
                <span className="notif-time">{timeAgo(n.timestamp)}</span>
                {!n.read && <span className="notif-dot" />}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
