# Legacy Fix Plan — 塔底生存指南 (Survival at the Base)

## Current State Summary

The project has **zero playable implementation**. The design doc specifies an ambitious survival game with cellular automata, hundreds of items, NPC communities, 8 chapters, and multiple endings. What exists:

| Artifact | Status |
|---|---|
| `index.html` | Missing — game cannot load |
| `js/main.js` | Empty (1 comment line) |
| CSS files | None |
| `test.mjs` | Playwright test suite; will fail immediately (no HTML) |
| Design doc | 10000+ line target; 7 major systems specified |

## Repair Strategy

Given the 4-file / 500-line budget per execution cycle, we take an **incremental vertical-slice** approach. Each execution packet delivers one playable, testable slice of the game, starting with the minimum that makes `test.mjs` pass.

### Phase 1 — Bootable Skeleton (Priority: CRITICAL)
Get a playable HTML page loading in a mobile browser with basic grid rendering. This makes the test suite pass (no JS errors, game area found, touch works, no overflow).

**Scope**: `index.html` (new), `js/main.js` (rewrite), `css/style.css` (new)
**Deliverables**: Grid map renders, touch targets ≥ 44px, no JS errors, viewport configured.

### Phase 2 — Core Game Loop
Add player movement on grid, basic health bars (hunger/thirst), day/night cycle counter, and action bar at bottom.

### Phase 3 — Item & Crafting Foundation
Item data model, inventory panel, basic crafting (2-3 recipes), item pickup from grid cells.

### Phase 4 — Environment Simulation
Cellular automata rules (fire spread, water flow, rot), grid state evolution per turn.

### Phase 5 — NPC & Morality
NPC entities on grid, basic AI (move/scavenge), moral-choice tracking, hidden RNG modifiers.

### Phase 6 — Story Chapters & Endings
Chapter trigger system, narrative events, multi-ending logic.

## Stop Conditions

Each execution packet stops when:
1. `node test.mjs` passes (no JS errors, game area found, touch OK, no overflow)
2. The packet's specific acceptance criteria are met
3. File count ≤ 4, net lines ≤ 500

## Scope-vs-Budget Reality

The design doc targets 10000+ lines across 7 major systems. At 500 lines per execution cycle, full implementation requires ~20 cycles. The planner recommends the manager confirm whether to:
- (A) Continue incremental delivery across many cycles, or
- (B) Reduce scope to a self-contained mini-game (~2000 lines)

**Direction**: Recommend (A) — incremental vertical slices, each testable. First 2-3 packets focus on bootable core; later packets layer systems.
