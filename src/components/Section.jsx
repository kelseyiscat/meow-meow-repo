import { useReveal } from '../hooks/useReveal'

/** A titled block that fades in on scroll and hands `shown` to its children. */
export function Section({ kicker, title, sub, children }) {
  const [ref, shown] = useReveal()
  return (
    <section className="blk">
      <div ref={ref} className={`sec-head rv${shown ? ' in' : ''}`}>
        {kicker && <div className="sec-kicker">{kicker}</div>}
        <h2>{title}</h2>
        {sub && <p className="sec-sub">{sub}</p>}
      </div>
      {typeof children === 'function' ? children(shown) : children}
    </section>
  )
}

/** The bordered card charts sit in. Reveals itself, then animates its marks. */
export function Panel({ children, className = '' }) {
  const [ref, shown] = useReveal({ threshold: 0.22 })
  return (
    <div ref={ref} className={`panel rv${shown ? ' in' : ''} ${className}`.trim()}>
      {typeof children === 'function' ? children(shown) : children}
    </div>
  )
}
