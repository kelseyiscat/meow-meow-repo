import { useTooltip } from './Tooltip'

/**
 * Magnitude comparison. One hue for every bar — length is the encoding, so
 * colour never implies a ranking that the bars already show. Data-ends are
 * 4px-rounded and anchored to the baseline; values are direct-labelled.
 */
export function BarList({ items, active, valueKey = 'pct', suffix = '%', tooltip }) {
  const bind = useTooltip()
  const max = Math.max(...items.map((i) => i[valueKey]))

  return (
    <div className="bars">
      {items.map((item, i) => (
        <div className="bar-row" key={item.name} {...(tooltip ? bind(tooltip(item)) : {})} tabIndex={tooltip ? 0 : -1}>
          <div className="bar-name">{item.name}</div>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{
                width: active ? `${(item[valueKey] / max) * 100}%` : 0,
                transitionDelay: `${i * 80}ms`,
              }}
            />
          </div>
          <div className="bar-val">
            {item[valueKey]}
            {suffix}
          </div>
        </div>
      ))}
    </div>
  )
}
