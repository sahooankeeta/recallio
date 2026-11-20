import { useRef, useState, type FormEvent } from 'react'
import {
  MIN_PASSWORD_LENGTH,
  isValidEmail,
  login,
  register,
  type User,
} from '../auth'
import { OwlMascot } from './Illustrations'
import './AuthPage.css'

type Mode = 'login' | 'register'

type Errors = Partial<Record<'email' | 'password' | 'confirm' | 'form', string>>

export default function AuthPage({ onAuth }: { onAuth: (user: User) => void }) {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [notice, setNotice] = useState('')
  // The owl keeps its eyes shut while a password field (or its Show/Hide
  // toggle) has focus — whether or not the password is visible.
  const [typingPassword, setTypingPassword] = useState(false)
  const eyesClosed = typingPassword
  const passwordRef = useRef<HTMLInputElement>(null)

  const isRegister = mode === 'register'

  function switchMode(next: Mode) {
    setMode(next)
    setErrors({})
    setPassword('')
    setConfirm('')
  }

  function validate(): Errors {
    const e: Errors = {}
    if (!email.trim()) e.email = 'Enter your email.'
    else if (!isValidEmail(email.trim())) e.email = 'Enter a valid email address.'

    if (!password) e.password = 'Enter your password.'
    else if (isRegister && password.length < MIN_PASSWORD_LENGTH)
      e.password = `Use at least ${MIN_PASSWORD_LENGTH} characters.`

    if (isRegister && confirm !== password) e.confirm = "Passwords don't match."
    return e
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length) return

    setSubmitting(true)
    setNotice('')
    try {
      const user = isRegister
        ? await register(email, password)
        : await login(email, password)
      if (user) {
        onAuth(user)
      } else {
        // Email confirmation is required before the first login.
        setNotice(`We sent a confirmation link to ${email.trim()}. Open it, then log in.`)
        switchMode('login')
        setSubmitting(false)
      }
    } catch (err) {
      setErrors({
        form: err instanceof Error ? err.message : 'Something went wrong.',
      })
      setSubmitting(false)
    }
  }

  return (
    <div className="auth">
      <section className="auth__art" aria-hidden="true">
        <div className="brand">
          <span className="brand__mark">R</span>
          <span className="brand__name">Recallio</span>
        </div>
        <OwlMascot eyesClosed={eyesClosed} />
        <h2>Turn your PDFs into quizzes</h2>
        <p>Upload notes, test yourself, and remember more.</p>
      </section>

      <section className="auth__panel">
        <form className="auth__card" onSubmit={handleSubmit} noValidate>
          <h1>{isRegister ? 'Create your account' : 'Welcome back'}</h1>
          <p className="auth__sub">
            {isRegister
              ? 'Start turning your notes into quizzes.'
              : 'Log in to keep studying.'}
          </p>

          {notice && !errors.form && (
            <p className="auth__alert auth__alert--info" role="status">
              {notice}
            </p>
          )}

          {errors.form && (
            <p className="auth__alert" role="alert">
              {errors.form}
            </p>
          )}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              placeholder="you@example.com"
              autoFocus
            />
            {errors.email && (
              <span id="email-error" className="field__error">
                {errors.email}
              </span>
            )}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="field__password">
              <input
                id="password"
                ref={passwordRef}
                type={showPassword ? 'text' : 'password'}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setTypingPassword(true)}
                onBlur={() => setTypingPassword(false)}
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? 'password-error' : isRegister ? 'password-hint' : undefined
                }
              />
              <button
                type="button"
                className="field__toggle"
                onClick={() => {
                  setShowPassword((s) => !s)
                  passwordRef.current?.focus()
                }}
                // Keep focus in the input on mouse click so typing continues.
                onMouseDown={(e) => e.preventDefault()}
                onFocus={() => setTypingPassword(true)}
                onBlur={() => setTypingPassword(false)}
                aria-pressed={showPassword}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password ? (
              <span id="password-error" className="field__error">
                {errors.password}
              </span>
            ) : (
              isRegister && (
                <span id="password-hint" className="field__hint">
                  At least {MIN_PASSWORD_LENGTH} characters.
                </span>
              )
            )}
          </div>

          {isRegister && (
            <div className="field">
              <label htmlFor="confirm">Confirm password</label>
              <input
                id="confirm"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onFocus={() => setTypingPassword(true)}
                onBlur={() => setTypingPassword(false)}
                aria-invalid={!!errors.confirm}
                aria-describedby={errors.confirm ? 'confirm-error' : undefined}
              />
              {errors.confirm && (
                <span id="confirm-error" className="field__error">
                  {errors.confirm}
                </span>
              )}
            </div>
          )}

          <button type="submit" className="submit auth__submit" disabled={submitting}>
            {submitting
              ? 'Please wait…'
              : isRegister
                ? 'Create account'
                : 'Log in'}
          </button>

          <p className="auth__switch">
            {isRegister ? 'Already have an account?' : 'New to Recallio?'}{' '}
            <button
              type="button"
              className="link-btn"
              onClick={() => switchMode(isRegister ? 'login' : 'register')}
            >
              {isRegister ? 'Log in' : 'Create an account'}
            </button>
          </p>
        </form>
      </section>
    </div>
  )
}
