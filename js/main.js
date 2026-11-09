/**
 * main.js - Core Game Controller, State, Drag/Tap Interactions & Matching Engine
 */

import { GOODS_TYPES, getGoodById } from './items.js';
import { LEVELS, getLevelConfig } from './levels.js';
import { audio } from './audio.js';
import { particles } from './particles.js';

class GoodsMatchGame {
  constructor() {
    this.currentLevel = 1;
    this.score = 0;
    this.timeLeft = 0;
    this.timerInterval = null;
    this.isPaused = false;
    this.isGameOver = false;
    this.gameStarted = false;

    // Board representation:
    // array of Shelves, each Shelf has 3 slots: [slot0, slot1, slot2]
    // each slot is an array of item objects (stack): [topItem (layer 0), behindItem (layer 1), ...]
    this.shelves = [];
    this.initialShelves = null; // Stored snapshot of the level's starting layout
    this.levelScoreAtStart = 0;

    // Interaction state
    this.selectedItem = null; // { shelfIdx, slotIdx, item }
    this.draggedItem = null;
    this.dragStartPos = { x: 0, y: 0 };
    this.activePointerId = null;

    // Undo stack: stores history snapshots
    this.history = [];
    this.boosters = {
      undo: 3,
      hint: 3,
      shuffle: 2
    };

    this.comboCount = 0;
    this.lastMatchTime = 0;

    // DOM Elements
    this.dom = {
      shelvesContainer: document.getElementById('shelves-container'),
      levelDisplay: document.getElementById('level-display'),
      timerDisplay: document.getElementById('timer-display'),
      timerBadge: document.getElementById('timer-badge'),
      scoreDisplay: document.getElementById('score-display'),
      dragGhost: document.getElementById('drag-ghost'),
      toastBanner: document.getElementById('toast-banner'),
      // Buttons
      btnMenu: document.getElementById('btn-menu'),
      btnSound: document.getElementById('btn-sound'),
      soundIconOn: document.getElementById('sound-icon-on'),
      soundIconOff: document.getElementById('sound-icon-off'),
      btnUndo: document.getElementById('btn-undo'),
      undoCount: document.getElementById('undo-count'),
      btnHint: document.getElementById('btn-hint'),
      hintCount: document.getElementById('hint-count'),
      btnShuffle: document.getElementById('btn-shuffle'),
      shuffleCount: document.getElementById('shuffle-count'),
      btnRestart: document.getElementById('btn-restart'),
      // Start Screen
      modalStart: document.getElementById('modal-start'),
      startLevelNum: document.getElementById('start-level-num'),
      startLevelTitle: document.getElementById('start-level-title'),
      btnPlayStart: document.getElementById('btn-play-start'),
      btnStartSelectLevel: document.getElementById('btn-start-select-level'),
      // Win & Game Over Modals
      modalWin: document.getElementById('modal-win'),
      winStar1: document.getElementById('win-star-1'),
      winStar2: document.getElementById('win-star-2'),
      winStar3: document.getElementById('win-star-3'),
      winScoreVal: document.getElementById('win-score-val'),
      winTimeVal: document.getElementById('win-time-val'),
      winTotalVal: document.getElementById('win-total-val'),
      btnNextLevel: document.getElementById('btn-next-level'),
      btnWinReplay: document.getElementById('btn-win-replay'),
      modalGameOver: document.getElementById('modal-gameover'),
      btnRetry: document.getElementById('btn-retry'),
      btnLoseMenu: document.getElementById('btn-lose-menu'),
      modalDeadlock: document.getElementById('modal-deadlock'),
      btnDeadlockUndo: document.getElementById('btn-deadlock-undo'),
      btnDeadlockShuffle: document.getElementById('btn-deadlock-shuffle'),
      modalLevels: document.getElementById('modal-levels'),
      btnCloseLevels: document.getElementById('btn-close-levels'),
      levelsGrid: document.getElementById('levels-grid')
    };

    this.init();
  }

  init() {
    this.loadProgress();
    this.bindEvents();
    this.showStartScreen();
  }

