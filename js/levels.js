
/**
 * levels.js - Constructive procedural level generation.
 *
 * Starts with a board containing completed triples, then scrambles it
 * using legal moves that can all be reversed.
 *
 * Important:
 * - Each shelf has exactly 3 slots.
 * - The first element of each slot is the front/top item.
 * - Items can only move into completely empty slots.
 * - The final starting board must not have an immediate match.
 * - Temporary matches during scrambling are allowed as long as they do not
 *   remove items from the board.
 * - Scrambling only moves items from slots containing exactly one item.
 *
 * Restricting scramble moves to single-item slots ensures that every
 * move can be reversed under the game's empty-destination rule.
 */

const BASE_ITEMS = [
  'panda',
  'gummy',
  'guitar',
  'greenmug',
  'cupcake',
  'popsicle',
  'coffeecup',
  'cola',
  'waterbottle',
  'thermos'
];

const MAX_SHELVES = 24;
const MAX_BOARD_CAPACITY = MAX_SHELVES; // 24 total shelf slots (3 columns x 8 rows max)

// --------------------------------------------------
// Utility functions
// --------------------------------------------------

function shuffle(list) {
  const next = [...list];

  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }

  return next;
}

function cloneBoard(board) {
  return board.map(shelf =>
    shelf.map(slot => [...slot])
  );
}

function boardKey(board) {
  return JSON.stringify(board);
}

// The first element is the front/top item in main.js.
function getTopItem(slot) {
  return slot.length > 0 ? slot[0] : null;
}

function countEmptySlots(board) {
  return board.reduce(
    (total, shelf) =>
      total + shelf.filter(slot => slot.length === 0).length,
    0
  );
}

function hasImmediateMatch(board) {
  return board.some(shelf => {
    const fronts = shelf.map(getTopItem);

    return (
      fronts.every(item => item !== null) &&
      fronts[0] === fronts[1] &&
      fronts[1] === fronts[2]
    );
  });
}

function countItems(board) {
  return board.reduce(
    (total, shelf) =>
      total + shelf.reduce((sum, slot) => sum + slot.length, 0),
    0
  );
}

// --------------------------------------------------
// Item selection
// --------------------------------------------------

function pickItemsForLevel(levelNum, shelves) {
  // The board can grow up to 24 shelves in a 3-across layout, but each shelf
  // still has 3 slots. To keep the start state playable, cap the number of
  // item types so there is always room for at least one open slot.
  const maxDistinctItems = Math.min(
    BASE_ITEMS.length,
    Math.max(2, Math.min(8, Math.ceil(shelves / 3)))
  );

  return shuffle(BASE_ITEMS).slice(0, maxDistinctItems);
}

// --------------------------------------------------
// Create the initial matched arrangement
// --------------------------------------------------

function createMatchedBoard(shelves, items) {
  if (items.length >= shelves) {
    throw new Error(
      'Not enough shelves to create a matched arrangement with an empty shelf.'
    );
  }

  const board = Array.from(
    { length: shelves },
    () => [[], [], []]
  );

  // Randomize which shelves receive the item triples.
  const shelfOrder = shuffle(
    Array.from({ length: shelves }, (_, index) => index)
  );

  items.forEach((itemId, index) => {
    const shelfIndex = shelfOrder[index];

    // One copy in each slot creates a valid matching shelf.
    board[shelfIndex] = [
      [itemId],
      [itemId],
      [itemId]
    ];
  });

  // At least one shelf remains completely empty.
  return board;
}

// --------------------------------------------------
// Legal scramble moves
// --------------------------------------------------

function getLegalScrambleMoves(board) {
  const moves = [];

  for (let sourceShelf = 0; sourceShelf < board.length; sourceShelf++) {
    for (let sourceSlot = 0; sourceSlot < 3; sourceSlot++) {
      const sourceStack = board[sourceShelf][sourceSlot];

      // Only move single-item stacks.
      // This guarantees the original source slot becomes empty,
      // allowing the move to be reversed later.
      if (sourceStack.length !== 1) continue;

      for (let targetShelf = 0; targetShelf < board.length; targetShelf++) {
        for (let targetSlot = 0; targetSlot < 3; targetSlot++) {
          if (
            sourceShelf === targetShelf &&
            sourceSlot === targetSlot
          ) {
            continue;
          }

          if (board[targetShelf][targetSlot].length !== 0) {
            continue;
          }

          moves.push({
            sourceShelf,
            sourceSlot,
            targetShelf,
            targetSlot
          });
        }
      }
    }
  }

  return moves;
}

// --------------------------------------------------
// Apply a scramble move
// --------------------------------------------------

