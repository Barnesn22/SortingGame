import assert from 'node:assert/strict';
import { getLevelConfig } from './levels.js';

function validateLevel(levelNum) {
  const cfg = getLevelConfig(levelNum);
  const counts = new Map();

  for (const shelf of cfg.layout) {
    for (const slot of shelf) {
      for (const itemId of slot) {
        counts.set(itemId, (counts.get(itemId) || 0) + 1);
      }
    }
  }

  for (const itemId of cfg.items) {
    assert.equal(counts.get(itemId), 3, `Item ${itemId} should appear exactly 3 times on level ${levelNum}`);
  }

  for (const itemId of [...counts.keys()]) {
    if (!cfg.items.includes(itemId)) {
      assert.fail(`Unexpected item ${itemId} found on level ${levelNum}`);
    }
  }

  const initialMatch = cfg.layout.some(shelf => {
    const fronts = [0, 1, 2].map(slotIdx => shelf[slotIdx][shelf[slotIdx].length - 1]).filter(Boolean);
    return fronts.length === 3 && fronts[0] === fronts[1] && fronts[1] === fronts[2];
  });
  assert.equal(initialMatch, false, `Level ${levelNum} starts with a complete match`);

  const emptyShelf = cfg.layout.some(shelf => shelf.every(slot => slot.length === 0));
  assert.equal(emptyShelf, true, `Level ${levelNum} should include at least one empty shelf`);

  let emptySlotCount = 0;
  for (const shelf of cfg.layout) {
    for (const slot of shelf) {
      if (slot.length === 0) emptySlotCount++;
    }
  }
  assert.ok(emptySlotCount > 0, `Level ${levelNum} should have at least one empty slot`);
}

for (let i = 1; i <= 8; i++) {
  validateLevel(i);
}

console.log('validation ok');
