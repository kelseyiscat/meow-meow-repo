import { METRICS, RANGES } from '../../profileData'

/**
 * The running counters. A single range filter sits in one row above the grid
 * and drives every tile, so the whole set always describes the same window.
 */
export function MetricGrid({ range, onRangeChange }) {
  const metrics = METRICS[range]

  return (
    <>
      <div className="filter-row" role="group" aria-label="Metric range">
        {RANGES.map((r) => (
          <button
            key={r.id}
            type="button"
            className={`chip${r.id === range ? ' on' : ''}`}
            aria-pressed={r.id === range}
            onClick={() => onRangeChange(r.id)}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="metric-grid">
        {metrics.map((m) => (
          <MetricTile key={m.id} metric={m} />
        ))}
      </div>
    </>
  )
}

function MetricTile({ metric }) {
  const { label, value, unit, delta, series } = metric
  const dir = delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat'

  return (
    <div className="metric">
      <div className="metric-label">{label}</div>
      <div className="metric-val">
        {value.toLocaleString('en-US')}
        {unit && <span className="unit">{unit}</span>}
      </div>
      <Sparkline points={series} />
      <div className={`metric-delta ${dir}`}>
        <Arrow dir={dir} />
        {dir === 'flat' ? 'No change' : `${Math.abs(delta)}% vs previous`}
      </div>
    </div>
  )
}

function Arrow({ dir }) {
  if (dir === 'flat') return <span className="dash" aria-hidden="true">—</span>
  const up = dir === 'up'
  return (
    <svg viewBox="0 0 24 24" className="delta-ico" aria-hidden="true">
      <path d={up ? 'M12 19V5M6 11l6-6 6 6' : 'M12 5v14M6 13l6 6 6-6'} />
    </svg>
  )
}

/** One series per tile — the tile label names it, so no legend. */
function Sparkline({ points, width = 200, height = 30 }) {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const span = max - min || 1
  const xy = points.map((p, i) => [
    (i / (points.length - 1)) * width,
    height - ((p - min) / span) * (height - 4) - 2,
  ])
  const line = xy.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const area = `${line} L${width} ${height} L0 ${height} Z`

  return (
    <svg className="metric-spark" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      <path d={area} fill="var(--spark-fill)" stroke="none" />
      <path
        d={line}
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
