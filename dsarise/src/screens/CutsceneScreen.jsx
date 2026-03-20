import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './CutsceneScreen.module.css'
import kaiKneeling from '../assets/sprites/CutsceneKneelingKai.png'
import statue1Img from '../assets/sprites/SoloLevelingStatueIntro1.png'
import statue2Img from '../assets/sprites/SoloLevelingStatueIntro2.png'
import statue3Img from '../assets/sprites/SoloLevelingStatueIntro3.jpeg'

// ── Pre-generated stable data ─────────────────────────────────────────────


const MANA_PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: 2  + (i * 4.1) % 96,
  size: 1  + (i % 3),
  dur:  4  + (i * 0.4) % 5,
  delay: (i * 0.31) % 4.5,
}))


// ── Scene 1 — "The Weak One" ──────────────────────────────────────────────

const S1_INFO = [
  { label: 'NAME',    value: 'KAI',         side: 'left'  },
  { label: 'RANK',    value: 'E',           side: 'right' },
  { label: 'CLASS',   value: 'UNAWAKENED',  side: 'left'  },
  { label: 'LEVEL',   value: '1',           side: 'right' },
  { label: 'TITLE',   value: 'NONE',        side: 'left'  },
  { label: 'FATIGUE', value: '0',           side: 'right' },
]

const S1_ATTRS = [
  { abbr: 'STR', value: '3',  side: 'left'  },
  { abbr: 'VIT', value: '4',  side: 'right' },
  { abbr: 'AGI', value: '5',  side: 'left'  },
  { abbr: 'INT', value: '6',  side: 'right' },
  { abbr: 'SNS', value: '2',  side: 'left'  },
]

const S1_TOTAL = S1_INFO.length + 1 + S1_ATTRS.length + 1 // info + bars + attrs + flagged

function Scene1() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = Array.from({ length: S1_TOTAL }, (_, i) =>
      setTimeout(() => setStep(s => Math.max(s, i + 1)), 300 + i * 300)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  const barsVisible  = step > S1_INFO.length
  const attrStart    = S1_INFO.length + 1
  const flagVisible  = step >= S1_TOTAL

  return (
    <div className={styles.scene1}>
      <motion.div
        className={styles.statusCard}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.2, 0, 0.2, 1] }}
      >
        {/* Title bar */}
        <div className={styles.statusBar}>
          <span className={styles.statusTitle}>STATUS</span>
        </div>

        {/* Info grid — 2 columns */}
        <div className={styles.infoGrid}>
          {S1_INFO.map((r, i) => (
            <motion.div
              key={i}
              className={`${styles.infoCell} ${r.side === 'right' ? styles.infoCellRight : ''}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: i < step ? 1 : 0, y: i < step ? 0 : 6 }}
              transition={{ duration: 0.22 }}
            >
              <span className={styles.infoLabel}>{r.label}:</span>
              <span className={styles.infoValue}>{r.value}</span>
            </motion.div>
          ))}
        </div>

        {/* HP / MP bars */}
        <motion.div
          className={styles.barsSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: barsVisible ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className={styles.s1BarRow}>
            <span className={styles.s1BarIcon}>✚</span>
            <span className={styles.s1BarLbl}>HP</span>
            <div className={styles.s1BarTrack}>
              <div className={styles.s1BarFillHp} style={{ width: '3%' }} />
            </div>
            <span className={styles.s1BarNum}>3 / 100</span>
          </div>
          <div className={styles.s1BarRow}>
            <span className={styles.s1BarIcon}>◈</span>
            <span className={styles.s1BarLbl}>MP</span>
            <div className={styles.s1BarTrack}>
              <div className={styles.s1BarFillMp} style={{ width: '1%' }} />
            </div>
            <span className={styles.s1BarNum}>1 / 100</span>
          </div>
        </motion.div>

        <div className={styles.diamondDivider}><span className={styles.diamond}>◆</span></div>

        {/* Attribute grid — 2 columns */}
        <div className={styles.attrsGrid}>
          {S1_ATTRS.map((a, i) => (
            <motion.div
              key={i}
              className={`${styles.attrCell} ${a.side === 'right' ? styles.attrCellRight : ''}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: (attrStart + i) < step ? 1 : 0, x: (attrStart + i) < step ? 0 : -8 }}
              transition={{ duration: 0.22 }}
            >
              <span className={styles.attrAbbr}>{a.abbr}</span>
              <span className={styles.attrColon}>:</span>
              <span className={styles.attrValue}>{a.value}</span>
            </motion.div>
          ))}
        </div>

        <div className={styles.diamondDivider}><span className={styles.diamond}>◆</span></div>

        <motion.div
          className={styles.flaggedText}
          initial={{ opacity: 0 }}
          animate={{ opacity: flagVisible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▸ CANDIDATE FLAGGED FOR ELIMINATION
        </motion.div>

        <div className={styles.panelScanlines} />
      </motion.div>
    </div>
  )
}

