import { useTooltip } from './Tooltip'
import { DataTable } from './DataTable'
import { DAYS, HEATMAP, HEATMAP_MAX, HEATMAP_PEAK, HOURS } from '../data'

/** Sequential blue ramp: the dark end recedes toward the panel surface. */
const RAMP = ['var(--seq-1)', 'var(--seq-2)', 'var(--seq-3)', 'var(--seq-4)', 'var(--seq-5)']
const KEY_SWATCHES = ['var(--seq-0)', ...RAMP]

const colorFor = (v) =>
  v === 0 ? 'var(--seq-0)' : RAMP[Math.min(RAMP.length - 1, Math.round((v / HEATMAP_MAX) * (RAMP.length - 1)))]

export function ActivityHeatmap({ tablesOpen }) {
  const bind = useTooltip()

  return (
    <>
      <div className="heat-grid">
        {HEATMAP.map((row, day) => (
          <Row key={DAYS[day]} day={day} row={row} bind={bind} />
        ))}
      </div>

      <div className="heat-x" aria-hidden="true">
        <span />
        {HOURS.map((h) => <span key={h}>{h}</span>)}
      </div>

      <div className="heat-key">
        <span>Fewer</span>
        {KEY_SWATCHES.map((c) => <i key={c} style={{ background: c }} />)}
        <span>More prompts</span>
        <span className="heat-peak">
          Peak: <b>{HEATMAP_PEAK}</b>
        </span>
      </div>

      <DataTable
        open={tablesOpen}
        caption="Prompts by day and hour"
        head={['Day', ...HOURS]}
        rows={HEATMAP.map((row, day) => [DAYS[day], ...row])}
      />
    </>
  )
}

function Row({ day, row, bind }) {
  return (
    <>
      <div className="heat-lab">{DAYS[day]}</div>
      {row.map((value, hour) => (
        <div
          key={hour}
          className="heat-cell"
          tabIndex={0}
          style={{ background: colorFor(value) }}
          {...bind(
            <>
              {DAYS[day]} {HOURS[hour]}–{HOURS[(hour + 1) % HOURS.length]}&nbsp;<b>{value}</b>{' '}
              <span>prompts</span>
            </>,
          )}
        />
      ))}
    </>
  )
}
