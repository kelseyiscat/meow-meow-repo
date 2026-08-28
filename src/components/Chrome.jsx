import { NavLink, useNavigate } from 'react-router-dom'
import { Avatar } from './Avatar'

/** The Arena app shell: icon rail down the left, top bar across. */
export function Rail({ avatar }) {
  const navigate = useNavigate()

  return (
    <nav className="rail" aria-label="Arena">
      <RailButton label="Toggle sidebar">
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <path d="M9 4v16" />
      </RailButton>
      <RailButton label="New session">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 8.5v7M8.5 12h7" />
      </RailButton>
      <RailButton label="Sessions">
        <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
      </RailButton>
      <RailButton label="Search">
        <circle cx="11" cy="11" r="6.5" />
        <path d="M16 16l4 4" />
      </RailButton>

      <div className="rail-spacer" />

      <button
        className="rail-avatar"
        type="button"
        onClick={() => navigate('/')}
        title="Your profile"
        aria-label="Your profile"
      >
        <Avatar avatar={avatar} size={34} />
      </button>
      <RailButton label="Docs">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </RailButton>
    </nav>
  )
}

function RailButton({ label, children }) {
  return (
    <button className="rail-btn" type="button" title={label} aria-label={label}>
      <svg viewBox="0 0 24 24" aria-hidden="true">{children}</svg>
    </button>
  )
}

/** Top bar. `title` names the view; `actions` is whatever that view needs. */
export function TopBar({ title, backTo, actions }) {
  return (
    <header className="topbar">
      <div className="brand">
        {backTo ? (
          <NavLink className="back-btn" to={backTo} aria-label="Back">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
          </NavLink>
        ) : (
          <svg className="brand-mark" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3v3.2M12 17.8V21M3 12h3.2M17.8 12H21M5.6 5.6l2.3 2.3M16.1 16.1l2.3 2.3M18.4 5.6l-2.3 2.3M7.9 16.1l-2.3 2.3" />
          </svg>
        )}
        {title}
        <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="topbar-actions">{actions}</div>
    </header>
  )
}
