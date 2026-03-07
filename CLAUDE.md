# DSA Gamified RPG — Project Brief for Claude

## Project Overview

A gamified RPG web app that teaches Data Structures and Algorithms (DSA) through an interactive, narrative-driven experience. Inspired by Flexbox Adventure's split-pane UI. Target audience: CS students following the GSU-DSA curriculum and coding beginners.

---

## Hero & Progression System

- **Hero:** Arthur
- **Progression tiers:**
  - Initiate (Commoner) → Guardian (Leather Armor) → Paladin (Plate Armor)
- **Health:** Starts at 50/100 HP; completing a level restores +10 HP
- **Armor upgrades** trigger at key milestones (e.g., Level 5)
- **Boss Battles:** High-difficulty levels with story allies (e.g., Marilyn the Mage)

---

## Curriculum Map (GSU-DSA Aligned)

| Stage | Data Structure | Narrative Hook | Beginner Level | Boss Fight |
|-------|---------------|----------------|----------------|------------|
| 1 | Arrays / Lists | Organizing the Inventory | Arrange items by index to open a door | Filter incoming projectiles to block only "Critical" ones |
| 2 | Stacks / Queues | The Wizard's Tower | Use a Stack to undo magical traps (LIFO) | Manage a Queue of villagers to evacuate before a dragon attacks |
| 3 | Linked Lists | The Chain of Command | Connect Nodes to power a bridge | Delete a specific node (Hydra head) to stop regeneration |
| 4 | Trees / BST | The Forest of Decisions | Find fruit by comparing values (Left < Right) | Balance a Corrupted Tree (AVL/Red-Black) to restore the forest |
| 5 | Graphs | Mapping the Kingdom | Visit every city via simple traversal | Find the shortest path (Dijkstra) to the Dark Lord's castle |

---

## Beginner Onboarding Strategy

- **Level 0:** Drag-and-drop blocks or simplified custom syntax (no real code yet)
- **Level 1:** Real syntax with "Ghost Code" scaffolding — player fills in one line only
- **Visual Feedback:** Actions like `list.pop()` should be visually animated on screen

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React or Next.js |
| Animations | Framer Motion |
| Game Engine | Phaser.js (sprites, collisions, animations) |
| Code Editor | Monaco Editor or CodeMirror |
| JS Execution | Sandboxed `eval()` or Web Worker |
| Python Execution | Skulpt or Pyodide |

---

## Asset Naming Conventions

| Type | Class Names |
|------|-------------|
| Characters | `Character_Arthur_Initiate`, `Character_Arthur_Guardian`, `Ally_Marilyn_Mage` |
| Environment | `Env_ArrayTile`, `Env_BackgroundPlains` |
| Enemies | `Enemy_DataSlime`, `Enemy_NullSentinelBoss` |

Use these class names to swap SVGs dynamically across stages.

---

## MVP Scope (Stage 1 — Arrays)

1. Build one realm: **Arrays**
2. Create 5 levels ranging from "Accessing Index 0" to "Finding the Maximum Value"
3. Build a **Validation Engine:** takes user code as a string, executes it, checks output against the "Boss's Weakness"
4. Use **2D pixel art** assets (free RPG packs available on Itch.io)

---

## Project Setup & Config

- **Root directory:** `CounterStack/`
- Delete any `temp-cs` flattened directory remnants
- `package.json` must be in the project root
- PostCSS and Tailwind must be initialized at the root level for Cyber-Dungeon styling
