import { useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './TitleScreen.module.css'
import imgFar   from '../assets/scenes/stage1/layer_far.png'
import imgMid   from '../assets/scenes/stage1/layer_mid.png'
import imgClose from '../assets/scenes/stage1/layer_close.png'
import imgFg    from '../assets/scenes/stage1/layer_fg.png'

const PARTICLE_COLORS = ['#D63AAF', '#6B22CC', '#00E5FF']

function rand(min, max) {
  return min + Math.random() * (max - min)
}

export default function TitleScreen() {
  const navigate = useNavigate()

  const farRef   = useRef()
  const midRef   = useRef()
  const closeRef = useRef()
  const fgRef    = useRef()

  // Seamless parallax: background-repeat:repeat-x tiles natively;
  // rAF advances position by exactly one natural tile width per loop.
  useEffect(() => {
    const vh = window.innerHeight
    const LAYERS = [
      { ref: farRef,   src: imgFar,   duration: 28 },
      { ref: midRef,   src: imgMid,   duration: 18 },
      { ref: closeRef, src: imgClose, duration: 11 },
      { ref: fgRef,    src: imgFg,    duration: 7  },
    ]

    const tileW = [0, 0, 0, 0]
    const pos   = [0, 0, 0, 0]
    let rafId = null
    let lastT = null

    // Set background-image and resolve natural tile width for each layer
    LAYERS.forEach(({ ref, src }, i) => {
      if (ref.current) ref.current.style.backgroundImage = `url(${src})`
      const img = new Image()
      img.onload = () => {
        tileW[i] = img.naturalWidth * (vh / img.naturalHeight)
        if (!rafId) rafId = requestAnimationFrame(tick)
      }
      img.src = src
    })

    function tick(t) {
      if (lastT === null) lastT = t
      const dt = (t - lastT) / 1000
      lastT = t
      LAYERS.forEach(({ ref, duration }, i) => {
        if (!tileW[i] || !ref.current) return
        pos[i] = (pos[i] + tileW[i] * (dt / duration)) % tileW[i]
        ref.current.style.backgroundPositionX = `-${pos[i]}px`
      })
      rafId = requestAnimationFrame(tick)
    }

    return () => { if (rafId) cancelAnimationFrame(rafId) }
  }, [])

  // Generated once on mount — stable via useMemo
  const stars = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      top:   `${rand(0, 100)}%`,
      left:  `${rand(0, 100)}%`,
      size:  `${rand(1, 3)}px`,
      delay: `${rand(0, 5)}s`,
      dur:   `${rand(1.5, 4.5)}s`,
    })), [])

  const rain = useMemo(() =>
    Array.from({ length: 70 }, (_, i) => ({
      id: i,
      left:  `${rand(0, 100)}%`,
      delay: `${rand(0, 2)}s`,
      dur:   `${rand(0.55, 1.35)}s`,
      h:     `${rand(55, 135)}px`,
    })), [])

  const particles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id:    i,
      left:  `${rand(5, 95)}%`,
      bot:   `${rand(2, 30)}%`,
      color: PARTICLE_COLORS[i % 3],
      size:  `${rand(3, 8)}px`,
      delay: `${rand(0, 6)}s`,
      dur:   `${rand(4, 10)}s`,
    })), [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Enter') navigate('/auth') }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  return (
    <div className={styles.root}>

      {/* ── Sky + parallax layers ── */}
      <div className={styles.sky} />
      <div ref={farRef}   className={styles.layerFar}   />
      <div ref={midRef}   className={styles.layerMid}   />
      <div ref={closeRef} className={styles.layerClose} />
      <div ref={fgRef}    className={styles.layerFg}    />

      {/* ── Stars ── */}
      {stars.map(s => (
        <div
          key={s.id}
          className={styles.star}
          style={{
            top: s.top, left: s.left,
            width: s.size, height: s.size,
            animationDelay: s.delay,
            animationDuration: s.dur,
          }}
        />
      ))}

      {/* ── Moon ── */}
      <div className={styles.moon} />

      {/* ── Cloud wisps ── */}
      <div className={styles.clouds} />

      {/* ── Rain ── */}
      {rain.map(r => (
        <div
          key={r.id}
          className={styles.raindrop}
          style={{
            left: r.left,
            height: r.h,
            animationDelay: r.delay,
            animationDuration: r.dur,
          }}
        />
      ))}

      {/* ── Ground glow ── */}
      <div className={styles.groundGlow} />

      {/* ── CRT scanlines ── */}
      <div className={styles.scanlines} />

      {/* ── Vignette ── */}
      <div className={styles.vignette} />

      {/* ── Floating particles ── */}
      {particles.map(p => (
        <div
          key={p.id}
          className={styles.particle}
          style={{
            left: p.left,
            bottom: p.bot,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 6px 2px ${p.color}`,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}

      {/* ── Corner brackets ── */}
      <div className={`${styles.corner} ${styles.cornerTL}`} />
      <div className={`${styles.corner} ${styles.cornerTR}`} />
      <div className={`${styles.corner} ${styles.cornerBL}`} />
      <div className={`${styles.corner} ${styles.cornerBR}`} />

      {/* ── Title UI ── */}
      <div className={styles.titleContainer}>
        <p className={styles.systemTag}>[ CODEX SYSTEM v1.0 ]</p>
        <h1 className={styles.mainTitle}>DSAQUEST</h1>
        <h2 className={styles.subtitle}>CODEX</h2>
        <p className={styles.pressEnter}>— press enter —</p>
      </div>

    </div>
  )
}
