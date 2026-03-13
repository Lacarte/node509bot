import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getTickets } from '../data/events'
import { useNotificationHistory } from '../data/store'
import { hapticLight } from '../utils/haptics'
import './BottomNav.css'

interface BottomNavProps {
  onChatToggle?: () => void
}

export default function BottomNav({ onChatToggle }: BottomNavProps) {
  const [ticketCount, setTicketCount] = useState(0)
  const { unreadCount } = useNotificationHistory()

  useEffect(() => {
    setTicketCount(getTickets().length)
    const interval = setInterval(() => setTicketCount(getTickets().length), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="bottom-nav">
      <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={hapticLight}>
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>Akèy</span>
      </NavLink>
      <NavLink to="/search" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={hapticLight}>
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <span>Chache</span>
      </NavLink>
      <NavLink to="/tickets" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={hapticLight}>
        <div className="nav-icon-wrap">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2M13 17v2M13 11v2"/></svg>
          {ticketCount > 0 && <span className="nav-badge">{ticketCount}</span>}
        </div>
        <span>Tikè</span>
      </NavLink>
      {onChatToggle && (
        <button className="nav-item" onClick={() => { hapticLight(); onChatToggle() }}>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span>Chat</span>
        </button>
      )}
      <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={hapticLight}>
        <div className="nav-icon-wrap">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          {unreadCount > 0 && <span className="nav-dot" />}
        </div>
        <span>Pwofil</span>
      </NavLink>
    </nav>
  )
}