  loadProgress() {
    try {
      const savedLevel = localStorage.getItem('gm_level');
      if (savedLevel) this.currentLevel = parseInt(savedLevel, 10);
      const savedScore = localStorage.getItem('gm_score');
      if (savedScore) this.score = parseInt(savedScore, 10);
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
  }

  saveProgress() {
    try {
      localStorage.setItem('gm_level', this.currentLevel.toString());
      localStorage.setItem('gm_score', this.score.toString());
    } catch (e) {
      console.warn('Storage save failed', e);
    }
  }

  showStartScreen() {
    const config = getLevelConfig(this.currentLevel);
    this.dom.startLevelNum.textContent = this.currentLevel;
    this.dom.startLevelTitle.textContent = config.title;
    this.dom.modalStart.classList.remove('hidden');

    // Prepare shelves in background preview
    this.prepareShelvesPreview(config);
  }

  prepareShelvesPreview(config) {
    this.dom.levelDisplay.textContent = this.currentLevel;
    this.dom.scoreDisplay.textContent = this.score;
    this.timeLeft = config.timeLimit;
    this.updateTimerDisplay();
    this.generateShelves(config);
    this.renderShelves();
  }

  bindEvents() {
    // Start Screen Play Button
    this.dom.btnPlayStart.addEventListener('click', () => {
      audio.ensureContext();
      audio.playPickup();
      this.dom.modalStart.classList.add('hidden');
      this.gameStarted = true;
      this.startLevel(this.currentLevel);
    });

    this.dom.btnStartSelectLevel.addEventListener('click', () => {
      this.openLevelsModal();
    });

    // Sound toggle
    this.dom.btnSound.addEventListener('click', () => {
      const on = audio.toggleSound();
      this.dom.soundIconOn.classList.toggle('hidden', !on);
      this.dom.soundIconOff.classList.toggle('hidden', on);
    });

    // Boosters
    this.dom.btnUndo.addEventListener('click', () => this.handleUndo());
    this.dom.btnHint.addEventListener('click', () => this.handleHint());
    this.dom.btnShuffle.addEventListener('click', () => this.handleShuffle());
    this.dom.btnRestart.addEventListener('click', () => this.resetLevel());

    // Modals
    this.dom.btnNextLevel.addEventListener('click', () => {
      this.dom.modalWin.classList.add('hidden');
      this.startLevel(this.currentLevel + 1);
    });
    this.dom.btnWinReplay.addEventListener('click', () => {
      this.dom.modalWin.classList.add('hidden');
      this.resetLevel();
    });
    this.dom.btnRetry.addEventListener('click', () => {
      this.dom.modalGameOver.classList.add('hidden');
      this.resetLevel();
    });
    this.dom.btnLoseMenu.addEventListener('click', () => {
      this.dom.modalGameOver.classList.add('hidden');
      this.openLevelsModal();
    });

    this.dom.btnMenu.addEventListener('click', () => this.openLevelsModal());
    this.dom.btnCloseLevels.addEventListener('click', () => this.dom.modalLevels.classList.add('hidden'));

    // Deadlock Modal actions
    if (this.dom.btnDeadlockUndo) {
      this.dom.btnDeadlockUndo.addEventListener('click', () => {
        this.dom.modalDeadlock.classList.add('hidden');
        if (this.history.length > 0) this.handleUndo();
        else this.resetLevel();
      });
    }
    if (this.dom.btnDeadlockShuffle) {
      this.dom.btnDeadlockShuffle.addEventListener('click', () => {
        this.dom.modalDeadlock.classList.add('hidden');
        this.boosters.shuffle = Math.max(1, this.boosters.shuffle);
        this.handleShuffle();
      });
    }

    // Global pointer events for drag & drop
    window.addEventListener('pointermove', (e) => this.onPointerMove(e));
    window.addEventListener('pointerup', (e) => this.onPointerUp(e));
    window.addEventListener('pointercancel', (e) => this.onPointerUp(e));
  }

  // =========================================================================
  // Level Initialization & Puzzle Generation
  // =========================================================================
  startLevel(lvlNum) {
    this.currentLevel = lvlNum;
    this.saveProgress();
    const config = getLevelConfig(lvlNum);

    this.levelScoreAtStart = this.score;
    this.dom.levelDisplay.textContent = this.currentLevel;
    this.dom.scoreDisplay.textContent = this.score;

    this.history = [];
    this.selectedItem = null;
    this.draggedItem = null;
    this.isGameOver = false;
    this.gameStarted = true;

    // Reset Boosters
    this.boosters.undo = 3;
    this.boosters.hint = 3;
    this.boosters.shuffle = 2;
    this.updateBoosterUI();

    // Start Timer
    this.timeLeft = config.timeLimit;
    this.startTimer();

    // Generate puzzle shelves & save pristine initial snapshot
    this.generateShelves(config);
    this.initialShelves = JSON.parse(JSON.stringify(this.shelves));
    this.renderShelves();
    this.showToast(`Level ${this.currentLevel}: ${config.title}`);
  }

  // Resets the exact same puzzle layout back to its starting state
  resetLevel() {
    if (!this.initialShelves) {
      this.startLevel(this.currentLevel);
      return;
    }

    const config = getLevelConfig(this.currentLevel);

    // Restore starting score for this level attempt
    this.score = this.levelScoreAtStart;
    this.dom.scoreDisplay.textContent = this.score;

    // Reset state & restore pristine shelves layout
    this.history = [];
    this.clearSelection();
    this.draggedItem = null;
    this.isGameOver = false;
    this.gameStarted = true;

    // Replenish boosters
    this.boosters.undo = 3;
    this.boosters.hint = 3;
    this.boosters.shuffle = 2;
    this.updateBoosterUI();

    // Reset timer to full limit
    this.timeLeft = config.timeLimit;
    this.startTimer();

    // Deep copy initial layout back into active shelves
    this.shelves = JSON.parse(JSON.stringify(this.initialShelves));
    this.renderShelves();
    audio.playDrop();
    this.showToast('Level Reset to Beginning ↺');
  }

  startTimer() {
    clearInterval(this.timerInterval);
    this.updateTimerDisplay();
    this.dom.timerBadge.classList.remove('warning');

    this.timerInterval = setInterval(() => {
      if (this.isPaused || this.isGameOver || !this.gameStarted) return;
      this.timeLeft--;
      this.updateTimerDisplay();

      if (this.timeLeft <= 20) {
        this.dom.timerBadge.classList.add('warning');
      }

      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.handleTimeout();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const mins = Math.floor(Math.max(0, this.timeLeft) / 60);
    const secs = Math.max(0, this.timeLeft) % 60;
    this.dom.timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  updateBoosterUI() {
    this.dom.undoCount.textContent = this.boosters.undo;
    this.dom.hintCount.textContent = this.boosters.hint;
    this.dom.shuffleCount.textContent = this.boosters.shuffle;
    this.dom.btnUndo.disabled = this.boosters.undo <= 0 || this.history.length === 0;
    this.dom.btnHint.disabled = this.boosters.hint <= 0;
    this.dom.btnShuffle.disabled = this.boosters.shuffle <= 0;
  }

  // Build a randomized, solvable multi-layer goods board
  generateShelves(config) {
    // If the level has a handcrafted authentic layout, use it!
    if (config.layout) {
      this.shelves = config.layout.map(shelf => {
        return shelf.map(slot => {
          return slot.map(itemId => ({
            id: itemId,
            uid: `${itemId}_${Math.random().toString(36).substr(2, 6)}`
          }));
        });
      });
      return;
    }

    const numShelves = config.shelves;
    const itemPool = config.items;
    const depthLimit = config.depth || 3;
    const freeSlotsCount = Math.max(2, Math.min(3, Math.floor(numShelves * 0.5)));

    // Backward construction algorithm: ensures guaranteed solvability
    this.shelves = [];
    for (let s = 0; s < numShelves; s++) {
      this.shelves.push([[], [], []]);
    }

    // Pick reserved open slots
    const allSlotIndices = [];
    for (let s = 0; s < numShelves; s++) {
      for (let sl = 0; sl < 3; sl++) {
        allSlotIndices.push({ s, sl });
      }
    }
    allSlotIndices.sort(() => Math.random() - 0.5);
    const reservedOpen = allSlotIndices.slice(0, freeSlotsCount);

    const isReserved = (s, sl) => reservedOpen.some(r => r.s === s && r.sl === sl);

    // Place triplets from bottom layer (last cleared) to top layer (first cleared)
    for (let i = 0; i < itemPool.length; i++) {
      const id = itemPool[i];

      const eligibleShelves = [];
      for (let s = 0; s < numShelves; s++) {
        let canFit = 0;
        for (let sl = 0; sl < 3; sl++) {
          if (!isReserved(s, sl) && this.shelves[s][sl].length < depthLimit) {
            canFit++;
          }
        }
        if (canFit >= 2) eligibleShelves.push(s);
      }

      const sTarget = eligibleShelves.length > 0
        ? eligibleShelves[Math.floor(Math.random() * eligibleShelves.length)]
        : Math.floor(Math.random() * numShelves);

      let placed = 0;
      for (let sl = 0; sl < 3 && placed < 3; sl++) {
        if (!isReserved(sTarget, sl)) {
          this.shelves[sTarget][sl].unshift({ id, uid: `${id}_${Math.random().toString(36).substr(2, 6)}` });
          placed++;
        }
      }

      while (placed < 3) {
        for (let s = 0; s < numShelves && placed < 3; s++) {
          for (let sl = 0; sl < 3 && placed < 3; sl++) {
            if (!isReserved(s, sl) && this.shelves[s][sl].length < depthLimit) {
              this.shelves[s][sl].unshift({ id, uid: `${id}_${Math.random().toString(36).substr(2, 6)}` });
              placed++;
            }
          }
        }
      }

      // Scatter 1 item to an open slot
      const emptySlots = [];
      for (let s = 0; s < numShelves; s++) {
        for (let sl = 0; sl < 3; sl++) {
          if (!isReserved(s, sl) && this.shelves[s][sl].length === 0) {
            emptySlots.push({ s, sl });
          }
        }
      }

      if (emptySlots.length > 0 && this.shelves[sTarget][0].length > 0) {
        const moved = this.shelves[sTarget][0].shift();
        const pick = emptySlots[Math.floor(Math.random() * emptySlots.length)];
        this.shelves[pick.s][pick.sl].unshift(moved);
      }
    }

    this.preventInitialMatches();
  }

  preventInitialMatches() {
    this.shelves.forEach((shelf, sIdx) => {
      const frontItems = shelf.map(st => st.length > 0 ? st[0].id : null);
      if (frontItems[0] && frontItems[0] === frontItems[1] && frontItems[1] === frontItems[2]) {
        for (let otherS = 0; otherS < this.shelves.length; otherS++) {
          if (otherS !== sIdx && this.shelves[otherS][0].length > 0 && this.shelves[otherS][0][0].id !== frontItems[0]) {
            const temp = shelf[2][0];
            shelf[2][0] = this.shelves[otherS][0][0];
            this.shelves[otherS][0][0] = temp;
            break;
          }
        }
      }
    });
  }

  // =========================================================================
  // DOM Rendering
  // =========================================================================
  renderShelves() {
    this.dom.shelvesContainer.innerHTML = '';

    this.shelves.forEach((shelf, shelfIdx) => {
      const shelfUnit = document.createElement('div');
      shelfUnit.className = 'shelf-unit';
      shelfUnit.dataset.shelf = shelfIdx;

      // Wooden base plank
      const plank = document.createElement('div');
      plank.className = 'shelf-plank';
      shelfUnit.appendChild(plank);

      const slotsContainer = document.createElement('div');
      slotsContainer.className = 'shelf-slots';

      shelf.forEach((slotStack, slotIdx) => {
        const slotEl = document.createElement('div');
        slotEl.className = 'shelf-slot';
        if (slotStack.length === 0) {
          slotEl.classList.add('is-open');
        }
        slotEl.dataset.shelf = shelfIdx;
        slotEl.dataset.slot = slotIdx;

        // Render stacked items from back to front
        for (let layer = slotStack.length - 1; layer >= 0; layer--) {
          const itemData = slotStack[layer];
          const goodMeta = getGoodById(itemData.id);

          const itemEl = document.createElement('div');
          itemEl.className = `goods-item layer-${layer > 2 ? 'deep' : layer}`;
          itemEl.dataset.shelf = shelfIdx;
          itemEl.dataset.slot = slotIdx;
          itemEl.dataset.layer = layer;
          itemEl.dataset.uid = itemData.uid;
          itemEl.innerHTML = goodMeta.svg;

          // Only the frontmost item (layer === 0) is interactive!
          if (layer === 0) {
            itemEl.addEventListener('pointerdown', (e) => this.onItemPointerDown(e, shelfIdx, slotIdx, itemData));
          }

          slotEl.appendChild(itemEl);
        }

        // Tap slot to place selected item (only succeeds if open slot)
        slotEl.addEventListener('click', (e) => this.onSlotClick(shelfIdx, slotIdx));

        slotsContainer.appendChild(slotEl);
      });

      shelfUnit.appendChild(slotsContainer);
      this.dom.shelvesContainer.appendChild(shelfUnit);
    });

    this.updateBoosterUI();
  }

  // =========================================================================
  // Tap & Selection Interaction
  // =========================================================================
  onItemPointerDown(e, shelfIdx, slotIdx, itemData) {
    if (this.isGameOver || !this.gameStarted) return;
    audio.ensureContext();

    if (this.draggedItem) return;

    this.dragStartPos = { x: e.clientX, y: e.clientY };
    this.activePointerId = e.pointerId;

    this.draggedItem = {
      shelfIdx,
      slotIdx,
      itemData,
      element: e.currentTarget,
      isDragging: false
    };
  }

  onSlotClick(targetShelf, targetSlot) {
    if (!this.selectedItem || this.isGameOver || !this.gameStarted) return;

    const sourceShelf = this.selectedItem.shelfIdx;
    const sourceSlot = this.selectedItem.slotIdx;

    if (sourceShelf === targetShelf && sourceSlot === targetSlot) {
      this.clearSelection();
      return;
    }

    // Strict Rule: Target slot MUST be empty/open. Swapping is not allowed!
    const targetStack = this.shelves[targetShelf][targetSlot];
    if (targetStack.length > 0) {
      audio.playIllegal();
      this.showToast('You can only move to an open slot! Swapping is not allowed.');
      // Switch selection to tapped item if it has an item
      this.selectItem(targetShelf, targetSlot);
      return;
    }

    this.executeMove(sourceShelf, sourceSlot, targetShelf, targetSlot);
  }

  selectItem(shelfIdx, slotIdx) {
    this.clearSelection();
    this.selectedItem = { shelfIdx, slotIdx };

    const itemEl = this.getItemElement(shelfIdx, slotIdx, 0);
    if (itemEl) {
      itemEl.classList.add('selected');
      audio.playPickup();
    }
  }

  clearSelection() {
    if (this.selectedItem) {
      const itemEl = this.getItemElement(this.selectedItem.shelfIdx, this.selectedItem.slotIdx, 0);
      if (itemEl) itemEl.classList.remove('selected');
    }
    this.selectedItem = null;
    document.querySelectorAll('.hint-highlight').forEach(el => el.classList.remove('hint-highlight'));
  }

  // =========================================================================
  // Drag & Drop Handling
  // =========================================================================
  onPointerMove(e) {
    if (!this.draggedItem || !this.gameStarted) return;

    const dx = e.clientX - this.dragStartPos.x;
    const dy = e.clientY - this.dragStartPos.y;
    const dist = Math.hypot(dx, dy);

    if (!this.draggedItem.isDragging && dist > 8) {
      this.draggedItem.isDragging = true;
      this.clearSelection();

      const goodMeta = getGoodById(this.draggedItem.itemData.id);
      this.dom.dragGhost.innerHTML = goodMeta.svg;
      this.dom.dragGhost.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(1.12)`;
      this.dom.dragGhost.classList.remove('hidden');
      this.draggedItem.element.style.opacity = '0.35';
      audio.playPickup();
      if (navigator.vibrate) navigator.vibrate(12);
    }

    if (this.draggedItem.isDragging) {
      this.dom.dragGhost.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(1.12)`;

      this.updateHoverTarget(e.clientX, e.clientY);
    }
  }

  updateHoverTarget(x, y) {
    document.querySelectorAll('.shelf-slot').forEach(slot => {
      slot.classList.remove('drop-valid', 'drop-invalid');
    });

    const targetSlot = this.findSlotAtPoint(x, y);
    if (targetSlot) {
      const tShelf = parseInt(targetSlot.dataset.shelf, 10);
      const tSlot = parseInt(targetSlot.dataset.slot, 10);
      const isOccupied = this.shelves[tShelf][tSlot].length > 0;

      if (!isOccupied) {
        targetSlot.classList.add('drop-valid');
      } else {
        targetSlot.classList.add('drop-invalid');
      }
    }
  }

  findSlotAtPoint(x, y) {
    const el = document.elementFromPoint(x, y);
    if (!el) return null;
    return el.closest('.shelf-slot');
  }

  onPointerUp(e) {
    if (!this.draggedItem) return;

    const { shelfIdx, slotIdx, isDragging, element } = this.draggedItem;
    element.style.opacity = '1';
    this.dom.dragGhost.classList.add('hidden');
    document.querySelectorAll('.shelf-slot').forEach(slot => {
      slot.classList.remove('drop-valid', 'drop-invalid');
    });

    if (isDragging) {
      const targetSlotEl = this.findSlotAtPoint(e.clientX, e.clientY);
      if (targetSlotEl) {
        const targetShelf = parseInt(targetSlotEl.dataset.shelf, 10);
        const targetSlot = parseInt(targetSlotEl.dataset.slot, 10);

        if (targetShelf !== shelfIdx || targetSlot !== slotIdx) {
          const tgtStack = this.shelves[targetShelf][targetSlot];
          // STRICT RULE: Can only move to an open/empty slot!
          if (tgtStack.length === 0) {
            this.executeMove(shelfIdx, slotIdx, targetShelf, targetSlot);
          } else {
            audio.playIllegal();
            this.showToast('You can only move to an open slot! Swapping is not allowed.');
          }
        }
      }
    } else {
      // Tap selection
      if (this.selectedItem && this.selectedItem.shelfIdx === shelfIdx && this.selectedItem.slotIdx === slotIdx) {
        this.clearSelection();
      } else {
        this.selectItem(shelfIdx, slotIdx);
      }
    }

    this.draggedItem = null;
    this.activePointerId = null;
  }

  // =========================================================================
  // Movement & Matching Rules
  // =========================================================================
  executeMove(sourceShelf, sourceSlot, targetShelf, targetSlot) {
    const srcStack = this.shelves[sourceShelf][sourceSlot];
    const tgtStack = this.shelves[targetShelf][targetSlot];

    if (srcStack.length === 0) return;

    // Strict Rule Check: Target MUST be an empty slot
    if (tgtStack.length > 0) {
      audio.playIllegal();
      this.showToast('You can only move to an open slot! Swapping is not allowed.');
      this.clearSelection();
      return;
    }

    // Save snapshot for Undo
    this.saveSnapshot();

    // Move top item into the open slot
    const movingItem = srcStack.shift();
    tgtStack.unshift(movingItem);

    audio.playDrop();
    if (navigator.vibrate) navigator.vibrate(15);
    this.clearSelection();

    // Re-render and trigger matching check
    this.renderShelves();
    this.checkMatches();
  }

  saveSnapshot() {
    const snapshot = JSON.parse(JSON.stringify(this.shelves));
    this.history.push(snapshot);
    if (this.history.length > 20) this.history.shift();
    this.updateBoosterUI();
  }

  handleUndo() {
    if (this.boosters.undo <= 0 || this.history.length === 0) {
      audio.playIllegal();
      return;
    }

    this.boosters.undo--;
    this.shelves = this.history.pop();
    this.clearSelection();
    audio.playPickup();
    this.renderShelves();
    this.showToast('Move Undone');
  }

  handleHint() {
    if (this.boosters.hint <= 0) {
      audio.playIllegal();
      return;
    }

    let hintPair = this.findBestHint();

    if (hintPair) {
      this.boosters.hint--;
      audio.playPickup();
      this.highlightItem(hintPair.srcShelf, hintPair.srcSlot);
      this.highlightItem(hintPair.tgtShelf, hintPair.tgtSlot);
      this.showToast(`Match hint: Move ${getGoodById(hintPair.item).name} to open slot!`);
      this.updateBoosterUI();
    } else {
      this.showToast('No immediate open-slot match found, try shuffling!');
      audio.playIllegal();
    }
  }

  findBestHint() {
    // Look for shelves that have 2 matching front items AND an open slot on the same shelf
    for (let s = 0; s < this.shelves.length; s++) {
      const shelf = this.shelves[s];
      const counts = {};
      let emptySlotIdx = -1;

      shelf.forEach((st, idx) => {
        if (st.length > 0) {
          const id = st[0].id;
          counts[id] = (counts[id] || 0) + 1;
        } else {
          emptySlotIdx = idx;
        }
      });

      // If shelf has an open slot and 2 matching items
      if (emptySlotIdx !== -1) {
        for (const [id, count] of Object.entries(counts)) {
          if (count === 2) {
            // Locate the 3rd matching item on another shelf
            for (let otherS = 0; otherS < this.shelves.length; otherS++) {
              if (otherS !== s) {
                for (let otherSlot = 0; otherSlot < 3; otherSlot++) {
                  const stack = this.shelves[otherS][otherSlot];
                  if (stack.length > 0 && stack[0].id === id) {
                    return {
                      item: id,
                      srcShelf: otherS,
                      srcSlot: otherSlot,
                      tgtShelf: s,
                      tgtSlot: emptySlotIdx
                    };
                  }
                }
              }
            }
          }
        }
      }
    }

    // Fallback: Locate any open slot and matching item elsewhere
    for (let s = 0; s < this.shelves.length; s++) {
      for (let slot = 0; slot < 3; slot++) {
        if (this.shelves[s][slot].length === 0) {
          // Find any shelf with 1 item matching another
          for (let s2 = 0; s2 < this.shelves.length; s2++) {
            for (let slot2 = 0; slot2 < 3; slot2++) {
              if (this.shelves[s2][slot2].length > 0) {
                return {
                  item: this.shelves[s2][slot2][0].id,
                  srcShelf: s2,
                  srcSlot: slot2,
                  tgtShelf: s,
                  tgtSlot: slot
                };
              }
            }
          }
        }
      }
    }

    return null;
  }

  highlightItem(shelfIdx, slotIdx) {
    const el = this.getItemElement(shelfIdx, slotIdx, 0);
    if (el) el.classList.add('hint-highlight');
  }

  handleShuffle() {
    if (this.boosters.shuffle <= 0) {
      audio.playIllegal();
      return;
    }

    this.boosters.shuffle--;
    this.saveSnapshot();

    // Gather all front items
    let frontItems = [];
    this.shelves.forEach(shelf => {
      shelf.forEach(st => {
        if (st.length > 0) {
          frontItems.push(st.shift());
        }
      });
    });

    // Shuffle them
    for (let i = frontItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [frontItems[i], frontItems[j]] = [frontItems[j], frontItems[i]];
    }

    // Place back
    this.shelves.forEach(shelf => {
      shelf.forEach(st => {
        if (frontItems.length > 0) {
          st.unshift(frontItems.pop());
        }
      });
    });

    audio.playWin();
    this.clearSelection();
    this.renderShelves();
    this.showToast('Shelves Shuffled! 🔀');
    this.checkMatches();
  }

  // =========================================================================
  // Triple-Match Clearance Logic
  // =========================================================================
  checkMatches() {
    let matchedAny = false;

    this.shelves.forEach((shelf, shelfIdx) => {
      const slot0 = shelf[0][0];
      const slot1 = shelf[1][0];
      const slot2 = shelf[2][0];

      if (slot0 && slot1 && slot2 && slot0.id === slot1.id && slot1.id === slot2.id) {
        matchedAny = true;
        this.clearTripleMatch(shelfIdx, slot0.id);
      }
    });

    if (!matchedAny) {
      this.checkWinCondition();
    }
  }

  clearTripleMatch(shelfIdx, itemId) {
    const goodMeta = getGoodById(itemId);

    // Combo system: if matched within 4 seconds of last match, escalate combo!
    const now = performance.now();
    if (now - this.lastMatchTime < 4000) {
      this.comboCount++;
    } else {
      this.comboCount = 1;
    }
    this.lastMatchTime = now;

    audio.playMatch(this.comboCount);

    // Haptic feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate([25, 30, 45]);
    }

    const basePoints = 300;
    const comboBonus = (this.comboCount - 1) * 150;
    const pointsAwarded = basePoints + comboBonus;
    this.score += pointsAwarded;
    this.dom.scoreDisplay.textContent = `$${this.score}`;

    // Shake shelf
    const shelfUnit = this.dom.shelvesContainer.querySelector(`.shelf-unit[data-shelf="${shelfIdx}"]`);
    if (shelfUnit) {
      shelfUnit.classList.remove('shelf-shake');
      void shelfUnit.offsetWidth; // re-flow
      shelfUnit.classList.add('shelf-shake');
    }

    // Trigger visual pop animation on the 3 items
    for (let slot = 0; slot < 3; slot++) {
      const itemEl = this.getItemElement(shelfIdx, slot, 0);
      if (itemEl) {
        itemEl.classList.add('match-clear');
        const rect = itemEl.getBoundingClientRect();
        particles.emit(rect.left + rect.width / 2, rect.top + rect.height / 2, goodMeta.color, 24);
      }
    }

    // Spawn combo floating toast
    if (this.comboCount > 1) {
      this.spawnFloatingCombo(`COMBO x${this.comboCount}! +$${pointsAwarded}`);
    } else {
      this.showToast(`Packed 3x ${goodMeta.name}! +$${pointsAwarded}`);
    }

    setTimeout(() => {
      for (let slot = 0; slot < 3; slot++) {
        this.shelves[shelfIdx][slot].shift();
      }
      this.renderShelves();
      this.checkMatches();
    }, 420);
  }

  spawnFloatingCombo(text) {
    const pill = document.createElement('div');
    pill.className = 'floating-combo';
    pill.textContent = text;
    document.getElementById('game-app').appendChild(pill);
    setTimeout(() => pill.remove(), 1250);
  }

  checkWinCondition() {
    let totalRemaining = 0;
    this.shelves.forEach(shelf => {
      shelf.forEach(slot => {
        totalRemaining += slot.length;
      });
    });

    if (totalRemaining === 0) {
      this.handleLevelWin();
    } else {
      // Check for deadlock (no open slots left and no match available)
      this.checkDeadlock();
    }
  }

  checkDeadlock() {
    // If there is at least one open slot, game can continue
    let openSlotCount = 0;
    this.shelves.forEach(shelf => {
      shelf.forEach(slot => {
        if (slot.length === 0) openSlotCount++;
      });
    });

    if (openSlotCount === 0) {
      // Check if any shelf has an immediate match of 3
      let hasImmediateMatch = false;
      this.shelves.forEach(shelf => {
        if (shelf[0].length > 0 && shelf[1].length > 0 && shelf[2].length > 0 &&
            shelf[0][0].id === shelf[1][0].id && shelf[1][0].id === shelf[2][0].id) {
          hasImmediateMatch = true;
        }
      });

      if (!hasImmediateMatch && !this.isGameOver) {
        // Deadlock detected! Prompt player
        audio.playIllegal();
        setTimeout(() => {
          this.dom.modalDeadlock.classList.remove('hidden');
        }, 500);
      }
    }
  }

  // =========================================================================
  // Win & Game Over Handlers
  // =========================================================================
  handleLevelWin() {
    this.isGameOver = true;
    clearInterval(this.timerInterval);

    audio.playWin();
    particles.emitWinCelebration();

    const config = getLevelConfig(this.currentLevel);

    let stars = 1;
    if (this.timeLeft >= config.threeStarTime) {
      stars = 3;
    } else if (this.timeLeft >= Math.floor(config.threeStarTime * 0.6)) {
      stars = 2;
    }

    const timeBonus = this.timeLeft * 10;
    this.score += timeBonus;
    this.saveProgress();

    this.dom.winStar1.classList.toggle('earned', stars >= 1);
    this.dom.winStar2.classList.toggle('earned', stars >= 2);
    this.dom.winStar3.classList.toggle('earned', stars >= 3);

    this.dom.winScoreVal.textContent = this.score;
    this.dom.winTimeVal.textContent = `${this.timeLeft}s (+${timeBonus} pts)`;
    this.dom.winTotalVal.textContent = this.score;

    setTimeout(() => {
      this.dom.modalWin.classList.remove('hidden');
    }, 600);
  }

  handleTimeout() {
    this.isGameOver = true;
    audio.playGameOver();
    this.dom.modalGameOver.classList.remove('hidden');
  }

  openLevelsModal() {
    this.dom.levelsGrid.innerHTML = '';
    const maxUnlocked = Math.max(8, this.currentLevel);

    for (let i = 1; i <= maxUnlocked; i++) {
      const tile = document.createElement('div');
      tile.className = 'level-tile';
      if (i === this.currentLevel) tile.classList.add('current');
      if (i > this.currentLevel) tile.classList.add('locked');

      tile.innerHTML = `
        <span class="tile-num">${i}</span>
        <span class="tile-stars">${i < this.currentLevel ? '★★★' : '☆☆☆'}</span>
      `;

      if (i <= this.currentLevel) {
        tile.addEventListener('click', () => {
          this.dom.modalLevels.classList.add('hidden');
          this.dom.modalStart.classList.add('hidden');
          this.startLevel(i);
        });
      }

      this.dom.levelsGrid.appendChild(tile);
    }

    this.dom.modalLevels.classList.remove('hidden');
  }

  // =========================================================================
  // Helpers
  // =========================================================================
  getItemElement(shelfIdx, slotIdx, layer) {
    return this.dom.shelvesContainer.querySelector(
      `.goods-item[data-shelf="${shelfIdx}"][data-slot="${slotIdx}"][data-layer="${layer}"]`
    );
  }

  showToast(message) {
    this.dom.toastBanner.textContent = message;
    this.dom.toastBanner.classList.remove('hidden');
    this.dom.toastBanner.style.animation = 'none';
    this.dom.toastBanner.offsetHeight;
    this.dom.toastBanner.style.animation = null;

    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.dom.toastBanner.classList.add('hidden');
    }, 2200);
  }
}

// Start game on DOMContentLoaded or immediate if already loaded
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    window.game = new GoodsMatchGame();
  });
} else {
  window.game = new GoodsMatchGame();
}
