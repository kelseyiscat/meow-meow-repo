import { BADGES } from '../../profileData'

export function BadgeGrid() {
  const earned = BADGES.filter((b) => b.earned)
  const locked = BADGES.filter((b) => !b.earned)

  return (
    <>
      <div className="badge-grid">
        {earned.map((b) => <Badge key={b.id} badge={b} />)}
      </div>

      <div className="badge-split">
        <span>In progress</span>
        <i />
      </div>

      <div className="badge-grid">
        {locked.map((b) => <Badge key={b.id} badge={b} locked />)}
      </div>
    </>
  )
}

function Badge({ badge, locked = false }) {
  const pct = Math.round((badge.progress ?? 0) * 100)

  return (
    <div className={`badge${locked ? ' locked' : ''}`}>
      <div className="badge-medal" style={locked ? undefined : { borderColor: badge.tint }}>
        <span aria-hidden="true">{badge.icon}</span>
      </div>
      <div className="badge-body">
        <div className="badge-name">{badge.name}</div>
        <div className="badge-desc">{badge.desc}</div>
        {locked ? (
          <div className="badge-progress">
            <div className="badge-track">
              <i style={{ width: `${pct}%`, background: badge.tint }} />
            </div>
            <span>{badge.goal}</span>
          </div>
        ) : (
          <div className="badge-earned">Earned {badge.earned}</div>
        )}
      </div>
    </div>
  )
}
