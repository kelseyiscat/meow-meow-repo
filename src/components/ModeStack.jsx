import { useTooltip } from './Tooltip'
import { DataTable } from './DataTable'
import { MODES } from '../data'

const fmt = (n) => n.toLocaleString('en-US')

/**
 * Part-to-whole across three modes. Three categorical slots, 2px surface gaps
 * between segments, and every segment direct-labelled — colour is never the
 * only thing carrying identity.
 */
export function ModeStack({ tablesOpen }) {
  const bind = useTooltip()
  const label = MODES.map((m) => `${m.name} ${m.pct}%`).join(', ')

  return (
    <>
      <div className="stack" role="img" aria-label={`Prompt share by mode: ${label}`}>
        {MODES.map((m) => (
          <div
            key={m.name}
            className="stack-seg"
            tabIndex={0}
            style={{ flex: `0 0 ${m.pct}%`, background: m.color }}
            {...bind(
              <>
                {m.name}&nbsp;<b>{m.pct}%</b> <span>· {fmt(m.prompts)} prompts</span>
              </>,
            )}
          />
        ))}
      </div>

      <div className="stack-labels" aria-hidden="true">
        {MODES.map((m) => (
          <div key={m.name} style={{ flex: `0 0 ${m.pct}%` }}>
            <b>{m.pct}%</b>
            {m.name}
          </div>
        ))}
      </div>

      <div className="legend">
        {MODES.map((m) => (
          <div className="legend-item" key={m.name}>
            <i className="swatch" style={{ background: m.color }} />
            {m.name}
          </div>
        ))}
      </div>

      <DataTable
        open={tablesOpen}
        caption="Prompts by mode"
        head={['Mode', 'Share', 'Prompts']}
        rows={MODES.map((m) => [m.name, `${m.pct}%`, fmt(m.prompts)])}
      />
    </>
  )
}
