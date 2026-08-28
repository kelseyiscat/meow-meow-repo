import { useTooltip } from '../Tooltip'
import { LAST_WEEK } from '../../profileData'

const total = LAST_WEEK.reduce((n, d) => n + d.prompts, 0)
const totalHours = LAST_WEEK.reduce((n, d) => n + d.hours, 0)
const peak = LAST_WEEK.reduce((a, b) => (b.prompts > a.prompts ? b : a))

/**
 * Seven days of prompts. Magnitude over time with one hue — height is the
 * encoding — and every column direct-labelled, so the numbers never depend
 * on reading a colour or hovering.
 */
export function UsageChart({ active }) {
  const bind = useTooltip()
  const max = Math.max(...LAST_WEEK.map((d) => d.prompts))

  return (
    <div className="panel">
      <div className="usage-summary">
        <div>
          <div className="usage-total">{total}</div>
          <div className="usage-total-k">prompts this week</div>
        </div>
        <div className="usage-side">
          <div><b>{totalHours.toFixed(1)}h</b><span>agent time</span></div>
          <div><b>{Math.round(total / LAST_WEEK.length)}</b><span>daily average</span></div>
          <div><b>{peak.day}</b><span>busiest day</span></div>
        </div>
      </div>

      <div className="usage-chart">
        {LAST_WEEK.map((d, i) => (
          <div
            className={`usage-col${d.partial ? ' partial' : ''}`}
            key={d.date}
            tabIndex={0}
            {...bind(
              <>
                {d.day} {d.date}&nbsp;<b>{d.prompts}</b> <span>prompts · {d.hours}h</span>
                {d.partial && <span> · today so far</span>}
              </>,
            )}
          >
            <div className="usage-val">{d.prompts}</div>
            <div className="usage-track">
              <div
                className="usage-bar"
                style={{
                  height: active ? `${(d.prompts / max) * 100}%` : 0,
                  transitionDelay: `${i * 60}ms`,
                }}
              />
            </div>
            <div className="usage-day">{d.day}</div>
            <div className="usage-date">{d.date.replace('Aug ', '')}</div>
          </div>
        ))}
      </div>

      <p className="usage-foot">
        Today is still counting. Your busiest day was <b>{peak.day} {peak.date}</b> at{' '}
        <b>{peak.prompts} prompts</b>.
      </p>
    </div>
  )
}
