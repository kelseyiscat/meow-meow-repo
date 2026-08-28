import { useReveal } from '../hooks/useReveal'
import { FACTS } from '../data'

export function FactGrid() {
  return (
    <div className="facts">
      {FACTS.map((fact, i) => (
        <FactCard key={fact.k} fact={fact} delay={(i % 3) * 80} />
      ))}
    </div>
  )
}

function FactCard({ fact, delay }) {
  const [ref, shown] = useReveal({ threshold: 0.3 })
  return (
    <div ref={ref} className={`fact rv${shown ? ' in' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="fact-k">{fact.k}</div>
      <div className="fact-v">{fact.v}</div>
      <div className="fact-d">{fact.d}</div>
    </div>
  )
}
