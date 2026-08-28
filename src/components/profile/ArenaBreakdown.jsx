import { ARENAS } from '../../profileData'

const totalBattles = ARENAS.reduce((n, a) => n + a.battles, 0)

/**
 * Which arena you actually live in. The leader gets a layout treatment rather
 * than its own colour — the meters stay one hue so length carries the ranking.
 */
export function ArenaBreakdown({ active }) {
  const [top, ...rest] = ARENAS

  return (
    <div className="panel spotlight">
      <div className="spot-k">Your favourite Arena</div>
      <div className="arena-top">
        <span className="arena-glyph" aria-hidden="true">{top.icon}</span>
        <div>
          <div className="spot-name sm">{top.name}</div>
          <div className="arena-top-meta">
            {top.share}% of your votes · {top.battles.toLocaleString('en-US')} battles
          </div>
        </div>
      </div>
      <p className="spot-note">{top.note}</p>

      <div className="spot-rest">
        {rest.map((a, i) => (
          <div className="spot-row" key={a.name}>
            <span className="spot-row-n">
              <i className="arena-mini" aria-hidden="true">{a.icon}</i>
              {a.name}
            </span>
            <span className="spot-row-track">
              <i style={{ width: active ? `${(a.share / top.share) * 100}%` : 0, transitionDelay: `${i * 70}ms` }} />
            </span>
            <span className="spot-row-v">{a.share}%</span>
          </div>
        ))}
      </div>
      <div className="spot-foot">{totalBattles.toLocaleString('en-US')} votes cast across 5 arenas</div>
    </div>
  )
}