function applyMove(board, move) {
  const next = cloneBoard(board);

  const source = next[move.sourceShelf][move.sourceSlot];
  const target = next[move.targetShelf][move.targetSlot];

  // Validate the move.
  if (source.length !== 1 || target.length !== 0) {
    return null;
  }

  // Match main.js: remove from the front and insert at the front.
  target.unshift(source.shift());

  return next;
}

// --------------------------------------------------
// Scramble the matched board
// --------------------------------------------------

function scrambleMatchedBoard(board, shelves) {
  const maxAttempts = 500;

  // Use a reliable, achievable scramble length. The original target grew too
  // aggressively with larger shelf counts and could make the search impossible
  // to complete while still respecting the no-match rule.
  const targetMoves = Math.max(4, Math.min(12, shelves * 2));

  let bestBoard = null;
  let bestMoveCount = 0;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    let working = cloneBoard(board);

    // Prevent revisiting a board within this scramble attempt.
    const seen = new Set([boardKey(working)]);

    let successfulMoves = 0;

    for (let step = 0; step < targetMoves; step++) {
      const legalMoves = getLegalScrambleMoves(working);

      const candidates = [];

      for (const move of legalMoves) {
        const next = applyMove(working, move);

        if (!next) continue;

        // Temporary matches during scrambling are allowed; only the final
        // starting board must be free of immediate matches.
        const key = boardKey(next);

        // Avoid cycling back to an earlier board state.
        if (seen.has(key)) continue;

        candidates.push({ move, next, key });
      }

      if (candidates.length === 0) {
        break;
      }

      const selected =
        candidates[Math.floor(Math.random() * candidates.length)];

      working = selected.next;
      seen.add(selected.key);

      successfulMoves++;

      if (successfulMoves > bestMoveCount) {
        bestBoard = cloneBoard(working);
        bestMoveCount = successfulMoves;
      }
    }

    // Accept a board that is sufficiently scrambled and still valid. If there
    // are no legal empty-slot moves at all, keep the generated arrangement as-is
    // so full-board layouts can still be used.
    if (
      successfulMoves >= Math.max(4, Math.floor(targetMoves * 0.75)) &&
      !hasImmediateMatch(working)
    ) {
      return {
        board: working,
        scrambleMoves: successfulMoves
      };
    }

  }

  // Fall back to the best legal scramble instead of crashing the page.
  if (bestBoard && bestMoveCount > 0) {
    return {
      board: bestBoard,
      scrambleMoves: bestMoveCount
    };
  }

  throw new Error(
    'Unable to generate a valid scrambled board from the current layout.'
  );
}

// --------------------------------------------------
// Build a procedural level
// --------------------------------------------------

function buildProceduralLevel(levelNum) {
  const shelves = Math.min(
    MAX_SHELVES,
    Math.max(3, 2 + levelNum)
  );

  // The board grows toward the full 3-column x 8-row limit of 24 shelf slots,
  // while still guaranteeing empty slots for legal moves.

  const timeLimit = 120 + (levelNum - 1) * 20;

  const items = pickItemsForLevel(levelNum, shelves);

  // Create a board with one completed triple per item type.
  const matchedBoard = createMatchedBoard(shelves, items);

  // Scramble without triggering matches.
  const result = scrambleMatchedBoard(matchedBoard, shelves);

  const layout = result.board;

  // Final structural validation.
  if (hasImmediateMatch(layout)) {
    throw new Error(`Level ${levelNum} starts with an existing match.`);
  }

  if (countEmptySlots(layout) === 0) {
    throw new Error(`Level ${levelNum} has no available empty slots.`);
  }

  if (countItems(layout) !== items.length * 3) {
    throw new Error(`Level ${levelNum} has an incorrect item count.`);
  }

  return {
    level: levelNum,
    title: `Aisle #${levelNum}`,
    shelves,

    // This generator creates one item per occupied slot.
    depth: 1,

    timeLimit,
    threeStarTime: Math.max(60, Math.floor(timeLimit * 0.5)),

    items,
    layout,

    // Useful for debugging and tuning difficulty.
    scrambleMoves: result.scrambleMoves
  };
}

// --------------------------------------------------
// Export levels
// --------------------------------------------------

export const LEVELS = Array.from(
  { length: 24 },
  (_, index) => buildProceduralLevel(index + 1)
);

export function getLevelConfig(levelNum) {
  const existingLevel = LEVELS.find(
    level => level.level === levelNum
  );

  if (existingLevel) {
    return existingLevel;
  }

  return buildProceduralLevel(levelNum);
}
