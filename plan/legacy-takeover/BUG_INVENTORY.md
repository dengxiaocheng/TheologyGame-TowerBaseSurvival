# Bug Inventory — 塔底生存指南

## Severity: BLOCKER (game will not start)

| ID | Bug | Evidence | Owner | Repro |
|---|---|---|---|---|
| B01 | Missing `index.html` — no game entry point | `ls index.html` → not found | Execution Worker P1 | `node test.mjs` → Fatal: net::ERR_FILE_NOT_FOUND |
| B02 | `js/main.js` is empty — no game logic | File contains only `// Game entry point` | Execution Worker P1 | Any browser load shows blank page |
| B03 | No CSS — no mobile layout, no viewport meta | No `.css` files exist | Execution Worker P1 | Test checks for 44px touch targets → fails |

## Severity: HIGH (core features missing)

| ID | Bug | Evidence | Owner | Repro |
|---|---|---|---|---|
| B04 | No game grid / cellular automata | Design doc Section 一; no implementation | Execution Worker P2+ | No grid rendered |
| B05 | No player entity or movement | No player model in code | Execution Worker P2 | No character on screen |
| B06 | No health system | Design doc Section 五; no implementation | Execution Worker P2 | No status bars |
| B07 | No item/inventory system | Design doc Section 二; no implementation | Execution Worker P3 | No inventory UI |
| B08 | No crafting system | Design doc Section 二; no implementation | Execution Worker P3 | No crafting UI |
| B09 | No NPC system | Design doc Section 四; no implementation | Execution Worker P5 | No NPCs |
| B10 | No morality system | Design doc Section 三; no implementation | Execution Worker P5 | No moral tracking |

## Severity: MEDIUM (secondary features missing)

| ID | Bug | Evidence | Owner | Repro |
|---|---|---|---|---|
| B11 | No chapter/story system | Design doc Section 六; no implementation | Execution Worker P6 | No narrative events |
| B12 | No multi-ending logic | Design doc Section 七; no implementation | Execution Worker P6 | No endings |
| B13 | No weather system | Design doc UI spec mentions weather | Execution Worker P4 | No weather display |
| B14 | No day/night cycle | Top bar shows "天数" per design doc | Execution Worker P2 | No day counter |

## Test Evidence Summary

- `test.mjs`: Playwright test exists but **will fail immediately** because `index.html` is missing.
- Test checks: load without JS errors ✓(N/A), game area found ✗, touch OK ✗, touch targets ≥ 44px ✗, no overflow ✗.
- No other test infrastructure exists.

## Assessment

This is not a "buggy game" — it is an **unimplemented game**. All items above are missing features rather than regression bugs. The first execution packet must establish the bootable skeleton before any gameplay testing is possible.
