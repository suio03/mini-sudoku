// 6×6 Mini Sudoku Type Definitions

/**
 * Sudoku cell value: 0 = empty, 1-6 = filled
 */
export type CellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Sudoku difficulty levels
 */
export type Difficulty = 'easy' | 'medium' | 'hard';

/**
 * Cell position on the grid
 */
export interface Position {
  row: number;
  col: number;
}

/**
 * Individual cell in the Sudoku grid
 */
export interface SudokuCell {
  value: CellValue;
  isGiven: boolean;        // True if this is an original clue
  notes: Set<number>;      // Pencil marks (candidate numbers)
  hasError: boolean;       // True if cell violates Sudoku rules
}

/**
 * Complete Sudoku grid (6×6)
 */
export type SudokuGrid = SudokuCell[][];

/**
 * Move history entry for undo/redo
 */
export interface SudokuMove {
  row: number;
  col: number;
  previousValue: CellValue;
  newValue: CellValue;
  previousNotes?: Set<number>;
  newNotes?: Set<number>;
}

/**
 * Complete game state
 */
export interface SudokuGameState {
  // Current puzzle state
  grid: SudokuGrid;

  // Original puzzle and solution
  puzzle: number[][];      // Original clues (0 = empty)
  solution: number[][];    // Complete solution

  // Game progress
  selectedCell: Position | null;
  isComplete: boolean;
  moveCount: number;
  mistakeCount: number;

  // History for undo/redo
  history: SudokuMove[];
  historyIndex: number;

  // UI state
  notesMode: boolean;      // Toggle between normal and pencil mark mode

  // Difficulty
  difficulty: Difficulty;

  // Timer (in seconds)
  timeElapsed: number;
}

/**
 * Game configuration
 */
export interface SudokuConfig {
  size: 6;                 // Grid size (6×6)
  blockRows: 2;            // Block height (2 rows)
  blockCols: 3;            // Block width (3 columns)
  difficulty: Difficulty;
}

/**
 * Clue count ranges for difficulty levels
 */
export const DIFFICULTY_CLUES: Record<Difficulty, { min: number; max: number }> = {
  easy: { min: 20, max: 24 },    // 55-67% filled
  medium: { min: 16, max: 19 },  // 44-53% filled
  hard: { min: 12, max: 15 },    // 33-42% filled
};

/**
 * Standard 6×6 Sudoku configuration
 */
export const SUDOKU_CONFIG: SudokuConfig = {
  size: 6,
  blockRows: 2,
  blockCols: 3,
  difficulty: 'medium',
};

/**
 * Validation result
 */
export interface ValidationResult {
  isValid: boolean;
  errors: Position[];
}

/**
 * Daily challenge completion data
 */
export interface DailyChallengeCompletion {
  date: string;           // YYYY-MM-DD format
  completed: boolean;
  timeElapsed: number;
  moveCount: number;
  mistakeCount: number;
}

/**
 * User statistics
 */
export interface SudokuUserStats {
  gamesPlayed: number;
  gamesCompleted: number;
  currentStreak: number;
  maxStreak: number;
  totalTime: number;
  totalMoves: number;
  bestTimes: Record<Difficulty, number>;  // Best time per difficulty
  dailyCompletions: DailyChallengeCompletion[];
}
