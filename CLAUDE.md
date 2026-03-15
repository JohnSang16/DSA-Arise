# DSAQuest — Claude Code Project Context

## What This Project Is
A pixel sci-fi educational RPG that teaches Data Structures and Algorithms to beginner CS students. Players control Arthur, a hacker character, who battles enemies by solving DSA questions. Built for GSU-DSA curriculum.

## Tech Stack
- **Frontend:** React + Vite (plain JavaScript, NO TypeScript)
- **Routing:** React Router DOM
- **Animations:** Framer Motion
- **Code Editor:** Monaco Editor (@monaco-editor/react)
- **Auth + Database:** Supabase
- **Styling:** CSS Modules
- **Fonts:** Press Start 2P, VT323 (Google Fonts)

## Color Palette (Cyberpunk 2077-inspired — use these EVERYWHERE)
```
--color-bg-deep:      #0D0B1A   /* darkest background */
--color-bg-dark:      #1E1C6E   /* deep navy — page backgrounds */
--color-bg-mid:       #2A2E4A   /* dark slate — cards, panels */
--color-accent-pink:  #D63AAF   /* hot magenta — primary accent, buttons, glows */
--color-accent-purple:#6B22CC   /* neon purple — secondary accent, borders */
--color-accent-cyan:  #00E5FF   /* electric cyan — highlights, HP bar, active states */
--color-accent-rose:  #8B1A6B   /* deep rose — hover states, shadows */
--color-soft-lavender:#F2DDFF   /* soft lavender — body text on dark bg */
--color-steel-blue:   #8B9FD4   /* steel blue — muted text, disabled states */
```

**Color role assignments:**
- Backgrounds: #0D0B1A (deepest) and #1E1C6E (navy) and #2A2E4A (panels)
- Primary CTA buttons / glows: #D63AAF (hot magenta)
- Borders / secondary elements: #6B22CC (neon purple)
- Highlights / HP bar / active: #00E5FF (electric cyan)
- All body text: #F2DDFF (soft lavender)
- Muted / disabled text: #8B9FD4 (steel blue)
- Neon glow shadows always use the element's color at 40-60% opacity

## Visual Style
Retro pixel sci-fi / Cyberpunk 2077 palette. Deep navy/indigo backgrounds. Hot magenta and electric cyan as the dominant neon accents. CRT scanlines overlay on every screen. Press Start 2P for all titles and UI labels, VT323 for narrative/body text.

## Project Structure
```
src/
  screens/         # TitleScreen, AuthScreen, HubScreen, GameScreen
  components/      # Navbar, HUD, QuestionPanel, ParallaxBackground, GameScene
  engine/
    levels/        # stage1.js through stage5.js
    validator.js   # answer checking logic
  lib/
    supabase.js    # Supabase client
    auth.js        # auth + progress helpers
  assets/
    scenes/        # parallax PNG layers per stage
    sprites/       # character PNGs (arthur_idle.png, arthur_attack.png, etc.)
```

## Screens & Routes
- `/` → TitleScreen (animated parallax title, press Enter to start)
- `/auth` → AuthScreen (login/signup with Supabase)
- `/hub` → HubScreen (world map, stage select, player stats)
- `/game?stage=N` → GameScreen (split panel: code editor left, game scene right)

## Game Screen Layout
- Left 45%: story blurb (collapsible) → Monaco editor → Check Answer + Hint buttons → output bar
- Right 55%: animated parallax background + Arthur sprite vs enemy sprite + level dots at bottom
- Navbar at top: logo, stage/level info, HP bar, username, logout

## Character Sprites
- Arthur: uses PNG files (arthur_idle.png, arthur_attack.png, arthur_hurt.png)
- Enemies: uses PNG files (enemy_idle.png, enemy_hurt.png, enemy_defeated.png)
- All sprites in src/assets/sprites/
- Arthur faces RIGHT, enemies face LEFT

## Parallax Background Layers
5 PNG layers in src/assets/scenes/stage1/:
- layer_sky.png — static, z-index 1
- layer_far.png — scrolls 28s, filter hue-rotate(155deg) saturate(5) brightness(0.5), mix-blend-mode screen
- layer_mid.png — scrolls 18s, filter hue-rotate(200deg) saturate(6) brightness(0.55), mix-blend-mode screen
- layer_close.png — scrolls 11s, filter hue-rotate(180deg) saturate(4) brightness(1.6), mix-blend-mode screen
- layer_fg.png — scrolls 7s, filter hue-rotate(175deg) saturate(3) brightness(0.7)
Sky background: linear-gradient #0D0B1A → #1E1C6E → #0D0B1A

## Supabase Schema
Table: user_progress
- id, user_id (FK auth.users), current_stage (int), current_level (int), hp (int, default 50), unlocked_stages (int[]), updated_at

## Level Types
- multiple_choice: 4 options, click to select
- fill_blank: type one expression into a single input
- code: full Monaco editor, validated against test cases via Function() constructor

## HP System
- Start: 50/100
- Level complete: +10 HP (max 100)
- Hint used: -5 HP
- 3rd wrong attempt on same level: -5 HP

## Stage Themes
| Stage | Topic | Color | Enemy |
|-------|-------|-------|-------|
| 1 | Arrays | #00E5FF cyan | DataSlime |
| 2 | Stacks/Queues | #D63AAF magenta | NullSentinel |
| 3 | Linked Lists | #6B22CC purple | HydraNode |
| 4 | Trees/BST | #8B9FD4 steel blue | CorruptTree |
| 5 | Graphs | #F2DDFF lavender | DarkLord |

## Rules — Read Before Every Task
1. Never use TypeScript — plain JavaScript only
2. Never install new dependencies without asking first
3. Always use CSS Modules for styling — no inline styles except Framer Motion
4. Never break existing working screens when editing another screen
5. Test that the app still runs after every change
6. Keep all Supabase keys in .env — never hardcode them
7. One task at a time — do not add unrequested features
8. Always use the color palette defined above — never use old colors like #00ff88, #b366ff, #00ffcc, #ff44cc

## Current Status
<!-- Update this section as you build -->
- [x] Prompt 1 — Project scaffold
- [x] Prompt 2 — Supabase connection
- [x] Prompt 3 — Title screen
- [x] Prompt 4 — Auth screen
- [ ] Prompt 5 — Hub screen
- [ ] Prompt 6 — Game screen layout
- [ ] Prompt 7 — Level data & validation
- [ ] Prompt 8 — Win animation & progress save
- [ ] Prompt 9 — Character sprites
- [ ] Prompt 10 — Polish pass
