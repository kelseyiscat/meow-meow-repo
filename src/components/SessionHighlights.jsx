import { DataTable } from './DataTable'
import { useReveal } from '../hooks/useReveal'
import { SESSIONS } from '../data'

/**
 * Three superlative sessions. Each card leads with the number that earned
 * the title, then the prompt itself — the prompt is the story, the stat is
 * only the reason it's on the page.
 */
export function SessionHighlights({ tablesOpen }) {
  return (
    <>
      <div className="sess">
        {SESSIONS.map((s, i) => (
          <SessionCard key={s.id} session={s} delay={i * 90} />
        ))}
      </div>

      <DataTable
        open={tablesOpen}
        caption="Standout sessions"
        head={['Superlative', 'Prompt', 'Headline stat', 'When']}
        rows={SESSIONS.map((s) => [
          s.kicker.replace('Your ', ''),
          s.title,
          `${s.stat} ${s.unit}`,
          s.meta,
        ])}
      />
    </>
  )
}

function SessionCard({ session, delay }) {
  const [ref, shown] = useReveal({ threshold: 0.25 })
  return (
    <article
      ref={ref}
      className={`sess-card rv${shown ? ' in' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="sess-k">{session.kicker}</div>
      <div className="sess-stat">
        {session.stat}
        <span className="unit">{session.unit}</span>
      </div>
      <p className="sess-q">“{session.title}”</p>
      <div className="sess-meta">{session.meta}</div>
      <dl className="sess-metrics">
        {session.metrics.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <p className="sess-note">{session.note}</p>
    </article>
  )
}
