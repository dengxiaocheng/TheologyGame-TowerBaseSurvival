// Game entry point — Tower Base Survival / 塔底生存指南
(function () {
  'use strict';

  var canvas = document.getElementById('game-canvas');
  var ctx = canvas ? canvas.getContext('2d') : null;

  var state = {
    hp: 100,
    hunger: 80,
    thirst: 80,
    day: 1,
    running: false
  };

  function drawGrid() {
    if (!ctx) return;
    var w = canvas.width;
    var h = canvas.height;
    var cols = 10;
    var rows = 14;
    var cw = w / cols;
    var ch = h / rows;

    ctx.fillStyle = '#16213e';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = '#0f3460';
    ctx.lineWidth = 0.5;
    for (var c = 0; c <= cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * cw, 0);
      ctx.lineTo(c * cw, h);
      ctx.stroke();
    }
    for (var r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * ch);
      ctx.lineTo(w, r * ch);
      ctx.stroke();
    }

    // Draw player marker at center
    var px = Math.floor(cols / 2);
    var py = Math.floor(rows / 2);
    ctx.fillStyle = '#e94560';
    ctx.fillRect(px * cw + 2, py * ch + 2, cw - 4, ch - 4);
  }

  function updateStatusUI() {
    var hpEl = document.getElementById('status-hp');
    var hungerEl = document.getElementById('status-hunger');
    var thirstEl = document.getElementById('status-thirst');
    var dayEl = document.getElementById('status-day');
    if (hpEl) hpEl.textContent = '\u2764 ' + state.hp;
    if (hungerEl) hungerEl.textContent = '\uD83C\uDF5E ' + state.hunger;
    if (thirstEl) thirstEl.textContent = '\uD83D\uDCA7 ' + state.thirst;
    if (dayEl) dayEl.textContent = 'Day ' + state.day;
  }

  function tick() {
    state.hunger = Math.max(0, state.hunger - 1);
    state.thirst = Math.max(0, state.thirst - 1);
    if (state.hunger <= 0 || state.thirst <= 0) {
      state.hp = Math.max(0, state.hp - 2);
    }
    state.day++;
    updateStatusUI();
    drawGrid();
  }

  function bindButtons() {
    var exploreBtn = document.getElementById('btn-explore');
    var restBtn = document.getElementById('btn-rest');
    var scavengeBtn = document.getElementById('btn-scavenge');

    if (exploreBtn) {
      exploreBtn.addEventListener('click', function () {
        state.hunger = Math.max(0, state.hunger - 3);
        state.thirst = Math.max(0, state.thirst - 2);
        tick();
      });
    }
    if (restBtn) {
      restBtn.addEventListener('click', function () {
        state.hp = Math.min(100, state.hp + 5);
        state.hunger = Math.max(0, state.hunger - 1);
        tick();
      });
    }
    if (scavengeBtn) {
      scavengeBtn.addEventListener('click', function () {
        state.hunger = Math.min(100, state.hunger + 10);
        state.thirst = Math.min(100, state.thirst + 10);
        state.hunger = Math.max(0, state.hunger - 2);
        tick();
      });
    }
  }

  function init() {
    drawGrid();
    bindButtons();
    updateStatusUI();
    state.running = true;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
