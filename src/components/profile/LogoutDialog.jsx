import { Modal } from './Modal'
import { USER } from '../../profileData'

export function LogoutDialog({ onCancel, onConfirm }) {
  return (
    <Modal
      title="Log out?"
      onClose={onCancel}
      footer={
        <>
          <button className="ghost" type="button" onClick={onCancel}>Stay signed in</button>
          <button className="solid danger" type="button" onClick={onConfirm}>Log out</button>
        </>
      }
    >
      <p className="modal-copy">
        You'll be signed out of <b>{USER.email}</b> on this device. Running agent sessions keep
        going and will be waiting when you're back.
      </p>
    </Modal>
  )
}

/** What the app shows once you've logged out. */
export function SignedOut({ onSignIn }) {
  return (
    <div className="signed-out">
      <div className="signed-out-card">
        <div className="arche-k">Arena</div>
        <h1>You're signed out.</h1>
        <p>Your sessions are safe. Pick up where you left off whenever you like.</p>
        <button className="solid" type="button" onClick={onSignIn}>Sign back in</button>
      </div>
    </div>
  )
}
