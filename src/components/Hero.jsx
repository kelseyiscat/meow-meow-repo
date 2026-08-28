import { useReveal } from '../hooks/useReveal'
import { PERIOD } from '../data'

export function Hero() {
  const [ref, shown] = useReveal({ threshold: 0.05 })
  const cls = (i) => `rv${shown ? ' in' : ''}`
  const delay = (i) => ({ transitionDelay: `${i * 110}ms` })

  return (
    <section className="hero" ref={ref}>
      <div className={cls()} style={delay(0)}>
        <div className="eyebrow">Arena · {PERIOD}</div>
      </div>
      <h1 className={cls()} style={delay(1)}>
        You didn't just
        <br />
        ask questions,
        <br />
        <em>you evaluated.</em>
      </h1>
      <div className={`scroll-cue ${cls()}`} style={delay(3)}>
        <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
        Scroll
      </div>
    </section>
  )
}
