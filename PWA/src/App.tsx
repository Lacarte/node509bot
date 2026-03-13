import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EventDetail from './pages/EventDetail'
import Checkout from './pages/Checkout'
import MyTickets from './pages/MyTickets'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'
import BottomNav from './components/BottomNav'
import Chatbot from './components/Chatbot'
import Toast from './components/Toast'
import Onboarding from './components/Onboarding'
import OfflineBanner from './components/OfflineBanner'

export default function App() {
  return (
    <BrowserRouter>
      <OfflineBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/tickets" element={<MyTickets />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
      <BottomNav />
      <Chatbot />
      <Toast />
      <Onboarding />
    </BrowserRouter>
  )
}
