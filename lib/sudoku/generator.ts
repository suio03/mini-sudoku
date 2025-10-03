import { Difficulty, DIFFICULTY_CLUES } from '@/types/sudoku';
import { isValidPlacement } from './validation';
import { solveSudoku, hasUniqueSolution } from './solver';

/**
 * Seeded random number generator for consistent daily challenges
 * Uses Linear Congruential Generator (LCG) algorithm
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }

  /**
   * Generate next random number between 0 and 1
   */
  next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }

  /**
   * Generate random integer between min (inclusive) and max (inclusive)
   */
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /**
   * Shuffle array in place using Fisher-Yates algorithm
   */
  shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = this.nextInt(0, i);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}

/**
 * Generate a seed from a date string (YYYY-MM-DD)
 */
export function generateSeedFromDate(dateString: string): number {
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Create an empty 6×6 grid
 */
function createEmptyGrid(): number[][] {
  return Array(6).fill(0).map(() => Array(6).fill(0));
}

/**
 * Generate a complete valid Sudoku solution
 * Uses backtracking with randomization
 */
function generateCompleteSolution(random: SeededRandom): number[][] {
  const grid = createEmptyGrid();

  function fillGrid(row: number = 0, col: number = 0): boolean {
    // Move to next row if we've filled current row
    if (col === 6) {
      row++;
      col = 0;
    }

    // All cells filled, we're done
    if (row === 6) {
      return true;
    }

    // Try numbers in random order
    const numbers = random.shuffle([1, 2, 3, 4, 5, 6]);

    for (const num of numbers) {
      if (isValidPlacement(grid, row, col, num)) {
        grid[row][col] = num;

        if (fillGrid(row, col + 1)) {
          return true;
        }

        grid[row][col] = 0;
      }
    }

    return false;
  }

  fillGrid();
  return grid;
}

/**
 * Remove numbers from a complete solution to create a puzzle
 * Ensures the puzzle has a unique solution
 */
function removeNumbers(
  solution: number[][],
  difficulty: Difficulty,
  random: SeededRandom
): number[][] {
  const puzzle = solution.map(row => [...row]);
  const { min, max } = DIFFICULTY_CLUES[difficulty];

  // Calculate target number of clues
  const targetClues = random.nextInt(min, max);
  const cellsToRemove = 36 - targetClues;

  // Get all cell positions and shuffle them
  const positions: Array<{ row: number; col: number }> = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      positions.push({ row, col });
    }
  }
  const shuffledPositions = random.shuffle(positions);

  let removedCount = 0;
  let attempts = 0;
  const maxAttempts = 100;

  // Try to remove numbers while maintaining unique solution
  for (const pos of shuffledPositions) {
    if (removedCount >= cellsToRemove || attempts >= maxAttempts) {
      break;
    }

    attempts++;

    const { row, col } = pos;
    const backup = puzzle[row][col];

    // Remove number
    puzzle[row][col] = 0;

    // Check if puzzle still has unique solution
    const puzzleCopy = puzzle.map(r => [...r]);
    if (hasUniqueSolution(puzzleCopy)) {
      removedCount++;
      attempts = 0; // Reset attempts counter on success
    } else {
      // Restore number if removing it creates multiple solutions
      puzzle[row][col] = backup;
    }
  }

  return puzzle;
}

/**
 * Generate a new Sudoku puzzle with given difficulty
 *
 * @param difficulty - Puzzle difficulty level
 * @param seed - Optional seed for reproducible puzzles (used for daily challenges)
 * @returns Object containing puzzle and solution
 */
export function generatePuzzle(
  difficulty: Difficulty = 'medium',
  seed?: number
): { puzzle: number[][]; solution: number[][] } {
  const random = new SeededRandom(seed ?? Date.now());

  // Generate complete solution
  const solution = generateCompleteSolution(random);

  // Create puzzle by removing numbers
  const puzzle = removeNumbers(solution, difficulty, random);

  return { puzzle, solution };
}

/**
 * Generate a daily challenge puzzle
 * Uses date-based seeding for global consistency
 */
export function generateDailyChallenge(
  dateString: string,
  difficulty: Difficulty = 'medium'
): { puzzle: number[][]; solution: number[][] } {
  const seed = generateSeedFromDate(dateString);
  return generatePuzzle(difficulty, seed);
}

/**
 * Count the number of clues (non-zero cells) in a puzzle
 */
export function countClues(puzzle: number[][]): number {
  let count = 0;
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      if (puzzle[row][col] !== 0) {
        count++;
      }
    }
  }
  return count;
}

/**
 * Calculate difficulty score for a puzzle
 * Higher score = harder puzzle
 */
export function getDifficultyScore(puzzle: number[][]): number {
  const clues = countClues(puzzle);
  const fillRatio = clues / 36;

  // More empty cells = harder
  const emptyScore = (1 - fillRatio) * 100;

  return Math.round(emptyScore);
}

/**
 * Get today's date in YYYY-MM-DD format (UTC)
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
