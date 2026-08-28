import { useState } from 'react'
import { ProfileHeader } from '../components/profile/ProfileHeader'
import { MetricGrid } from '../components/profile/MetricGrid'
import { BadgeGrid } from '../components/profile/BadgeGrid'
import { SettingsPanel } from '../components/profile/SettingsPanel'
import { LogoutDialog } from '../components/profile/LogoutDialog'
import { WrappedCallout } from '../components/profile/WrappedCallout'
import { BADGES } from '../profileData'

export default function Profile({ avatar, onAvatarChange, settings, onSettingsChange, onLogout }) {
  const [range, setRange] = useState('30d')
  const [showSettings, setShowSettings] = useState(false)
  const [confirmLogout, setConfirmLogout] = useState(false)
  const earned = BADGES.filter((b) => b.earned).length

  return (
    <>
      <div className="wrap">
        <ProfileHeader
          avatar={avatar}
          onAvatarChange={onAvatarChange}
          onOpenSettings={() => setShowSettings(true)}
          onLogout={() => setConfirmLogout(true)}
        />

        <section className="pblk">
          <div className="pblk-head">
            <h2>Running metrics</h2>
            <p>Live counters across your sessions.</p>
          </div>
          <MetricGrid range={range} onRangeChange={setRange} />
        </section>

        <section className="pblk">
          <div className="pblk-head">
            <h2>Badges</h2>
            <p>
              {earned} of {BADGES.length} earned.
            </p>
          </div>
          <BadgeGrid />
        </section>

        <section className="pblk">
          <WrappedCallout />
        </section>

        <footer className="foot">
          <div>arena.ai · Profile · Numbers are illustrative</div>
          <div>{settings.defaultMode === 'agent' ? 'Agent Mode' : settings.defaultMode} · {settings.defaultModel}</div>
        </footer>
      </div>

      {showSettings && (
        <SettingsPanel
          settings={settings}
          onChange={onSettingsChange}
          onClose={() => setShowSettings(false)}
        />
      )}
      {confirmLogout && (
        <LogoutDialog onCancel={() => setConfirmLogout(false)} onConfirm={onLogout} />
      )}
    </>
  )
}
