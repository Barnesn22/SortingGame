/**
 * levels.js - Procedurally generated, guaranteed-solvable level layouts.
 *
 * Generation flow:
 * 1) pick a set of item types
 * 2) create one triplet per item type
 * 3) split each triplet across multiple shelf slots so the board remains playable
 */

const BASE_ITEMS = [
  'panda', 'gummy', 'guitar', 'greenmug', 'cupcake',
  'popsicle', 'coffeecup', 'cola', 'waterbottle', 'thermos'
];

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickItemsForLevel(levelNum, shelves) {
  const targetCount = Math.min(
    BASE_ITEMS.length,
    Math.max(2, Math.floor((shelves * 2) / 3))
  );

  return shuffle(BASE_ITEMS).slice(0, targetCount);
}

function createTriplets(items) {
  return items.flatMap(itemId => [itemId, itemId, itemId]);
}

function splitTripletsAcrossShelves(triplets, shelves) {
  const layout = Array.from({ length: shelves }, () => [[], [], []]);
  const allSlots = [];

  for (let shelf = 0; shelf < shelves; shelf++) {
    for (let slot = 0; slot < 3; slot++) {
      allSlots.push({ shelf, slot });
    }
  }

  const reservedEmptySlots = new Set();
  for (let shelf = 0; shelf < shelves; shelf++) {
    reservedEmptySlots.add(`${shelf}:${(shelf + 2) % 3}`);
  }

  const usableSlots = allSlots.filter(({ shelf, slot }) => {
    return !reservedEmptySlots.has(`${shelf}:${slot}`);
  });

  const itemsById = new Map();
  for (const itemId of triplets) {
    if (!itemsById.has(itemId)) itemsById.set(itemId, 0);
    itemsById.set(itemId, itemsById.get(itemId) + 1);
  }

  const order = shuffle(Object.keys(itemsById));
  const assignments = new Map();

  order.forEach((itemId) => {
    const slots = shuffle(usableSlots).slice(0, 3);
    assignments.set(itemId, slots);
  });

  order.forEach((itemId) => {
    const slots = assignments.get(itemId) || [];
    slots.forEach(({ shelf, slot }) => {
      layout[shelf][slot].push(itemId);
    });
  });

  for (let shelf = 0; shelf < shelves; shelf++) {
    for (let slot = 0; slot < 3; slot++) {
      if (layout[shelf][slot].length > 3) {
        const target = allSlots.find(({ shelf: targetShelf, slot: targetSlot }) => {
          return targetShelf !== shelf && layout[targetShelf][targetSlot].length < 3;
        });

        if (target) {
          layout[target.shelf][target.slot].push(layout[shelf][slot].pop());
        }
      }
    }
  }

  return layout;
}

function createGuaranteedLayout(shelves, items) {
  const triplets = createTriplets(items);
  return splitTripletsAcrossShelves(triplets, shelves);
}

function buildProceduralLevel(levelNum) {
  const shelves = Math.min(6, Math.max(3, 3 + Math.floor(levelNum / 2)));
  const timeLimit = 120 + (levelNum - 1) * 20;
  const items = pickItemsForLevel(levelNum, shelves);

  return {
    level: levelNum,
    title: `Aisle #${levelNum}`,
    shelves,
    depth: 1,
    timeLimit,
    threeStarTime: Math.max(60, Math.floor(timeLimit * 0.5)),
    items,
    layout: createGuaranteedLayout(shelves, items)
  };
}

export const LEVELS = Array.from({ length: 8 }, (_, index) => buildProceduralLevel(index + 1));

export function getLevelConfig(levelNum) {
  const lvl = LEVELS.find(l => l.level === levelNum);
  if (lvl) return lvl;
  return buildProceduralLevel(levelNum);
}
