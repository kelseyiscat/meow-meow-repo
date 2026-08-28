import { PRIVATE_MODELS } from '../../profileData'

/**
 * Preview models you backed while they were still anonymous. Win rate gets a
 * meter; the reveal status is a label, never a colour on its own.
 */
export function PrivateModels({ active }) {
  return (
    <div className="panel">
      <div className="priv-head">
        <span>Codename</span>
        <span>Win rate when you voted</span>
        <span>Votes</span>
      </div>

      {PRIVATE_MODELS.map((m, i) => (
        <div className="priv-row" key={m.codename}>
          <div className="priv-name">
            <span className="priv-dot" aria-hidden="true" />
            <div>
              <div className="priv-code">{m.codename}</div>
              <div className={`priv-status${m.revealed ? ' out' : ''}`}>
                {m.revealed ? `Revealed as ${m.revealed}` : 'Still anonymous'}
              </div>
            </div>
          </div>

          <div className="priv-meter">
            <div className="priv-track">
              <i style={{ width: active ? `${m.winRate}%` : 0, transitionDelay: `${i * 70}ms` }} />
            </div>
            <span>{m.winRate}%</span>
          </div>

          <div className="priv-votes">{m.votes}</div>
        </div>
      ))}

      <p className="priv-foot">
        Blind votes only. Codenames are revealed when the model ships — three of yours
        are still in the pool.
      </p>
    </div>
  )
}
