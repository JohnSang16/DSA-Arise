# DSA Arise — Claude Code Project Context

## What This Project Is
An anime sci-fi educational RPG inspired by Solo Leveling that teaches Data Structures and Algorithms to beginner CS students. The player controls KAI, an E-Rank hunter who gets chosen by a mysterious system and ranks up by solving DSA challenges. Built for GSU-DSA curriculum.

## Tech Stack
- Frontend: React + Vite (plain JavaScript, NO TypeScript)
- Routing: React Router DOM
- Animations: Framer Motion
- Code Editor: Monaco Editor (@monaco-editor/react)
- Auth + Database: Supabase
- Styling: CSS Modules
- Fonts: Press Start 2P, Rajdhani (Google Fonts)

## Color Palette (Solo Leveling dark anime — use these EVERYWHERE)
```
--color-bg-void:       #000000   /* pure black — cutscene backgrounds */
--color-bg-deep:       #02020f   /* near black navy — main backgrounds */
--color-bg-dark:       #0a0a2e   /* deep navy — panels, cards */
--color-bg-mid:        #0d0040   /* dark void purple — secondary panels */
--color-system-blue:   #1a3aff   /* system window blue — borders, glows */
--color-mana-purple:   #5533ff   /* mana energy purple — particles, aura */
--color-accent-cyan:   #00ccff   /* Kai's eye glow — highlights, active states */
--color-accent-gold:   #ffcc00   /* quest gold — rewards, special text */
--color-accent-green:  #00ff88   /* rank up green — success, rewards */
--color-text-light:    #ccddff   /* light blue-white — body text */
--color-text-muted:    #8888cc   /* muted purple — secondary text */
--color-danger:        #ff3333   /* red — enemy flagged, danger, errors */
--color-rank-e:        #8888cc   /* grey-purple — E Rank color */
--color-rank-d:        #00ccff   /* cyan — D Rank color */
--color-rank-c:        #aa44ff   /* purple — C Rank color */
--color-rank-b:        #00ff88   /* green — B Rank color */
--color-rank-a:        #ffcc00   /* gold — A Rank color */
--color-rank-s:        #ffffff   /* white — S Rank color */
```

Color role assignments:
- Backgrounds: #000000 (void) and #02020f (deep) and #0a0a2e (panels)
- System windows / borders: #1a3aff (system blue)
- Mana particles / aura effects: #5533ff (mana purple)
- Kai's eyes / active highlights: #00ccff (accent cyan)
- Quest rewards / special UI: #ffcc00 (accent gold)
- Success / rank up / correct answer: #00ff88 (accent green)
- All body text: #ccddff (text light)
- Muted / secondary text: #8888cc (text muted)
- Errors / danger / enemy alerts: #ff3333 (danger red)
- Neon glow shadows always use the element's color at 40-60% opacity

## Visual Style
Dark anime dungeon hunter aesthetic inspired by Solo Leveling. Pure black and deep navy backgrounds. Electric blue system windows with sharp rectangular corners. Mana purple particle effects. Kai's cyan eye glow as the signature visual motif. Press Start 2P for game UI titles and labels, Rajdhani 700 for system windows and narrative text. System windows always have: dark navy background, 2px solid #1a3aff border, box-shadow 0 0 40px rgba(26,58,255,0.6).

## Project Structure
```
src/
  screens/
    CutsceneScreen.jsx + .module.css   # opening Solo Leveling style intro
    TitleScreen.jsx + .module.css      # title with Kai silhouette
    AuthScreen.jsx + .module.css       # login / signup
    HubScreen.jsx + .module.css        # rank overview, stage select
    GameScreen.jsx + .module.css       # split panel game view
  components/
    Navbar.jsx + .module.css
    HUD.jsx + .module.css
    QuestionPanel.jsx + .module.css
    ParallaxBackground.jsx + .module.css
    GameScene.jsx + .module.css
    SystemWindow.jsx + .module.css     # reusable Solo Leveling system window UI
  engine/
    levels/                            # stage1.js through stage5.js
    validator.js                       # answer checking logic
  lib/
    supabase.js
    auth.js
  assets/
    scenes/                            # parallax PNG layers per stage
    sprites/                           # kai_idle.png, kai_attack.png, kai_hurt.png, enemy PNGs
```

## Screens & Routes
- /intro → CutsceneScreen (Solo Leveling opening cinematic, plays once on first visit)
- / → TitleScreen (Kai silhouette, mana particles, press Enter)
- /auth → AuthScreen (login/signup with Supabase)
- /hub → HubScreen (rank card, stage select dungeon gates)
- /game?stage=N → GameScreen (split panel: code editor left, dungeon scene right)

## Rank Progression System
Each stage completed ranks Kai up. Rank is stored in Supabase and shown everywhere.

| Rank | Stage | DSA Topic | Enemy |
|------|-------|-----------|-------|
| E-Rank | Stage 1 | Arrays | DataSlime |
| D-Rank | Stage 2 | Stacks & Queues | NullSentinel |
| C-Rank | Stage 3 | Linked Lists | HydraNode |
| B-Rank | Stage 4 | Trees / BST | CorruptTree |
| A-Rank | Stage 5 | Graphs | DarkLord |
| S-Rank | Cleared | All stages | — |

