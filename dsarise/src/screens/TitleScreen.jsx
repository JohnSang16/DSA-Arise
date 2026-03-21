import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './TitleScreen.module.css'
import upgradedKai from '../assets/sprites/UpgradedKai.png'

const PARTICLE_COLORS = ['#5533ff', '#1a3aff', '#00ccff']

function rand(min, max) {
  return min + Math.random() * (max - min)
}

export default function TitleScreen() {
  const navigate = useNavigate()

  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id:    i,
      left:  `${rand(0, 100)}%`,
      color: PARTICLE_COLORS[i % 3],
      size:  rand(2, 5),
      delay: `${rand(0, 6)}s`,
      dur:   `${rand(6, 14)}s`,
    })), [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Enter') navigate('/auth') }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  return (
    <div className={styles.root} onClick={() => navigate('/auth')} style={{ cursor: 'pointer' }}>

      <div className={styles.vignette} />

      {/* Mana particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className={styles.particle}
          style={{
            left:              p.left,
            width:             `${p.size}px`,
            height:            `${p.size}px`,
            background:        p.color,
            boxShadow:         `0 0 6px 2px ${p.color}`,
            animationDelay:    p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}

      {/* Main layout — Kai left, title right */}
      <div className={styles.layout}>

        {/* Kai silhouette */}
        <motion.div
          className={styles.kaiWrap}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className={styles.kaiAura} />
          <motion.div
            className={styles.kaiFloat}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
          >
            <img src={upgradedKai} alt="Kai" className={styles.kaiImg} />
          </motion.div>
        </motion.div>

        {/* Title block */}
        <div className={styles.titleBlock}>

          <motion.p
            className={styles.systemTag}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            [ SYSTEM INITIALIZED ]
          </motion.p>

          <motion.h1
            className={styles.titleDSA}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            DSA
          </motion.h1>

          <motion.h1
            className={styles.titleARISE}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.5 }}
          >
            ARISE
          </motion.h1>

          <motion.div
            className={styles.rankBadge}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            [ ENTER THE SYSTEM ]
          </motion.div>

        </div>
      </div>

      {/* Bottom prompt */}
      <motion.p
        className={styles.pressEnter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        — PRESS ENTER TO ARISE —
      </motion.p>

      {/* Bottom left tag */}
      <p className={styles.codexTag}>CODEX v1.0 | GSU-DSA</p>

    </div>
  )
}
