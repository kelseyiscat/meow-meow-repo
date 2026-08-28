import { DataTable } from './DataTable'
import { useTooltip } from './Tooltip'
import { BarList } from './BarList'
import { FIELD, QUESTION_CLOUD } from '../data'

const fmt = (n) => n.toLocaleString('en-US')

/**
 * Frequency cloud. Type size is the only encoding (5 discrete steps), so a
 * word never looks more important than it is; every term keeps the same ink
 * colour and carries its exact count in the tooltip and the table fallback.
 */
export function QuestionCloud({ active, tablesOpen }) {
  const bind = useTooltip()
  const ranked = [...QUESTION_CLOUD].sort((a, b) => b.count - a.count)

  return (
    <>
      <div className="field-head">
        <div>
          <div className="field-k">Your field</div>
          <div className="field-name">{FIELD.name}</div>
        </div>
        <div className="field-val">
          {FIELD.pct}%<small>{fmt(FIELD.sessions)} sessions</small>
        </div>
      </div>

      <BarList
        items={FIELD.runnersUp}
        active={active}
        tooltip={(f) => (
          <>
            {f.name}&nbsp;<b>{f.pct}%</b> <span>· of your sessions</span>
          </>
        )}
      />

      <div className="cloud">
        {QUESTION_CLOUD.map((item, i) => (
          <span
            key={item.q}
            className={`cloud-w w${item.w}${active ? ' in' : ''}`}
            style={{ transitionDelay: `${(i % 8) * 55}ms` }}
            tabIndex={0}
            {...bind(
              <>
                “{item.q}”&nbsp;<b>{fmt(item.count)}</b> <span>· prompts</span>
              </>,
            )}
          >
            {item.q}
          </span>
        ))}
      </div>

      <DataTable
        open={tablesOpen}
        caption="Most-asked prompts in Software & IT Services"
        head={['#', 'Prompt', 'Prompts']}
        rows={ranked.map((r, i) => [i + 1, r.q, fmt(r.count)])}
      />
    </>
  )
}
