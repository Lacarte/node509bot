import './Skeleton.css'

export function Skeleton({ w, h, r }: { w?: string; h?: string; r?: string }) {
  return <div className="skel" style={{ width: w, height: h, borderRadius: r }} />
}

export function EventCardSkeleton() {
  return (
    <div className="skel-card">
      <div className="skel skel-visual" />
      <div className="skel-body">
        <div className="skel skel-line" style={{ width: '40%' }} />
        <div className="skel skel-line skel-title" style={{ width: '80%' }} />
        <div className="skel skel-line" style={{ width: '60%' }} />
        <div className="skel-row">
          <div className="skel skel-line" style={{ width: '35%' }} />
          <div className="skel skel-line" style={{ width: '25%' }} />
        </div>
      </div>
    </div>
  )
}

export function TicketCardSkeleton() {
  return (
    <div className="skel-ticket">
      <div className="skel" style={{ width: 50, height: 50, borderRadius: 'var(--radius-md)' }} />
      <div className="skel-body" style={{ flex: 1 }}>
        <div className="skel skel-line" style={{ width: '70%' }} />
        <div className="skel skel-line" style={{ width: '50%' }} />
        <div className="skel skel-line" style={{ width: '40%' }} />
      </div>
      <div className="skel" style={{ width: 32, height: 32, borderRadius: '50%' }} />
    </div>
  )
}
