import { useReveal } from '../hooks/useReveal'
import { FIELD } from '../data'

const fmt = (n) => n.toLocaleString('en-US')

/** A weighted word-cloud of the prompts you asked in your favorite field. */
export function QuestionCloud() {
  const [ref, shown] = useReveal({ threshold: 0.2 })
  return (
    <>
      <div ref={ref} className="cloud" aria-label={`Most-asked questions in ${FIELD.name}`}>
        {FIELD.cloud.map((p, i) => (
          <span
            key={p.q}
            className={`cloud-w cw${shown ? ' in' : ''}`}
            data-w={p.w}
            style={{ '--i': i }}
          >
            {p.q}
          </span>
        ))}
      </div>
      <div className="cloud-meta">
        <span>
          <b>{FIELD.name}</b> · {fmt(FIELD.prompts)} prompts · {FIELD.share}% of your year
        </span>
        <span className="cloud-note">sized by how often you asked</span>
      </div>
    </>
  )
}
