import { useState } from 'react'
import { ProfileHeader } from '../components/profile/ProfileHeader'
import { MetricGrid } from '../components/profile/MetricGrid'
import { BadgeGrid } from '../components/profile/BadgeGrid'
import { SettingsPanel } from '../components/profile/SettingsPanel'
import { LogoutDialog } from '../components/profile/LogoutDialog'
import { WrappedCallout } from '../components/profile/WrappedCallout'
import { UsageChart } from '../components/profile/UsageChart'
import { ModelSpotlight } from '../components/profile/ModelSpotlight'
import { ArenaBreakdown } from '../components/profile/ArenaBreakdown'
import { PrivateModels } from '../components/profile/PrivateModels'
import { useReveal } from '../hooks/useReveal'
import { BADGES } from '../profileData'

/** Waits for the block to scroll into view, then lets its bars animate. */
function Reveal({ children }) {
  const [ref, shown] = useReveal({ threshold: 0.15 })
  return <div ref={ref}>{children(shown)}</div>
}

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

        <Reveal>
          {(shown) => (
            <section className="pblk">
              <div className="pblk-head">
                <h2>Usage over the last week</h2>
                <p>Prompts per day, Aug 22 – 28.</p>
              </div>
              <UsageChart active={shown} />
            </section>
          )}
        </Reveal>

        <Reveal>
          {(shown) => (
            <section className="pblk">
              <div className="pblk-head">
                <h2>Models &amp; arenas</h2>
                <p>All time.</p>
              </div>
              <div className="two-up">
                <ModelSpotlight active={shown} />
                <ArenaBreakdown active={shown} />
              </div>
            </section>
          )}
        </Reveal>

        <Reveal>
          {(shown) => (
            <section className="pblk">
              <div className="pblk-head">
                <h2>Favourite private models</h2>
                <p>Preview models you backed before the reveal.</p>
              </div>
              <PrivateModels active={shown} />
            </section>
          )}
        </Reveal>

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
