import { CellValue, Position, SudokuGrid, ValidationResult } from '@/types/sudoku';

/**
 * Get the block index for a given cell position
 * For 6×6 with 2×3 blocks:
 * - 3 block columns (each 3 cells wide)
 * - 2 block rows (each 2 cells tall)
 */
export function getBlockIndex(row: number, col: number): { blockRow: number; blockCol: number } {
  return {
    blockRow: Math.floor(row / 2),  // 0-2 (3 block rows)
    blockCol: Math.floor(col / 3),  // 0-1 (2 block columns)
  };
}

/**
 * Get all cell positions in the same 2×3 block
 */
export function getBlockCells(row: number, col: number): Position[] {
  const { blockRow, blockCol } = getBlockIndex(row, col);
  const startRow = blockRow * 2;
  const startCol = blockCol * 3;

  const cells: Position[] = [];
  for (let r = startRow; r < startRow + 2; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      cells.push({ row: r, col: c });
    }
  }
  return cells;
}

/**
 * Check if a number is valid in a specific position
 * Returns true if placing the number doesn't violate Sudoku rules
 */
export function isValidPlacement(
  grid: number[][],
  row: number,
  col: number,
  num: number
): boolean {
  // Check row
  for (let c = 0; c < 6; c++) {
    if (c !== col && grid[row][c] === num) {
      return false;
    }
  }

  // Check column
  for (let r = 0; r < 6; r++) {
    if (r !== row && grid[r][col] === num) {
      return false;
    }
  }

  // Check 2×3 block
  const blockCells = getBlockCells(row, col);
  for (const cell of blockCells) {
    if ((cell.row !== row || cell.col !== col) && grid[cell.row][cell.col] === num) {
      return false;
    }
  }

  return true;
}

/**
 * Find all cells that have errors (violate Sudoku rules)
 */
export function findErrors(grid: SudokuGrid): Position[] {
  const errors: Position[] = [];
  const gridValues: number[][] = grid.map(row => row.map(cell => cell.value));

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      const value = grid[row][col].value;

      // Skip empty cells
      if (value === 0) continue;

      // Temporarily set to 0 to check if placing the same number would be valid
      gridValues[row][col] = 0;

      if (!isValidPlacement(gridValues, row, col, value)) {
        errors.push({ row, col });
      }

      // Restore value
      gridValues[row][col] = value;
    }
  }

  return errors;
}

/**
 * Validate the entire grid and mark errors
 * Returns true if grid has no errors
 */
export function validateGrid(grid: SudokuGrid): ValidationResult {
  const errors = findErrors(grid);

  // Update error flags on cells
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      grid[row][col].hasError = errors.some(e => e.row === row && e.col === col);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Check if the puzzle is complete (all cells filled with no errors)
 */
export function isPuzzleComplete(grid: SudokuGrid): boolean {
  // Check if all cells are filled
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      if (grid[row][col].value === 0) {
        return false;
      }
    }
  }

  // Validate grid
  const result = validateGrid(grid);
  return result.isValid;
}

/**
 * Get all valid candidate numbers for a cell
 */
export function getCandidates(grid: number[][], row: number, col: number): number[] {
  if (grid[row][col] !== 0) {
    return [];
  }

  const candidates: number[] = [];
  for (let num = 1; num <= 6; num++) {
    if (isValidPlacement(grid, row, col, num)) {
      candidates.push(num);
    }
  }
  return candidates;
}

/**
 * Get all candidates for the entire grid
 */
export function getAllCandidates(grid: number[][]): Map<string, number[]> {
  const candidatesMap = new Map<string, number[]>();

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      if (grid[row][col] === 0) {
        const key = `${row},${col}`;
        candidatesMap.set(key, getCandidates(grid, row, col));
      }
    }
  }

  return candidatesMap;
}

/**
 * Check if a specific number appears in a row
 */
export function isNumberInRow(grid: number[][], row: number, num: number): boolean {
  return grid[row].includes(num);
}

/**
 * Check if a specific number appears in a column
 */
export function isNumberInColumn(grid: number[][], col: number, num: number): boolean {
  for (let row = 0; row < 6; row++) {
    if (grid[row][col] === num) {
      return true;
    }
  }
  return false;
}

/**
 * Check if a specific number appears in a block
 */
export function isNumberInBlock(grid: number[][], row: number, col: number, num: number): boolean {
  const blockCells = getBlockCells(row, col);
  for (const cell of blockCells) {
    if (grid[cell.row][cell.col] === num) {
      return true;
    }
  }
  return false;
}

/**
 * Check if a row is completely filled with valid numbers (1-6)
 */
export function isRowComplete(grid: number[][], row: number): boolean {
  const seen = new Set<number>();
  for (let col = 0; col < 6; col++) {
    const value = grid[row][col];
    if (value === 0) return false;
    seen.add(value);
  }
  return seen.size === 6;
}

/**
 * Check if a column is completely filled with valid numbers (1-6)
 */
export function isColumnComplete(grid: number[][], col: number): boolean {
  const seen = new Set<number>();
  for (let row = 0; row < 6; row++) {
    const value = grid[row][col];
    if (value === 0) return false;
    seen.add(value);
  }
  return seen.size === 6;
}

/**
 * Check if a 2×3 block is completely filled with valid numbers (1-6)
 */
export function isBlockComplete(grid: number[][], row: number, col: number): boolean {
  const cells = getBlockCells(row, col);
  const seen = new Set<number>();

  for (const cell of cells) {
    const value = grid[cell.row][cell.col];
    if (value === 0) return false;
    seen.add(value);
  }

  return seen.size === 6;
}
