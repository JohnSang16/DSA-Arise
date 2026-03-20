import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { loadProgress } from '../lib/auth'
import Navbar from '../components/Navbar'
import styles from './HubScreen.module.css'

const STAGES = [
  { num: 1, name: 'Arrays',       color: '#8888cc', rank: 'E', enemy: 'DataSlime' },
  { num: 2, name: 'Stacks',       color: '#00ccff', rank: 'D', enemy: 'NullSentinel' },
  { num: 3, name: 'Linked Lists', color: '#aa44ff', rank: 'C', enemy: 'HydraNode' },
  { num: 4, name: 'Trees',        color: '#00ff88', rank: 'B', enemy: 'CorruptTree' },
  { num: 5, name: 'Graphs',       color: '#ffcc00', rank: 'A', enemy: 'DarkLord' },
]

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}

export default function HubScreen() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(null)
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate('/auth')
        return
      }

      const email = session.user.email ?? ''
      setUsername(email.split('@')[0])

      const { data } = await loadProgress(session.user.id)
      setProgress(
        data ?? { current_stage: 1, current_level: 1, hp: 50, current_rank: 'E', unlocked_stages: [1] }
      )
      setLoading(false)
    }

    init()
  }, [])

  function isUnlocked(num) {
    if (!progress) return false
    return (progress.unlocked_stages ?? [1]).includes(num)
  }

  function isCompleted(num) {
    return progress ? (progress.current_stage ?? 1) > num : false
  }

  function isCurrent(num) {
    return progress ? (progress.current_stage ?? 1) === num : false
  }

  if (loading) {
    return (
      <div className={styles.root}>
        <div className={styles.scanlines} />
        <p className={styles.loadingText}>LOADING...</p>
      </div>
    )
  }

  const hp   = progress?.hp ?? 50
  const rank = progress?.current_rank ?? 'E'

  return (
    <div className={styles.root}>
      <div className={styles.scanlines} />
      <div className={styles.vignette} />

      <Navbar username={username} hp={hp} rank={rank} />

      <main className={styles.main}>
        <motion.h2
          className={styles.mapTitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          WORLD MAP
        </motion.h2>
        <motion.p
          className={styles.mapSub}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Choose your dungeon, hunter
        </motion.p>

        <motion.div
          className={styles.mapPath}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {STAGES.map((stage, i) => {
            const unlocked = isUnlocked(stage.num)
            const completed = isCompleted(stage.num)
            const current = isCurrent(stage.num)
            const rgb = hexToRgb(stage.color)

            return (
              <div key={stage.num} className={styles.nodeRow}>
                {i > 0 && (
                  <div
                    className={styles.connector}
                    style={{
                      borderTopColor: unlocked
                        ? `rgba(${hexToRgb(stage.color)}, 0.45)`
                        : 'rgba(136,136,204,0.12)',
                    }}
                  />
                )}

                <div className={styles.nodeCol}>
                  {current && (
                    <motion.span
                      className={styles.hereLabel}
                      style={{ color: stage.color }}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ▼ HERE
                    </motion.span>
                  )}

                  <motion.button
                    className={`${styles.node} ${!unlocked ? styles.nodeLocked : ''}`}
                    style={{
                      borderColor: unlocked ? stage.color : 'rgba(26,58,255,0.2)',
                      background: unlocked
                        ? `radial-gradient(circle at center, rgba(${rgb},0.14) 0%, rgba(2,2,15,0.92) 70%)`
                        : 'rgba(2,2,15,0.85)',
                      boxShadow: current
                        ? `0 0 28px rgba(${rgb},0.6), 0 0 60px rgba(${rgb},0.25), inset 0 0 18px rgba(${rgb},0.08)`
                        : unlocked
                          ? `0 0 14px rgba(${rgb},0.35)`
                          : 'none',
                      cursor: unlocked ? 'pointer' : 'not-allowed',
                    }}
                    onClick={() => unlocked && navigate(`/game?stage=${stage.num}`)}
                    animate={current ? {
                      scale: [1, 1.06, 1],
                    } : {}}
                    transition={current ? {
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    } : {}}
                    whileHover={unlocked ? { scale: 1.1, y: -4 } : {}}
                    whileTap={unlocked ? { scale: 0.94 } : {}}
                  >
                    <span
                      className={styles.nodeIcon}
                      style={{ color: unlocked ? stage.color : 'rgba(10,10,46,0.8)' }}
                    >
                      {completed ? '✓' : !unlocked ? '■' : stage.num}
                    </span>

                    {completed && (
                      <span className={styles.doneTag} style={{ color: stage.color }}>
                        DONE
                      </span>
                    )}
                  </motion.button>

                  <span
                    className={styles.nodeName}
                    style={{ color: unlocked ? '#ccddff' : 'rgba(136,136,204,0.3)' }}
                  >
                    {stage.name}
                  </span>
                  <span
                    className={styles.stageNum}
                    style={{ color: unlocked ? `rgba(${rgb},0.7)` : 'rgba(26,58,255,0.25)' }}
                  >
                    STAGE {stage.num}
                  </span>
                </div>
              </div>
            )
          })}
        </motion.div>

        <motion.p
          className={styles.hint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Click an unlocked stage to begin
        </motion.p>
      </main>
    </div>
  )
}
