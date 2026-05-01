# Risk Register — 塔底生存指南

## R01: Scope-vs-Budget Mismatch (CRITICAL)

**Risk**: The design document specifies 7 major systems and targets 10000+ lines. Each execution cycle allows 4 files / 500 lines. Full implementation requires ~20 cycles minimum.

**Impact**: Manager may expect faster progress; workers may over-scope single packets.

**Mitigation**: Each packet is strictly scoped to one vertical slice. Manager must approve scope expectations before execution begins.

**Decision needed**: Confirm long-horizon incremental delivery approach (Option A) vs reduced-scope mini-game (Option B).

---

## R02: No Test Infrastructure Validation

**Risk**: `test.mjs` depends on Playwright (`chromium` import). It has never been run. The test environment may not have Playwright installed.

**Impact**: P1 acceptance criteria depend on `node test.mjs` passing. If Playwright is not available, P1 cannot validate.

**Mitigation**: First execution worker should verify `npx playwright install chromium` works, or provide a fallback manual validation checklist.

**Decision needed**: Manager to confirm Playwright availability in execution environment.

---

## R03: Design Doc Ambiguity — "10000 Lines" Target

**Risk**: The legacy task file states code must reach 10000 lines before outputting `<<<DONE>>>`. At 500 lines/cycle, this is a 20-cycle commitment minimum.

**Impact**: Workers may pad code to hit line counts rather than implement meaningful features.

**Mitigation**: Track functional completeness against design doc sections, not raw line count. Line count is a proxy, not a goal.

**Decision needed**: Manager to confirm whether 10000-line target is a hard requirement or a guideline for completeness.

---

## R04: No Existing Game Architecture

**Risk**: With `js/main.js` empty, the first execution worker must make foundational architecture decisions (module structure, state management, rendering approach) that all future workers depend on.

**Impact**: Poor early decisions compound across 20+ cycles. Refactoring is expensive.

**Mitigation**: P1 implementation should follow a simple, extensible pattern:
- Single `Game` state object
- Canvas-based rendering (matches design doc "网格地图")
- Event-driven updates (touch → action → state change → re-render)
- Modular function layout for future extraction into separate files

---

## R05: Mobile Touch Interaction Complexity

**Risk**: The design doc requires all interaction via touch with targets ≥ 44px. The grid (40x30 cells) on a 375px screen means cells are ~9px wide — far below touch target minimum.

**Impact**: Direct cell-tapping is impossible at full grid zoom. Need zoom/pan or alternative interaction model.

**Mitigation**: P1 should implement a viewport system: render grid at higher zoom level, allow drag-to-pan and pinch-to-zoom. Alternatively, show a local 10x10 viewport centered on player, with tap-to-move on adjacent cells only.

**Decision needed**: Manager to confirm preferred interaction model for grid navigation.

---

## R06: Unattended Worker Environment Constraints

**Risk**: Execution workers run unattended. If a packet fails validation, there is no interactive debugging.

**Impact**: Failed packets waste a cycle. Recovery requires manager intervention.

**Mitigation**: Each packet includes explicit acceptance criteria testable via `node test.mjs` plus a manual checklist. Workers must run tests before reporting completion.

---

## Items Requiring Manager Decision

1. **Scope confirmation**: Option A (incremental, ~20 cycles) vs Option B (reduced mini-game, ~4 cycles)?
2. **Playwright availability**: Is `playwright` installed in the execution environment?
3. **Grid interaction model**: Zoom/pan vs local viewport vs tap-adjacent-only?
4. **10000-line target**: Hard requirement or completeness guideline?
