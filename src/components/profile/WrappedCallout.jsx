import { Link } from 'react-router-dom'

/** The hand-off at the bottom of the profile: your year, wrapped. */
export function WrappedCallout() {
  return (
    <Link className="wrapped-cta" to="/wrapped">
      <div className="wrapped-cta-body">
        <div className="wrapped-cta-k">New for 2026</div>
        <div className="wrapped-cta-t">Your Arena Wrapped is ready</div>
        <p>
          3,412 prompts, 1,204 agent-hours and one very specific archetype. See the whole year.
        </p>
      </div>
      <span className="wrapped-cta-go">
        Open Wrapped
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
      </span>
    </Link>
  )
}
