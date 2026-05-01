# Execution Breakdown — 塔底生存指南

## Packet Dependencies

```
P1 (Bootable Skeleton) → P2 (Game Loop) → P3 (Items/Crafting) → P4 (Environment Sim)
                                        → P5 (NPC/Morality) → P6 (Story/Endings)
```

---

## Packet P1: Bootable Skeleton
**Purpose**: Make `node test.mjs` pass. Game loads in mobile browser with grid rendering.

### Read Scope
- `js/main.js`, `test.mjs`, legacy task file

### Write Scope
- `index.html` (new — ~80 lines)
- `js/main.js` (rewrite — ~200 lines)
- `css/style.css` (new — ~100 lines)

### Acceptance Criteria
1. `node test.mjs game10-tower-base-survival` passes all 6 checks
2. Grid map (40x30 cells) renders on a canvas
3. Viewport meta: `user-scalable=no, viewport-fit=cover`
4. Layout fits 375px width without horizontal overflow
5. All interactive elements ≥ 44px
6. No JS errors on load or after touch interaction

### File/Delta Budget
- 3 files modified/created
- ~380 net lines

### Implementation Notes
- `index.html`: viewport meta, link to `css/style.css`, single `<canvas>`, bottom action bar with 5 buttons (移动/搜刮/制作/休息/对话), top status bar (天数/天气/威胁等级)
- `js/main.js`: canvas rendering loop, grid data model (2D array of cell states), touch event handling, basic game state object
- `css/style.css`: mobile-first layout, safe-area-inset padding, action button styling ≥ 44px, status bar at top

---

## Packet P2: Core Game Loop
**Purpose**: Player movement, basic health tracking, day progression.

### Read Scope
- All files from P1, legacy task file Sections 五, UI spec

### Write Scope
- `js/main.js` (extend)
- `css/style.css` (extend)
- May add `js/player.js` or `js/grid.js` if main.js exceeds 300 lines

### Acceptance Criteria
1. Player appears on grid, can tap adjacent cells to move
2. Left panel shows: HP bar, hunger bar, thirst bar
3. Day counter increments when player presses "休息"
4. Health bars decrease per day (hunger +1, thirst +2)
5. Touch to move works; no keyboard dependency

### File/Delta Budget
- 2-3 files
- ~400 net lines

---

## Packet P3: Item & Crafting Foundation
**Purpose**: Basic item system, inventory panel, 3-5 crafting recipes.

### Read Scope
- All prior files, legacy task file Section 二

### Write Scope
- `js/main.js` or new `js/items.js`
- `css/style.css` (inventory panel)
- `index.html` (if inventory panel HTML needed)

### Acceptance Criteria
1. Grid cells can contain items (wood, cloth, dirty water, scraps)
2. Right panel shows inventory grid (drag-free for now; tap to select)
3. Crafting button opens modal with 3-5 recipes
4. Recipe example: 破布 + 木棍 → 火把
5. Items have state properties (durability, weight shown)

### File/Delta Budget
- 2-3 files
- ~450 net lines

---

## Packet P4: Environment Simulation
**Purpose**: Cellular automata — fire spread, water flow, rot decay.

### Read Scope
- All prior files, legacy task file Section 一

### Write Scope
- `js/main.js` or new `js/world.js`

### Acceptance Criteria
1. Each game tick applies automata rules to grid
2. Fire spreads to adjacent non-water, non-empty cells
3. Rot reduces health of adjacent cells
4. Water slowly heals adjacent cell health
5. Visual rendering updates to show cell state changes

### File/Delta Budget
- 1-2 files
- ~350 net lines

---

## Packet P5: NPC & Morality System
**Purpose**: Basic NPC entities, moral choice tracking, hidden RNG modifiers.

### Read Scope
- All prior files, legacy task file Sections 三, 四

### Write Scope
- New `js/npc.js` or extend `js/main.js`
- `css/style.css` (NPC styling)

### Acceptance Criteria
1. 5-10 NPCs appear on grid with basic AI (random movement, scavenge)
2. Player can encounter NPCs; dialog choices appear
3. Moral choice tracked (selfish vs altruistic score)
4. Selfish: food rots faster, NPCs hostile
5. Altruistic: subtle RNG bonuses, NPC rescue events

### File/Delta Budget
- 2 files
- ~450 net lines

---

## Packet P6: Story Chapters & Endings
**Purpose**: Chapter triggers, narrative events, multi-ending logic.

### Read Scope
- All prior files, legacy task file Sections 六, 七

### Write Scope
- New `js/story.js` or extend main files

### Acceptance Criteria
1. Chapters trigger based on day count and conditions
2. Narrative text overlays appear at chapter transitions
3. Game tracks ending conditions
4. At least 3 of 5 endings achievable
5. End screen shows which ending was reached

### File/Delta Budget
- 1-2 files
- ~400 net lines

---

## Recommended First Execution: P1

P1 is the only packet ready for immediate execution. P2-P6 should be re-planned after P1 lands and tests pass, as implementation details may shift.
