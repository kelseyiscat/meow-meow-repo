import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../hooks/useReveal'

/** Single headline number + its 12-month context sparkline. */
export function StatTile({ label, value, unit, note, spark, active, delay = 0 }) {
  const shown = useCountUp(value, active)
  const decimals = value % 1 === 0 ? 0 : 1
  return (
    <div className="tile rv in" style={{ transitionDelay: `${delay}ms` }}>
      <div className="tile-label">{label}</div>
      <div className="tile-val">
        {shown.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
        {unit && <span className="unit">{unit}</span>}
      </div>
      <Sparkline points={spark} />
      <div className="tile-note">{note}</div>
    </div>
  )
}

function useCountUp(target, active, duration = 1100) {
  const [value, setValue] = useState(0)
  const raf = useRef(0)

  useEffect(() => {
    if (!active) return
    if (prefersReducedMotion()) {
      setValue(target)
      return
    }
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setValue(target * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [active, target, duration])

  return value
}

/** Single series — the tile label names it, so no legend. */
function Sparkline({ points, width = 200, height = 26 }) {
  if (!points?.length) return null
  const max = Math.max(...points)
  const min = Math.min(...points)
  const span = max - min || 1
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width
      const y = height - ((p - min) / span) * (height - 3) - 1.5
      return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <svg className="spark" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      <path
        d={d}
        fill="none"
        stroke="var(--blue)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
