import { isValidPlacement, getCandidates } from './validation';

/**
 * Find the next empty cell in the grid
 * Returns null if no empty cells found
 */
function findEmptyCell(grid: number[][]): { row: number; col: number } | null {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      if (grid[row][col] === 0) {
        return { row, col };
      }
    }
  }
  return null;
}

/**
 * Find the empty cell with minimum remaining values (MRV heuristic)
 * This optimization makes solving faster by choosing cells with fewer possibilities
 */
function findEmptyCellMRV(grid: number[][]): { row: number; col: number; candidates: number[] } | null {
  let minCell: { row: number; col: number; candidates: number[] } | null = null;
  let minCandidates = 7; // More than max possible (6)

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      if (grid[row][col] === 0) {
        const candidates = getCandidates(grid, row, col);
        if (candidates.length < minCandidates) {
          minCandidates = candidates.length;
          minCell = { row, col, candidates };

          // If we find a cell with 0 candidates, puzzle is unsolvable
          if (minCandidates === 0) {
            return minCell;
          }
        }
      }
    }
  }

  return minCell;
}

/**
 * Solve Sudoku using backtracking algorithm
 * Returns true if puzzle is solved, false if unsolvable
 */
export function solveSudoku(grid: number[][], useMRV: boolean = true): boolean {
  const emptyCell = useMRV ? findEmptyCellMRV(grid) : findEmptyCell(grid);

  // No empty cells means puzzle is solved
  if (!emptyCell) {
    return true;
  }

  const { row, col } = emptyCell;

  // Get candidates (or try 1-6 if not using MRV)
  const candidates = useMRV && 'candidates' in emptyCell
    ? emptyCell.candidates
    : [1, 2, 3, 4, 5, 6];

  // Try each candidate number
  for (const num of candidates) {
    if (isValidPlacement(grid, row, col, num)) {
      // Place number
      grid[row][col] = num;

      // Recursively try to solve rest of puzzle
      if (solveSudoku(grid, useMRV)) {
        return true;
      }

      // Backtrack: remove number and try next candidate
      grid[row][col] = 0;
    }
  }

  // No valid number found, trigger backtracking
  return false;
}

/**
 * Count the number of solutions for a puzzle
 * Used to verify puzzle has unique solution
 * Stops counting after finding maxSolutions
 */
export function countSolutions(grid: number[][], maxSolutions: number = 2): number {
  let solutionCount = 0;

  function backtrack(): boolean {
    // Check if we've found enough solutions
    if (solutionCount >= maxSolutions) {
      return true;
    }

    const emptyCell = findEmptyCell(grid);

    // No empty cells means we found a solution
    if (!emptyCell) {
      solutionCount++;
      return solutionCount >= maxSolutions;
    }

    const { row, col } = emptyCell;

    // Try each number 1-6
    for (let num = 1; num <= 6; num++) {
      if (isValidPlacement(grid, row, col, num)) {
        grid[row][col] = num;

        if (backtrack()) {
          grid[row][col] = 0;
          return true;
        }

        grid[row][col] = 0;
      }
    }

    return false;
  }

  backtrack();
  return solutionCount;
}

/**
 * Check if a puzzle has exactly one unique solution
 */
export function hasUniqueSolution(grid: number[][]): boolean {
  const gridCopy = grid.map(row => [...row]);
  const count = countSolutions(gridCopy, 2);
  return count === 1;
}

/**
 * Solve puzzle and return the solution
 * Returns null if puzzle is unsolvable
 */
export function getSolution(grid: number[][]): number[][] | null {
  const gridCopy = grid.map(row => [...row]);

  if (solveSudoku(gridCopy)) {
    return gridCopy;
  }

  return null;
}

/**
 * Find a hint for the player
 * Returns the position and value of a cell that can be logically deduced
 */
export function findHint(grid: number[][]): { row: number; col: number; value: number } | null {
  // Strategy 1: Find naked singles (cells with only one candidate)
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      if (grid[row][col] === 0) {
        const candidates = getCandidates(grid, row, col);
        if (candidates.length === 1) {
          return { row, col, value: candidates[0] };
        }
      }
    }
  }

  // Strategy 2: Find hidden singles (numbers that can only go in one place in a row/column/block)
  // For simplicity, we'll just return any valid cell from the solution
  const solution = getSolution(grid);
  if (solution) {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 6; col++) {
        if (grid[row][col] === 0) {
          return { row, col, value: solution[row][col] };
        }
      }
    }
  }

  return null;
}

/**
 * Validate that a completed grid is a valid Sudoku solution
 */
export function isValidSolution(grid: number[][]): boolean {
  // Check all cells are filled
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      if (grid[row][col] === 0) {
        return false;
      }
    }
  }

  // Check all placements are valid
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      const num = grid[row][col];
      grid[row][col] = 0; // Temporarily remove to check
      if (!isValidPlacement(grid, row, col, num)) {
        grid[row][col] = num;
        return false;
      }
      grid[row][col] = num;
    }
  }

  return true;
}
