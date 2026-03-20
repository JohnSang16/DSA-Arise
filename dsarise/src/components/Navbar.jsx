import { useNavigate } from 'react-router-dom'
import { signOut } from '../lib/auth'
import styles from './Navbar.module.css'

const RANK_COLORS = {
  E: '#8888cc',
  D: '#00ccff',
  C: '#aa44ff',
  B: '#00ff88',
  A: '#ffcc00',
  S: '#ffffff',
}

export default function Navbar({ username = '', hp = 50, maxHp = 100, rank = 'E' }) {
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    localStorage.removeItem('dsaq_userId')
    localStorage.removeItem('dsaq_progress')
    navigate('/')
  }

  const rankColor = RANK_COLORS[rank] ?? '#8888cc'
  const hpPct     = Math.max(0, Math.min(100, (hp / maxHp) * 100))

  return (
    <nav className={styles.navbar}>
      <span className={styles.logo}>DSA ARISE</span>

      <div />

      <div className={styles.right}>
        {username && (
          <span className={styles.username}>{username}</span>
        )}

        <span
          className={styles.rankBadge}
          style={{ color: rankColor, borderColor: rankColor, boxShadow: `0 0 10px ${rankColor}66` }}
        >
          {rank}-RANK
        </span>

        <div className={styles.hpGroup}>
          <span className={styles.hpLabel} style={{ color: rankColor }}>HP</span>
          <div
            className={styles.hpTrack}
            style={{ borderColor: `${rankColor}66` }}
          >
            <div
              className={styles.hpFill}
              style={{
                width: `${hpPct}%`,
                background: `linear-gradient(to right, ${rankColor}88, ${rankColor})`,
                boxShadow: `0 0 8px ${rankColor}88`,
              }}
            />
          </div>
          <span className={styles.hpText} style={{ color: rankColor }}>
            {hp}/{maxHp}
          </span>
        </div>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
    </nav>
  )
}