Rank color is always applied to Kai's name, rank badge, and eye glow intensity in sprites.

## Game Screen Layout
- Left 45%: story blurb (collapsible, Rajdhani font) → Monaco editor → Check Answer + Hint buttons → output bar
- Right 55%: animated parallax dungeon background + Kai sprite vs enemy sprite + level dots at bottom
- Navbar at top: DSA ARISE logo, current rank badge, stage info, HP bar, username, logout

## Character Sprites
- Kai: PNG files from src/assets/sprites/ — kai_idle.png, kai_attack.png, kai_hurt.png, kai_victory.png
- Enemies: enemy_idle.png, enemy_hurt.png, enemy_defeated.png
- Kai faces RIGHT, enemies face LEFT
- E-Rank Kai: grey worn cloak, barely glowing eyes, no mana aura
- As rank increases: cloak becomes darker/more detailed, eyes glow brighter cyan, mana particles appear

## Parallax Background Layers
5 PNG layers in src/assets/scenes/stage1/ — dungeon aesthetic:
- layer_sky.png — static dark cavern ceiling, z-index 1
- layer_far.png — scrolls 45s, deep dungeon walls
- layer_mid.png — scrolls 28s, floating data rune particles
- layer_close.png — scrolls 18s, dungeon pillars / rock formations
- layer_fg.png — scrolls 11s, foreground dungeon floor details
Sky background: linear-gradient #000000 → #02020f → #0a0a2e

## Supabase Schema
Table: user_progress
- id, user_id (FK auth.users), current_stage (int), current_level (int), hp (int default 50), current_rank (text default 'E'), unlocked_stages (int[]), updated_at

## Level Types
- multiple_choice: 4 options, click to select
- fill_blank: type one expression into a single input
- code: full Monaco editor, validated against test cases via Function() constructor

## HP System
- Start: 50/100
- Level complete: +10 HP (max 100)
- Hint used: -5 HP
- 3rd wrong attempt on same level: -5 HP
- HP bar color matches current rank color

## System Window Component
All popup UI (quest windows, rank up notices, system messages) use the SystemWindow component with this base style:
- background: rgba(0, 4, 40, 0.97)
- border: 2px solid #1a3aff
- box-shadow: 0 0 60px rgba(26,58,255,0.8), 0 0 120px rgba(26,58,255,0.3)
- top bar: solid #0a1aff strip, Rajdhani 700, letter-spacing 6px
- body text: #ccddff, Rajdhani 600, 18px

## Stage Themes
| Stage | Topic | Rank Color | Dungeon Vibe |
|-------|-------|------------|--------------|
| 1 | Arrays | #8888cc grey-purple | Dark cave, corrupted data slimes |
| 2 | Stacks / Queues | #00ccff cyan | Underground ruins, null entities |
| 3 | Linked Lists | #aa44ff purple | Chain dungeon, hydra nodes |
| 4 | Trees / BST | #00ff88 green | Cursed forest, corrupt trees |
| 5 | Graphs | #ffcc00 gold | Cyber kingdom, dark lord throne |

## Cutscene Flow (CutsceneScreen)
Scene 1 (3s): E-Rank stat panel — Kai's weak stats, CANDIDATE FLAGGED FOR ELIMINATION
Scene 2 (4s): Double dungeon gate opens into glowing void, corrupted data fragments
Scene 3 (3.5s): Screen glitch, Kai silhouette on one knee, mana particles appear
Scene 4 (5s): System window slams in — YOU HAVE BEEN SELECTED AS THE SOLE PLAYER
Scene 5 (3s): DSA ARISE title card — letters stagger in, ARISE. subtitle
Scene 6 (holds): First quest window — ENTER THE ARRAY DUNGEON, YES BEGIN button → /auth

## Rules — Read Before Every Task
1. Never use TypeScript — plain JavaScript only
2. Never install new dependencies without asking first
3. Always use CSS Modules for styling — no inline styles except Framer Motion
4. Never break existing working screens when editing another screen
5. Test that the app still runs after every change
6. Keep all Supabase keys in .env — never hardcode them
7. One task at a time — do not add unrequested features
8. Always use the color palette defined above — never use old colors like #b366ff, #00ff88 as a generic green, #D63AAF, #F2DDFF
9. All system windows must use the SystemWindow styling defined above
10. Kai's rank must always be reflected visually — rank color on badge, name, and HP bar

## Current Status
- [ ] Prompt 1 — Opening cutscene (CutsceneScreen)
- [ ] Prompt 2 — Title screen (Solo Leveling aesthetic)
- [ ] Prompt 3 — Supabase connection + rank field
- [ ] Prompt 4 — Auth screen
- [ ] Prompt 5 — Hub screen (rank card + dungeon gate select)
- [ ] Prompt 6 — Game screen layout
- [ ] Prompt 7 — Level data and validation
- [ ] Prompt 8 — Win animation, rank up sequence, progress save
- [ ] Prompt 9 — Kai and enemy sprites (PNG swap in)
- [ ] Prompt 10 — Polish pass