// ── Scene 2 — "The Double Dungeon" ────────────────────────────────────────

function Scene2() {
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowText(true), 1600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={styles.scene2}>
      <div className={styles.gateVoid}>
        <div className={styles.voidCore} />
        <div className={`${styles.voidRing} ${styles.ring1}`} />
        <div className={`${styles.voidRing} ${styles.ring2}`} />
        <div className={`${styles.voidRing} ${styles.ring3}`} />
        <div className={styles.voidGlow} />
      </div>

      <motion.div
        className={styles.doorLeft}
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
      >
        <div className={styles.doorEdge} />
      </motion.div>
      <motion.div
        className={styles.doorRight}
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
      >
        <div className={styles.doorEdgeRight} />
      </motion.div>


      <motion.p
        className={styles.scene2Text}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 8 }}
        transition={{ duration: 0.7 }}
      >
        "A gate no one returned from."
      </motion.p>
    </div>
  )
}

// ── Scene 3 — "Collapse" ──────────────────────────────────────────────────

function Scene3() {
  const [glitching, setGlitching] = useState(true)
  const [stage, setStage]         = useState(0) // 0=hidden 1=initial 2=bigger+flicker 3=biggest+stays
  const [fadeOut, setFadeOut]     = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setGlitching(false), 1000)
    const t2 = setTimeout(() => setStage(1),         1400)  // stage 1 — appears normal
    const t3 = setTimeout(() => setStage(2),         2600)  // stage 2 — bigger + flicker
    const t4 = setTimeout(() => setStage(3),         3900)  // stage 3 — biggest, stays
    const t5 = setTimeout(() => setFadeOut(true),    4800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5) }
  }, [])

  const textAnimate =
    stage === 0 ? { opacity: 0, scale: 1 } :
    stage === 1 ? { opacity: 1, scale: 1 } :
    stage === 2 ? { opacity: [1, 0, 1, 0, 1, 0, 1], scale: 1.7 } :
                  { opacity: 1, scale: 2.5 }

  const textTransition =
    stage === 2 ? {
      scale:   { duration: 0 },
      opacity: { duration: 1.1, times: [0, 0.14, 0.28, 0.46, 0.62, 0.78, 1], ease: 'linear' },
    } :
    stage === 3 ? {
      scale:   { duration: 0 },
      opacity: { duration: 0.05 },
    } :
                  { duration: 0.3 }

  return (
    <div className={styles.scene3}>
      {glitching && (
        <>
          <div className={styles.glitchRed} />
          <div className={styles.glitchCyan} />
          <div className={styles.glitchLine} />
        </>
      )}

      <div className={styles.kaiWrapper}>
        <div className={styles.kaiAura} />
        <img
          src={kaiKneeling}
          className={styles.kaiSvg}
          alt="Kai kneeling"
        />
        <div className={styles.kaiGroundReflect} />
      </div>

      <motion.p
        className={styles.glitchText}
        animate={textAnimate}
        transition={textTransition}
      >
        CONNECTION LOST — ENTITY DETECTED
      </motion.p>

      <motion.div
        className={styles.sceneFadeOut}
        initial={{ opacity: 0 }}
        animate={{ opacity: fadeOut ? 1 : 0 }}
        transition={{ duration: 1.4, ease: 'easeIn' }}
      />
    </div>
  )
}

// ── Scene 4 — "System Initializes" ───────────────────────────────────────

const S4_LINES = [
  { text: 'A player who can grow...',  big: false, pauseAfter: 520 },
  { text: 'has been found.',           big: false, pauseAfter: 860 },
  { text: 'YOU HAVE BEEN SELECTED',   big: true,  pauseAfter: 140 },
  { text: 'AS THE SOLE PLAYER.',      big: true,  pauseAfter: 0   },
]

