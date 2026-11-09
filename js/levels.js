/**
 * levels.js - Progressive level designs with authentic Goods Sort items & layouts
 */

export const LEVELS = [
  {
    level: 1,
    title: 'Warm Up',
    shelves: 3,
    depth: 1,
    timeLimit: 120,
    threeStarTime: 60,
    layout: [
      [['cola'], ['panda'], []],
      [['panda'], ['cola'], []],
      [['cola'], ['panda'], []]
    ]
  },
  {
    level: 2,
    title: 'Aisle Expansion',
    shelves: 3,
    depth: 2,
    timeLimit: 140,
    threeStarTime: 75,
    layout: [
      [['cola', 'gummy'], ['panda', 'cola'], []],
      [['gummy', 'panda'], ['cola'], []],
      [['panda'], ['gummy'], []]
    ]
  },
  {
    level: 3,
    title: 'Snack Shelf',
    shelves: 4,
    depth: 2,
    timeLimit: 160,
    threeStarTime: 90,
    layout: [
      [['guitar', 'panda'], ['cola', 'gummy'], []],
      [['panda', 'cola'], ['guitar'], []],
      [['cola'], ['panda', 'guitar'], []],
      [['gummy'], ['gummy'], []]
    ]
  },
  {
    level: 4,
    title: 'Market Rush',
    shelves: 4,
    depth: 3,
    timeLimit: 180,
    threeStarTime: 100,
    layout: [
      [['greenmug', 'coffeecup', 'gummy'], ['panda', 'guitar', 'greenmug'], []],
      [['gummy', 'panda'], ['coffeecup', 'greenmug'], []],
      [['coffeecup', 'gummy'], ['guitar'], []],
      [['guitar'], ['panda'], []]
    ]
  },
  {
    level: 5,
    title: 'Grand Grocery',
    shelves: 5,
    depth: 3,
    timeLimit: 200,
    threeStarTime: 110,
    layout: [
      [['cola', 'cupcake', 'popsicle'], ['panda', 'cola', 'gummy'], []],
      [['gummy', 'coffeecup'], ['coffeecup', 'panda', 'cola'], []],
      [['popsicle', 'coffeecup'], ['cupcake'], []],
      [['popsicle', 'gummy'], ['cupcake'], []],
      [['panda'], [], []]
    ]
  },
  {
    level: 6,
    title: 'Stockroom Master',
    shelves: 6,
    depth: 3,
    timeLimit: 220,
    threeStarTime: 120,
    items: ['panda', 'gummy', 'guitar', 'greenmug', 'cupcake', 'popsicle', 'coffeecup']
  },
  {
    level: 7,
    title: 'Supermarket Pro',
    shelves: 6,
    depth: 3,
    timeLimit: 240,
    threeStarTime: 135,
    items: ['panda', 'gummy', 'guitar', 'greenmug', 'cupcake', 'popsicle', 'coffeecup', 'cola']
  },
  {
    level: 8,
    title: 'Sorting Legend',
    shelves: 6,
    depth: 4,
    timeLimit: 260,
    threeStarTime: 150,
    items: ['panda', 'gummy', 'guitar', 'greenmug', 'cupcake', 'popsicle', 'coffeecup', 'cola', 'waterbottle', 'thermos']
  }
];

export function getLevelConfig(levelNum) {
  const lvl = LEVELS.find(l => l.level === levelNum);
  if (lvl) return lvl;
  const baseItems = ['panda', 'gummy', 'guitar', 'greenmug', 'cupcake', 'popsicle', 'coffeecup', 'cola', 'waterbottle', 'thermos'];
  return {
    level: levelNum,
    title: `Aisle #${levelNum}`,
    shelves: Math.min(6, 4 + Math.floor(levelNum / 3)),
    depth: Math.min(4, 2 + Math.floor(levelNum / 2)),
    items: baseItems.slice(0, Math.min(baseItems.length, 5 + (levelNum % 6))),
    timeLimit: 240,
    threeStarTime: 130
  };
}
