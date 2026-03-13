export interface Event {
  id: string
  title: string
  artist: string
  date: string
  time: string
  venue: string
  city: string
  price: number
  currency: string
  category: string
  gradient: string
  emoji: string
  badge?: string
  description: string
  spotsLeft: number
}

export interface Ticket {
  id: string
  eventId: string
  event: Event
  qty: number
  total: number
  purchasedAt: string
  paymentMethod: string
  phone: string
  qrCode: string
}

export const events: Event[] = [
  {
    id: 'evt-001',
    title: 'KAI Live in Concert',
    artist: 'KAI',
    date: '2026-03-20',
    time: '20:00',
    venue: 'Karibe Hotel',
    city: 'Port-au-Prince',
    price: 2500,
    currency: 'HTG',
    category: 'Konsè',
    gradient: 'linear-gradient(135deg, #5b4bbd, #8b5cf6)',
    emoji: '🎤',
    badge: 'Hot',
    description: 'KAI ap bay yon gwo konsè live nan Karibe Hotel. Vin viv yon eksperyans inoubliyab ak mizik live, limyè, ak anbyans ekstraòdinè.',
    spotsLeft: 45,
  },
  {
    id: 'evt-002',
    title: 'Rutshelle Valentine Special',
    artist: 'Rutshelle Guillaume',
    date: '2026-03-28',
    time: '21:00',
    venue: 'Royal Oasis',
    city: 'Port-au-Prince',
    price: 3000,
    currency: 'HTG',
    category: 'Konsè',
    gradient: 'linear-gradient(135deg, #e44d8a, #f06292)',
    emoji: '💃',
    badge: 'VIP',
    description: 'Yon sware womantik ak Rutshelle Guillaume. Mizik, lanmou, ak pasyon nan yon anbyans VIP eksklizif.',
    spotsLeft: 20,
  },
  {
    id: 'evt-003',
    title: 'Kanaval Pre-Party',
    artist: 'T-Vice',
    date: '2026-04-05',
    time: '19:00',
    venue: 'Champ de Mars',
    city: 'Port-au-Prince',
    price: 1500,
    currency: 'HTG',
    category: 'Festival',
    gradient: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
    emoji: '🎭',
    badge: 'Trending',
    description: 'Prepare kò w pou Kanaval 2026! T-Vice ap leve Champ de Mars ak yon pre-party ki pral inoubliyab.',
    spotsLeft: 200,
  },
  {
    id: 'evt-004',
    title: 'Harmonik Love Edition',
    artist: 'Harmonik',
    date: '2026-04-14',
    time: '20:30',
    venue: 'NH Hotel',
    city: 'Port-au-Prince',
    price: 3500,
    currency: 'HTG',
    category: 'Konsè',
    gradient: 'linear-gradient(135deg, #f59e0b, #f97316)',
    emoji: '🎷',
    badge: 'Sold Out',
    description: 'Harmonik retounen ak yon edisyon espesyal Love. Yon sware plen mizik konpa ak aranжman orijinal.',
    spotsLeft: 0,
  },
  {
    id: 'evt-005',
    title: 'Kanaval Jacmel 2026',
    artist: 'Plizyè Atis',
    date: '2026-04-22',
    time: '10:00',
    venue: 'Ri Santral',
    city: 'Jacmel',
    price: 500,
    currency: 'HTG',
    category: 'Festival',
    gradient: 'linear-gradient(135deg, #ec4899, #f472b6)',
    emoji: '🎉',
    description: 'Kanaval Jacmel — pi bèl kanaval nan Karayib la! Mask, parad, mizik, ak kilti ayisyèn nan tout bèlte li.',
    spotsLeft: 500,
  },
  {
    id: 'evt-006',
    title: 'Kompa Night Live',
    artist: 'Enposib',
    date: '2026-05-01',
    time: '22:00',
    venue: 'Marriott',
    city: 'Port-au-Prince',
    price: 2000,
    currency: 'HTG',
    category: 'Nightlife',
    gradient: 'linear-gradient(135deg, #14b8a6, #5eead4)',
    emoji: '🎶',
    badge: 'New',
    description: 'Enposib ap mete dife nan Marriott ak yon konsè kompa live. Danse, chante, ak viv mizik la.',
    spotsLeft: 80,
  },
]

// localStorage-backed ticket store
const TICKETS_KEY = 'node509_tickets'

function loadTickets(): Ticket[] {
  try {
    return JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]')
  } catch { return [] }
}

export function getTickets(): Ticket[] {
  return loadTickets()
}

export function addTicket(ticket: Ticket): void {
  const tickets = [ticket, ...loadTickets()]
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets))
}

export function getEvent(id: string): Event | undefined {
  return events.find(e => e.id === id)
}

export function generateQR(ticketId: string): string {
  // Generate a simple SVG QR-like pattern as data URI
  const size = 200
  const cells = 10
  const cellSize = size / cells
  let rects = ''
  // Seeded random from ticketId
  let seed = 0
  for (let i = 0; i < ticketId.length; i++) seed += ticketId.charCodeAt(i)
  const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }

  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      if (r === 0 || r === cells-1 || c === 0 || c === cells-1 || rand() > 0.5) {
        rects += `<rect x="${c*cellSize}" y="${r*cellSize}" width="${cellSize}" height="${cellSize}" fill="#22C55E"/>`
      }
    }
  }

  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="#0A0A12"/>${rects}</svg>`)}`
}
