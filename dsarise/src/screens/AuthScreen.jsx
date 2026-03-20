import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn, signUp, loadProgress } from '../lib/auth'
import styles from './AuthScreen.module.css'

export default function AuthScreen() {
  const navigate = useNavigate()
  const [mode, setMode]           = useState('login')   // 'login' | 'signup'
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)

  function switchMode(next) {
    setMode(next)
    setError('')
    setConfirm('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (mode === 'signup' && password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      if (mode === 'login') {
        const { data, error: err } = await signIn(email, password)
        if (err) { setError(err.message); return }
        const userId = data.user.id
        const { data: progress } = await loadProgress(userId)
        localStorage.setItem('dsaq_progress', JSON.stringify(progress ?? {}))
        localStorage.setItem('dsaq_userId', userId)
        navigate('/hub')
      } else {
        const { data, error: err } = await signUp(email, password)
        if (err) { setError(err.message); return }
        // Supabase auto-signs in after signup when email confirmation is off
        const userId = data.user?.id
        if (userId) {
          localStorage.setItem('dsaq_userId', userId)
          localStorage.setItem('dsaq_progress', JSON.stringify({}))
        }
        navigate('/hub')
      }
    } catch (ex) {
      setError(ex.message ?? 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.scanlines} />
      <div className={styles.vignette} />

      <div className={styles.card}>
        <p className={styles.logo}>DSA ARISE</p>

        {/* ── Tabs ── */}
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
            onClick={() => switchMode('login')}
          >
            LOGIN
          </button>
          <button
            type="button"
            className={`${styles.tab} ${mode === 'signup' ? styles.tabActive : ''}`}
            onClick={() => switchMode('signup')}
          >
            SIGNUP
          </button>
        </div>

        {/* ── Form ── */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {mode === 'signup' && (
            <div className={styles.field}>
              <label className={styles.label}>Confirm Password</label>
              <input
                className={styles.input}
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          )}

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={`${styles.btn} ${loading ? styles.btnLoading : ''}`}
            disabled={loading}
          >
            {loading ? (mode === 'login' ? 'LOGGING IN' : 'CREATING') : (mode === 'login' ? 'LOGIN' : 'CREATE ACCOUNT')}
          </button>
        </form>
      </div>
    </div>
  )
}
