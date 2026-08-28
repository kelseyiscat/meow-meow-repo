import { PRESET_AVATARS, USER } from '../profileData'

/**
 * The user's picture in one place: an uploaded image, a chosen preset
 * gradient, or the initial. Every surface that shows a face uses this.
 */
export function Avatar({ avatar, size = 34, className = '', title }) {
  const style = { width: size, height: size, fontSize: Math.round(size * 0.38) }

  if (avatar?.type === 'image') {
    return (
      <img
        className={`avatar-img ${className}`.trim()}
        src={avatar.src}
        alt=""
        style={style}
        title={title}
      />
    )
  }

  const preset =
    PRESET_AVATARS.find((p) => p.id === avatar?.id) ?? PRESET_AVATARS[0]

  return (
    <div
      className={`avatar ${className}`.trim()}
      style={{ ...style, background: `linear-gradient(150deg, ${preset.from}, ${preset.to})` }}
      title={title}
      aria-hidden="true"
    >
      {USER.initials}
    </div>
  )
}
