Create a new file src/screens/CutsceneScreen.jsx and src/screens/CutsceneScreen.module.css

This is the opening animated cutscene for DSA Arise — a Solo Leveling inspired DSA learning game. The player character is KAI, an E-Rank hunter who gets chosen by a mysterious system.

Build the cutscene as a sequence of 6 scenes that auto-advance with timing. Use React useState and useEffect for scene progression. Use Framer Motion for all animations.

Import Press Start 2P and Rajdhani fonts from Google Fonts in index.html:
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Rajdhani:wght@400;600;700&display=swap" rel="stylesheet">

---

SCENE 1 — "The Weak One" (3 seconds)
Background: pure black (#000000)
Show a stat panel in the center — styled like a Solo Leveling system window:
- Dark navy border (#0a0a2e) with a glowing blue outline (box-shadow: 0 0 20px #1a3aff, inset 0 0 10px rgba(26,58,255,0.1))
- Sharp rectangular corners
- Header text: [ HUNTER STATUS ] in Rajdhani font, 13px, #4488ff, letter-spacing 4px
- Stats listed below in Rajdhani 700, each on its own line:
  Name: KAI
  Rank: E
  Strength: 3 / 100
  Intelligence: 5 / 100
  Mana: 1 / 100
  Class: UNAWAKENED
- Each stat line fades in one at a time with 0.3s delay between them
- Bottom of panel: blinking text "> CANDIDATE FLAGGED FOR ELIMINATION" in #ff3333, 10px Press Start 2P

---

SCENE 2 — "The Double Dungeon" (4 seconds)
Background: very dark navy #02020f
Animate a dungeon gate opening from the center — two tall rectangular dark panels slide apart (left goes left, right goes right) revealing a glowing void behind them.
The void is a radial gradient: #000000 outer, #0d0040 mid, #1a0070 center with a pulsing glow animation.
Show floating corrupted data fragments — 12 small rectangles (2-4px wide, 8-20px tall) in colors #ff0044, #ff6600, #00ffff scattered randomly, rotating slowly, drifting upward.
Text appears at bottom center after 1.5s:
"A gate no one returned from."
Rajdhani 700, 20px, #8888cc, fade in over 0.5s

---

SCENE 3 — "Collapse" (3.5 seconds)
Background: black
Screen glitches — implement a CSS glitch effect: duplicate the background div, offset it by 3-5px in red and cyan channels using mix-blend-mode, animate it flickering on/off rapidly for 1 second.
Then show Kai's silhouette figure in the center — build this as an SVG:
- 60px wide, 120px tall
- Body shape: simple dark cloaked figure, color #1a0044
- Two glowing eyes: small circles, color #00ccff, with blur filter (filter: drop-shadow(0 0 4px #00ccff))
- Surrounded by 8 mana particle divs — small circles 3-6px, color #5533ff, orbiting using CSS animation rotate around the figure
Kai is on one knee — slightly hunched position (tilt the SVG -10deg)
Text glitches in: "CONNECTION LOST — ENTITY DETECTED" in #ff0044, Press Start 2P 9px, flickers 3 times then holds

---

SCENE 4 — "System Initializes" (5 seconds)
Background: #000000
A dramatic full-screen flash (white div, opacity 0 to 1 to 0 over 0.4s)
Then a MASSIVE system window slams into frame from above — framer motion y: -800 to 0, with spring physics (stiffness: 400, damping: 30)
The system window:
- 480px wide, centered
- Background: rgba(0, 4, 40, 0.97)
- Border: 2px solid #1a3aff
- Box shadow: 0 0 60px rgba(26,58,255,0.8), 0 0 120px rgba(26,58,255,0.3)
- Top bar: solid #0a1aff strip, 36px tall, with text "[ SYSTEM ]" centered, white, Rajdhani 700 14px letter-spacing 6px
- Body content types out character by character (typewriter effect, 40ms per char):
  "A player who can grow..."
  (pause 0.5s)
  "has been found."
  (pause 0.8s)
  "YOU HAVE BEEN SELECTED"
  "AS THE SOLE PLAYER."
- Text color: #ccddff, Rajdhani 600, 18px, line-height 2
- "YOU HAVE BEEN SELECTED AS THE SOLE PLAYER." should be larger — 22px, color #ffffff, bold
- Bottom of window after typing completes: blue progress bar fills left to right over 1s, then text: "INITIALIZING PLAYER DATA..." in #4488ff 11px Rajdhani

---

SCENE 5 — "First Quest" (4 seconds)
Background: #000000 with faint blue mana particles drifting upward (20 particles, 2-3px, #1133ff, random x positions, slow upward drift CSS animation)
A QUEST window appears — slide in from right, framer motion x: 600 to 0
Quest window styling — gold-accented this time:
- Border: 2px solid #aa7700
- Box shadow: 0 0 30px rgba(255,180,0,0.4)
- Header: [ QUEST ASSIGNED ] in #ffcc00, Rajdhani 700, letter-spacing 3px
- Quest title: "ENTER THE ARRAY DUNGEON" in white, Press Start 2P 11px
- Description in Rajdhani 600 16px #aabbcc:
  "Corrupted data entities block the path.
   Defeat them using the power of Arrays.
   Prove your worth. Begin your ascent."
- Rewards section:
  "CLEAR REWARD:" label in #ffcc00
  "► Rank Up: E → D" in #00ff88
  "► +500 XP" in #00ff88
  "► SYSTEM ACCESS GRANTED" in #00ff88
- Each reward line fades in with 0.2s delay between them
Bottom of scene after 2.5s: pulsing text "[ ACCEPT QUEST? ]" with two options side by side:
  [ YES — BEGIN ] button: background #0a1aff, border #4466ff, white text, Rajdhani 700
  [ ... ] greyed out, not clickable
Clicking YES advances to the next screen (navigate to '/game' using React Router useNavigate)

---

SCENE 6 — "Title Card" (3 seconds, plays before Scene 5's button or auto if button not clicked in 8s)
Actually insert this BEFORE Scene 5 — after Scene 4.
Black screen.
The word  D S A Q U E S T  appears letter by letter, each letter sliding up from below with staggered framer motion, 0.08s between each letter.
Font: Press Start 2P, 36px, color #ffffff
Below it after all letters appear: subtitle fades in:
"ARISE." in Rajdhani 700, 28px, #4488ff, letter-spacing 12px
Hold for 1.5s then auto-advance to Scene 5.

---

SCENE FLOW:
Scene 1 (3s) → Scene 2 (4s) → Scene 3 (3.5s) → Scene 4 (5s) → Scene 6/Title Card (3s) → Scene 5/Quest (holds until player clicks YES)

Each scene transition: screen fades to black (0.3s) then new scene fades in (0.3s)

---

ADDITIONAL DETAILS:
- The entire cutscene container is position fixed, top 0 left 0, width 100vw height 100vh, background #000, z-index 100, overflow hidden
- Add a SKIP button top-right corner: small, Rajdhani font, #444 color, "SKIP >>" — on click navigate immediately to /game
- Export CutsceneScreen as default
- In App.jsx add route: /intro → CutsceneScreen
- Make the TitleScreen "press enter" navigate to /intro instead of /auth so the cutscene plays first, then Scene 5's YES button goes to /auth

Do not add any gameplay yet. This is purely the cinematic intro.