function Scene4() {
  const [showWindow, setShowWindow] = useState(false)
  const [lineIdx, setLineIdx]       = useState(0)
  const [charIdx, setCharIdx]       = useState(0)
  const [typed, setTyped]           = useState(['', '', '', ''])
  const [showBar, setShowBar]       = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowWindow(true), 280)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!showWindow) return
    if (lineIdx >= S4_LINES.length) {
      setShowBar(true)
      return
    }
    const line = S4_LINES[lineIdx]
    if (charIdx <= line.text.length) {
      const t = setTimeout(() => {
        setTyped(prev => {
          const next = [...prev]
          next[lineIdx] = line.text.slice(0, charIdx)
          return next
        })
        setCharIdx(c => c + 1)
      }, 36)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setLineIdx(l => l + 1)
        setCharIdx(0)
      }, line.pauseAfter || 80)
      return () => clearTimeout(t)
    }
  }, [showWindow, lineIdx, charIdx])

  return (
    <div className={styles.scene4}>
      <motion.div
        className={styles.flashOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.38, times: [0, 0.42, 1] }}
      />

      {showWindow && (
        <motion.div
          className={styles.systemWindow}
          initial={{ y: -60, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28, mass: 0.8 }}
        >
          <span className={`${styles.winCorner} ${styles.winTL}`} />
          <span className={`${styles.winCorner} ${styles.winTR}`} />
          <span className={`${styles.winCorner} ${styles.winBL}`} />
          <span className={`${styles.winCorner} ${styles.winBR}`} />

          {/* Notification-style header */}
          <div className={styles.sysNotifHeader}>
            <div className={styles.sysAlertBox}>!</div>
            <span className={styles.sysNotifTitle}>SYSTEM</span>
          </div>

          <div className={styles.sysHRule} />

          <div className={styles.systemBody}>
            <div className={styles.bodyGlow} />
            <p className={styles.sysSubHeader}>— INCOMING MESSAGE —</p>
            {S4_LINES.map((line, i) => (
              <div key={i} className={line.big ? styles.systemTextBig : styles.systemText}>
                {typed[i]}
                {i === lineIdx && charIdx <= line.text.length && (
                  <span className={styles.cursor}>█</span>
                )}
              </div>
            ))}
          </div>

          <div className={styles.sysHRule} />

          {showBar && (
            <motion.div
              className={styles.systemFooter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.progressTrack}>
                <motion.div
                  className={styles.progressFill}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
                />
                <div className={styles.progressShimmer} />
              </div>
              <p className={styles.initText}>INITIALIZING PLAYER DATA...</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  )
}

// ── Scene 6 — "Title Card" ────────────────────────────────────────────────

const TITLE_LETTERS = 'DSA ARISE'.split('')

const letterContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}
const letterVariants = {
  hidden:   { opacity: 0, y: 60, filter: 'blur(8px)' },
  visible:  { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45, ease: [0.2, 0, 0.2, 1] } },
}

function Scene6() {
  const [showArise, setShowArise] = useState(false)
  const [showRing, setShowRing]   = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowArise(true), 1100)
    const t2 = setTimeout(() => setShowRing(true),  200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className={styles.scene6}>
      {showRing && (
        <>
          <div className={`${styles.titleRing} ${styles.titleRing1}`} />
          <div className={`${styles.titleRing} ${styles.titleRing2}`} />
        </>
      )}

      <motion.div
        className={styles.letterRow}
        variants={letterContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {TITLE_LETTERS.map((ch, i) => (
          <motion.span key={i} className={styles.titleLetter} variants={letterVariants}>
            {ch}
          </motion.span>
        ))}
      </motion.div>

      <motion.p
        className={styles.ariseText}
        initial={{ opacity: 0, letterSpacing: '4px' }}
        animate={{ opacity: showArise ? 1 : 0, letterSpacing: showArise ? '16px' : '4px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        ARISE.
      </motion.p>
    </div>
  )
}

// ── Scene 7 — Statue 1 (slow, clean) ─────────────────────────────────────

function Scene7() {
  const [showCaption, setShowCaption] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowCaption(true), 2400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={styles.statueScene}>
      <motion.img
        src={statue1Img}
        className={styles.statueImg}
        alt=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, ease: 'easeIn' }}
      />
      <motion.p
        className={styles.statueCaption}
        initial={{ opacity: 0 }}
        animate={{ opacity: showCaption ? 1 : 0 }}
        transition={{ duration: 1.5, ease: 'easeIn' }}
      >
        W..what is that
      </motion.p>
    </div>
  )
}

// ── Scene 8 — Statue 2 (dramatic) ─────────────────────────────────────────

function Scene8() {
  return (
    <div className={styles.statueScene}>
      <motion.div
        className={styles.flashOverlay}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />
      <motion.img
        src={statue2Img}
        className={styles.statueImg}
        alt=""
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <p className={styles.statueCaptionShake}>U-rgh!?!</p>
    </div>
  )
}

// ── Scene 9 — Statue 3 (most dramatic) ────────────────────────────────────

