import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Rail, TopBar } from './components/Chrome'
import { TooltipProvider } from './components/Tooltip'
import { SignedOut } from './components/profile/LogoutDialog'
import { useLocalState } from './hooks/useLocalState'
import { DEFAULT_SETTINGS, PRESET_AVATARS } from './profileData'
import Profile from './pages/Profile'
import Wrapped from './pages/Wrapped'

const DEFAULT_AVATAR = { type: 'preset', id: PRESET_AVATARS[0].id }

export default function App() {
  const { pathname } = useLocation()
  const [avatar, setAvatar] = useLocalState('arena.avatar', DEFAULT_AVATAR)
  const [settings, setSettings] = useLocalState('arena.settings', DEFAULT_SETTINGS)
  const [signedIn, setSignedIn] = useState(true)
  const [tablesOpen, setTablesOpen] = useState(false)

  // Route changes should land at the top of the new page, not mid-scroll.
  // Block body on purpose: a concise arrow would return scrollTo's value and
  // React would try to call it as the effect cleanup.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // The reduced-motion setting is a preference, so it beats the OS hint.
  useEffect(() => {
    document.documentElement.dataset.reducedMotion = settings.reducedMotion ? 'on' : 'off'
  }, [settings.reducedMotion])

  if (!signedIn) return <SignedOut onSignIn={() => setSignedIn(true)} />

  const onWrapped = pathname.startsWith('/wrapped')

  return (
    <TooltipProvider>
      <Rail avatar={avatar} />
      <TopBar
        title={onWrapped ? 'Wrapped 2026' : 'Your profile'}
        backTo={onWrapped ? '/' : undefined}
        actions={
          onWrapped && (
            <button
              className="ghost"
              type="button"
              aria-pressed={tablesOpen}
              onClick={() => setTablesOpen((v) => !v)}
            >
              {tablesOpen ? 'Hide data tables' : 'Show data tables'}
            </button>
          )
        }
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Profile
                avatar={avatar}
                onAvatarChange={setAvatar}
                settings={settings}
                onSettingsChange={setSettings}
                onLogout={() => setSignedIn(false)}
              />
            }
          />
          <Route path="/wrapped" element={<Wrapped tablesOpen={tablesOpen} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </TooltipProvider>
  )
}
