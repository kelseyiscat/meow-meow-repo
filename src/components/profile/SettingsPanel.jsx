import { Modal } from './Modal'
import { DEFAULT_SETTINGS, SETTINGS_SCHEMA } from '../../profileData'

/** Settings sheet. Changes apply immediately and persist to localStorage. */
export function SettingsPanel({ settings, onChange, onClose }) {
  const set = (key, value) => onChange({ ...settings, [key]: value })

  return (
    <Modal
      title="Settings"
      subtitle="Applies to every new session on this account."
      onClose={onClose}
      wide
      footer={
        <>
          <button className="ghost" type="button" onClick={() => onChange({ ...DEFAULT_SETTINGS })}>
            Reset to defaults
          </button>
          <button className="solid" type="button" onClick={onClose}>
            Done
          </button>
        </>
      }
    >
      {SETTINGS_SCHEMA.map((group) => (
        <section className="set-group" key={group.group}>
          <h3>{group.group}</h3>
          {group.fields.map((field) => (
            <div className="set-row" key={field.key}>
              <div className="set-copy">
                <label htmlFor={`set-${field.key}`}>{field.label}</label>
                <p>{field.help}</p>
              </div>

              {field.type === 'toggle' ? (
                <button
                  id={`set-${field.key}`}
                  type="button"
                  role="switch"
                  aria-checked={!!settings[field.key]}
                  className={`switch${settings[field.key] ? ' on' : ''}`}
                  onClick={() => set(field.key, !settings[field.key])}
                >
                  <span className="knob" />
                </button>
              ) : (
                <select
                  id={`set-${field.key}`}
                  className="select"
                  value={settings[field.key]}
                  onChange={(e) => set(field.key, e.target.value)}
                >
                  {field.options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </section>
      ))}
    </Modal>
  )
}