function Scene9() {
  const [showCaption, setShowCaption] = useState(false)

  useEffect(() => {
    setShowCaption(true)
    return () => {}
  }, [])

  return (
    <div className={styles.statueSceneShake}>
      <motion.div
        className={styles.flashOverlay}
        initial={{ opacity: 0.35 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
      <motion.img
        src={statue3Img}
        className={styles.statueImg}
        alt=""
        initial={{ opacity: 0, scale: 1.25 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 20, mass: 0.7 }}
      />
      {showCaption && (
        <motion.p
          className={styles.statueSpeech}
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 4.5, ease: 'linear' }}
        >
          Subarashi
        </motion.p>
      )}
    </div>
  )
}

// ── Scene 5 — "First Quest" ───────────────────────────────────────────────

const S5_REWARDS = [
  { text: 'Rank Up: E → D',          icon: '▸' },
  { text: '+500 XP',                  icon: '▸' },
  { text: 'SYSTEM ACCESS GRANTED',   icon: '▸' },
]

function Scene5({ onAccept }) {
  const [visibleRewards, setVisibleRewards] = useState(0)
  const [showAccept, setShowAccept]         = useState(false)

  useEffect(() => {
    S5_REWARDS.forEach((_, i) => {
      setTimeout(() => setVisibleRewards(v => Math.max(v, i + 1)), 700 + i * 260)
    })
    const t    = setTimeout(() => setShowAccept(true), 2600)
    const auto = setTimeout(onAccept, 8000)
    return () => { clearTimeout(t); clearTimeout(auto) }
  }, [])

  return (
    <div className={styles.scene5}>
      {MANA_PARTICLES.map(p => (
        <div
          key={p.id}
          className={styles.manaParticle}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <motion.div
        className={styles.questWindow}
        initial={{ x: 700, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
      >
        <span className={`${styles.qCorner} ${styles.qTL}`} />
        <span className={`${styles.qCorner} ${styles.qTR}`} />
        <span className={`${styles.qCorner} ${styles.qBL}`} />
        <span className={`${styles.qCorner} ${styles.qBR}`} />

        <div className={styles.questHeader}>
          <span>[ QUEST ASSIGNED ]</span>
        </div>

        <div className={styles.questBody}>
          <p className={styles.questTitle}>ENTER THE ARRAY DUNGEON</p>

          <div className={styles.questDivider} />

          <p className={styles.questDesc}>
            Corrupted data entities block the path.<br />
            Defeat them using the power of Arrays.<br />
            Prove your worth. Begin your ascent.
          </p>

          <div className={styles.questDivider} />

          <div className={styles.rewardsSection}>
            <span className={styles.rewardLabel}>CLEAR REWARD</span>
            <div className={styles.rewardList}>
              {S5_REWARDS.map((r, i) => (
                <motion.div
                  key={i}
                  className={styles.rewardRow}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: i < visibleRewards ? 1 : 0, x: i < visibleRewards ? 0 : 12 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className={styles.rewardIcon}>{r.icon}</span>
                  <span className={styles.rewardText}>{r.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {showAccept && (
            <motion.div
              className={styles.acceptRow}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.button
                className={styles.yesBtn}
                onClick={onAccept}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: ['0 0 16px rgba(26,58,255,0.4)', '0 0 36px rgba(26,58,255,0.8)', '0 0 16px rgba(26,58,255,0.4)'] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className={styles.yesBtnScan} />
                [ YES — BEGIN ]
              </motion.button>
              <span className={styles.greyBtn}>[ ... ]</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// ── Main CutsceneScreen ───────────────────────────────────────────────────

const SCENE_ORDER    = [1, 2, 3, 7, 8, 9, 4, 6, 5]
const SCENE_DURATION = { 1: 5200, 2: 4200, 3: 6200, 7: 6000, 8: 2800, 9: 3800, 4: 7500, 6: 3200 }

export default function CutsceneScreen() {
  const navigate             = useNavigate()
  const [sceneIdx, setSceneIdx] = useState(0)
  const scene = SCENE_ORDER[sceneIdx]

  function advance() {
    if (sceneIdx < SCENE_ORDER.length - 1) setSceneIdx(i => i + 1)
  }

  useEffect(() => {
    const dur = SCENE_DURATION[scene]
    if (!dur) return
    const t = setTimeout(advance, dur)
    return () => clearTimeout(t)
  }, [scene])

  return (
    <div className={styles.root}>
      <button className={styles.skipBtn} onClick={() => navigate('/auth')}>
        SKIP
        <span className={styles.skipArrow}>›</span>
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          className={styles.sceneWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {scene === 1 && <Scene1 />}
          {scene === 2 && <Scene2 />}
          {scene === 3 && <Scene3 />}
          {scene === 7 && <Scene7 />}
          {scene === 8 && <Scene8 />}
          {scene === 9 && <Scene9 />}
          {scene === 4 && <Scene4 />}
          {scene === 6 && <Scene6 />}
          {scene === 5 && <Scene5 onAccept={() => navigate('/auth')} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
