/**
 * levels.js - Procedurally generated, guaranteed-solvable level layouts.
 */

const BASE_ITEMS = [
  'panda', 'gummy', 'guitar', 'greenmug', 'cupcake',
  'popsicle', 'coffeecup', 'cola', 'waterbottle', 'thermos'
];

function createGuaranteedLayout(shelves) {
  const layout = Array.from({ length: shelves }, () => [[], [], []]);
  const itemPool = [...BASE_ITEMS].sort(() => Math.random() - 0.5).slice(0, shelves);

  itemPool.forEach((itemId, shelfIndex) => {
    layout[shelfIndex][0].push(itemId);
    layout[shelfIndex][1].push(itemId);
    layout[shelfIndex][2].push(itemId);
  });

  return layout;
}

function buildProceduralLevel(levelNum) {
  const shelves = Math.min(6, Math.max(3, 3 + Math.floor(levelNum / 2)));
  const timeLimit = 120 + (levelNum - 1) * 20;
  const itemPool = BASE_ITEMS.slice(0, Math.min(BASE_ITEMS.length, shelves));

  return {
    level: levelNum,
    title: `Aisle #${levelNum}`,
    shelves,
    depth: 1,
    timeLimit,
    threeStarTime: Math.max(60, Math.floor(timeLimit * 0.5)),
    items: itemPool,
    layout: createGuaranteedLayout(shelves)
  };
}

export const LEVELS = Array.from({ length: 8 }, (_, index) => buildProceduralLevel(index + 1));

export function getLevelConfig(levelNum) {
  const lvl = LEVELS.find(l => l.level === levelNum);
  if (lvl) return lvl;
  return buildProceduralLevel(levelNum);
}
