import { useReveal } from '../hooks/useReveal'
import { SESSIONS } from '../data'

/** The three called-out sessions: latest, longest, most complex. */
export function SessionDigest() {
  return (
    <div className="sessions">
      {SESSIONS.map((s, i) => (
        <SessionCard key={s.id} session={s} delay={i * 90} />
      ))}
    </div>
  )
}

function SessionCard({ session: s, delay }) {
  const [ref, shown] = useReveal({ threshold: 0.3 })
  return (
    <div
      ref={ref}
      className={`sess rv${shown ? ' in' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="sess-label">{s.label}</div>
      <div className="sess-val">
        {s.value}
        {s.unit && <span className="unit">{s.unit}</span>}
      </div>
      <div className="sess-prompt" style={{ borderLeftColor: s.accent }}>
        “{s.prompt}”
      </div>
      <div className="sess-chips">
        {s.chips.map((c) => (
          <span key={c} className="tag">
            {c}
          </span>
        ))}
      </div>
      <p className="sess-note">{s.note}</p>
    </div>
  )
}
