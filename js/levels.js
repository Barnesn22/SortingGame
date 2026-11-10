/**
 * levels.js - Procedurally generated, guaranteed-solvable level layouts.
 *
 * Generation flow:
 * 1) pick the item types for the level
 * 2) create one triplet for each chosen item
 * 3) split those triplets across empty/filled slots while keeping room to solve
 */

const BASE_ITEMS = [
  'panda', 'gummy', 'guitar', 'greenmug', 'cupcake',
  'popsicle', 'coffeecup', 'cola', 'waterbottle', 'thermos'
];

function shuffle(list) {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function pickItemsForLevel(levelNum, shelves) {
  const totalSlots = shelves * 3;
  const reservedOpenSlots = Math.max(1, Math.floor(shelves / 2));
  const usableSlots = totalSlots - reservedOpenSlots;
  const maxDistinctItems = Math.min(BASE_ITEMS.length, Math.max(2, Math.floor(usableSlots / 3)));

  return shuffle(BASE_ITEMS).slice(0, maxDistinctItems);
}

function createTriplets(items) {
  const triplets = new Map();
  items.forEach(itemId => {
    triplets.set(itemId, [itemId, itemId, itemId]);
  });
  return triplets;
}

function placeTripletsAcrossShelves(shelves, triplets) {
  const layout = Array.from({ length: shelves }, () => [[], [], []]);
  const allSlots = [];

  for (let shelf = 0; shelf < shelves; shelf++) {
    for (let slot = 0; slot < 3; slot++) {
      allSlots.push({ shelf, slot });
    }
  }

  const reservedOpenSlots = shuffle(allSlots).slice(0, Math.max(1, Math.floor(shelves / 2)));
  const reservedSet = new Set(reservedOpenSlots.map(({ shelf, slot }) => `${shelf}:${slot}`));
  const usableSlots = allSlots.filter(({ shelf, slot }) => !reservedSet.has(`${shelf}:${slot}`));

  const itemsToPlace = shuffle([...triplets.keys()]);
  const usedSlots = new Set();

  itemsToPlace.forEach(itemId => {
    const chosenSlots = shuffle(usableSlots.filter(({ shelf, slot }) => {
      const key = `${shelf}:${slot}`;
      return !usedSlots.has(key);
    })).slice(0, 3);

    if (chosenSlots.length < 3) {
      throw new Error(`Could not place triplet for ${itemId}`);
    }

    chosenSlots.forEach(({ shelf, slot }) => {
      const key = `${shelf}:${slot}`;
      usedSlots.add(key);
      layout[shelf][slot].push(itemId);
    });
  });

  return layout;
}

function createGuaranteedLayout(shelves, items) {
  const triplets = createTriplets(items);
  return placeTripletsAcrossShelves(shelves, triplets);
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
