import { useRef, useState } from 'react'
import { Avatar } from '../Avatar'
import { PRESET_AVATARS, USER } from '../../profileData'

const MAX_BYTES = 2 * 1024 * 1024

/** Identity block: picture (editable), name, and the account actions. */
export function ProfileHeader({ avatar, onAvatarChange, onOpenSettings, onLogout }) {
  const [picking, setPicking] = useState(false)

  return (
    <header className="profile-head">
      <AvatarEditor
        avatar={avatar}
        onChange={onAvatarChange}
        open={picking}
        onOpenChange={setPicking}
      />

      <div className="profile-id">
        <h1>{USER.name}</h1>
        <div className="profile-sub">
          {USER.handle} · {USER.role}, {USER.team}
        </div>
        <div className="profile-meta">
          <span className="pill">{USER.plan} plan</span>
          <span>{USER.joined}</span>
        </div>
      </div>

      <div className="profile-actions">
        <button className="ghost" type="button" onClick={onOpenSettings}>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="btn-ico">
            <circle cx="12" cy="12" r="3.2" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.56V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 8.9 19.3a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.7 15a1.7 1.7 0 0 0-1.56-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.56-1.15 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.7a1.7 1.7 0 0 0 1-1.56V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.56 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
          </svg>
          Settings
        </button>
        <button className="ghost" type="button" onClick={onLogout}>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="btn-ico">
            <path d="M15 17l5-5-5-5M20 12H9M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5" />
          </svg>
          Log out
        </button>
      </div>
    </header>
  )
}

function AvatarEditor({ avatar, onChange, open, onOpenChange }) {
  const fileRef = useRef(null)
  const [error, setError] = useState('')

  const pickFile = (event) => {
    const file = event.target.files?.[0]
    event.target.value = '' // let the same file be re-picked
    if (!file) return
    if (!file.type.startsWith('image/')) return setError('That file isn’t an image.')
    if (file.size > MAX_BYTES) return setError('Images need to be under 2 MB.')

    const reader = new FileReader()
    reader.onload = () => {
      setError('')
      onChange({ type: 'image', src: reader.result })
      onOpenChange(false)
    }
    reader.onerror = () => setError('Couldn’t read that file.')
    reader.readAsDataURL(file)
  }

  return (
    <div className="avatar-edit">
      <button
        className="avatar-button"
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-label="Edit profile picture"
      >
        <Avatar avatar={avatar} size={104} className="avatar-lg" />
        <span className="avatar-overlay">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2L9 5h6l1.5 2h2A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5z" />
            <circle cx="12" cy="12.8" r="3.2" />
          </svg>
          Edit
        </span>
      </button>

      {open && (
        <div className="avatar-pop" role="dialog" aria-label="Profile picture">
          <div className="avatar-pop-k">Upload</div>
          <button className="ghost wide" type="button" onClick={() => fileRef.current?.click()}>
            Choose an image…
          </button>
          <input
            ref={fileRef}
            className="sr-only"
            type="file"
            accept="image/*"
            onChange={pickFile}
          />
          {error && <p className="avatar-err">{error}</p>}

          <div className="avatar-pop-k">Or pick a colour</div>
          <div className="avatar-presets">
            {PRESET_AVATARS.map((p) => {
              const active = avatar?.type !== 'image' && avatar?.id === p.id
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`preset${active ? ' on' : ''}`}
                  title={p.label}
                  aria-label={p.label}
                  aria-pressed={active}
                  style={{ background: `linear-gradient(150deg, ${p.from}, ${p.to})` }}
                  onClick={() => {
                    onChange({ type: 'preset', id: p.id })
                    onOpenChange(false)
                  }}
                />
              )
            })}
          </div>

          {avatar?.type === 'image' && (
            <button
              className="ghost wide danger"
              type="button"
              onClick={() => onChange({ type: 'preset', id: PRESET_AVATARS[0].id })}
            >
              Remove photo
            </button>
          )}
        </div>
      )}
    </div>
  )
}
