import { useState } from 'react'
import './Chatbot.css'

const WEBHOOK_URL = 'https://n8n-production-6197.up.railway.app/webhook/97fe3c8c-bfab-48b1-823a-5f9fa3a8bca4/chat'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Byenveni nan Node509! Kijan mwen ka ede w jodi a?' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'bot', text: data.output || data.message || 'Mwen pa ka reponn pou kounye a.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'Erè koneksyon. Eseye ankò.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {!open && (
        <button className="chat-fab" onClick={() => setOpen(true)} aria-label="Open chat">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </button>
      )}

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <img src="/icons/logo.svg" alt="" className="chat-logo" />
            <div>
              <strong>Node509 Bot</strong>
              <span className="chat-status">Online</span>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg--${m.role}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="chat-msg chat-msg--bot chat-typing"><span /><span /><span /></div>}
          </div>

          <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send() }}>
            <input
              type="text"
              placeholder="Ekri mesaj ou..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" disabled={loading} aria-label="Send">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}
