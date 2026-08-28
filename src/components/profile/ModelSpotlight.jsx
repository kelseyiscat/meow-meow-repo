import { MOST_USED_MODEL as M } from '../../profileData'

/** A hero figure, not a chart — one model is the whole point. */
export function ModelSpotlight({ active }) {
  return (
    <div className="panel spotlight">
      <div className="spot-k">Most used model</div>
      <div className="spot-name">{M.name}</div>
      <div className="spot-stats">
        <div><b>{M.share}%</b><span>of sessions</span></div>
        <div><b>{M.sessions.toLocaleString('en-US')}</b><span>sessions</span></div>
        <div><b>{M.hours}h</b><span>agent time</span></div>
      </div>
      <p className="spot-note">{M.note}</p>

      <div className="spot-rest">
        {M.runnersUp.map((r, i) => (
          <div className="spot-row" key={r.name}>
            <span className="spot-row-n">{r.name}</span>
            <span className="spot-row-track">
              <i style={{ width: active ? `${(r.share / M.share) * 100}%` : 0, transitionDelay: `${i * 70}ms` }} />
            </span>
            <span className="spot-row-v">{r.share}%</span>
          </div>
        ))}
      </div>
      <div className="spot-foot">{M.firstUsed}</div>
    </div>
  )
}
