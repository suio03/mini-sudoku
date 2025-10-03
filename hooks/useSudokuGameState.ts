import { useState, useCallback, useRef, useEffect } from 'react';
import {
  SudokuGameState,
  SudokuGrid,
  SudokuCell,
  SudokuMove,
  Difficulty,
  Position,
  CellValue
} from '@/types/sudoku';
import { generatePuzzle } from '@/lib/sudoku/generator';
import { validateGrid, isPuzzleComplete, getCandidates } from '@/lib/sudoku/validation';
import { findHint } from '@/lib/sudoku/solver';

const STORAGE_KEY = 'sudoku-game-state';

/**
 * Create initial Sudoku grid from puzzle template
 */
function createSudokuGrid(puzzle: number[][]): SudokuGrid {
  const grid: SudokuGrid = [];

  for (let row = 0; row < 6; row++) {
    grid[row] = [];
    for (let col = 0; col < 6; col++) {
      const value = puzzle[row][col] as CellValue;
      grid[row][col] = {
        value,
        isGiven: value !== 0,
        notes: new Set<number>(),
        hasError: false,
      };
    }
  }

  return grid;
}

/**
 * Convert SudokuGrid to simple number array for validation
 */
function gridToArray(grid: SudokuGrid): number[][] {
  return grid.map(row => row.map(cell => cell.value));
}

/**
 * Serialize game state for localStorage (convert Sets to Arrays)
 */
function serializeGameState(state: SudokuGameState): string {
  const serializable = {
    ...state,
    grid: state.grid.map(row =>
      row.map(cell => ({
        ...cell,
        notes: Array.from(cell.notes),
      }))
    ),
    history: state.history.map(move => ({
      ...move,
      previousNotes: move.previousNotes ? Array.from(move.previousNotes) : undefined,
      newNotes: move.newNotes ? Array.from(move.newNotes) : undefined,
    })),
  };
  return JSON.stringify(serializable);
}

/**
 * Deserialize game state from localStorage (convert Arrays to Sets)
 */
function deserializeGameState(data: string): SudokuGameState {
  const parsed = JSON.parse(data);
  return {
    ...parsed,
    grid: parsed.grid.map((row: any[]) =>
      row.map((cell: any) => ({
        ...cell,
        notes: new Set(cell.notes),
      }))
    ),
    history: parsed.history.map((move: any) => ({
      ...move,
      previousNotes: move.previousNotes ? new Set(move.previousNotes) : undefined,
      newNotes: move.newNotes ? new Set(move.newNotes) : undefined,
    })),
  };
}

/**
 * Load game state from localStorage
 */
function loadGameState(): SudokuGameState | null {
  if (typeof window === 'undefined') return null;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    return deserializeGameState(saved);
  } catch (error) {
    console.error('Failed to load game state:', error);
    return null;
  }
}

/**
 * Save game state to localStorage
 */
function saveGameState(state: SudokuGameState): void {
  if (typeof window === 'undefined') return;

  try {
    const serialized = serializeGameState(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
}

export function useSudokuGameState(
  initialDifficulty: Difficulty = 'medium'
) {
  const startTimeRef = useRef<number>(Date.now());
  const [isHydrated, setIsHydrated] = useState(false);

  // Always start with a fresh game for SSR
  const getInitialState = useCallback(() => {
    const { puzzle, solution } = generatePuzzle(initialDifficulty);
    const grid = createSudokuGrid(puzzle);

    return {
      grid,
      puzzle,
      solution,
      selectedCell: null,
      isComplete: false,
      moveCount: 0,
      mistakeCount: 0,
      history: [],
      historyIndex: -1,
      notesMode: false,
      difficulty: initialDifficulty,
      timeElapsed: 0,
    };
  }, [initialDifficulty]);

  const [gameState, setGameState] = useState<SudokuGameState>(getInitialState);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  // Load saved state after hydration (client-side only)
  useEffect(() => {
    setIsHydrated(true);

    const savedState = loadGameState();

    if (savedState) {
      // Update startTimeRef to account for saved time
      startTimeRef.current = Date.now() - (savedState.timeElapsed * 1000);
      setGameState(savedState);
    }
  }, []);

  // Save game state whenever it changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      saveGameState(gameState);
    }
  }, [gameState, isHydrated]);

  // Auto-start timer when game has moves and is not complete
  useEffect(() => {
    if (isHydrated && gameState.moveCount > 0 && !gameState.isComplete && !timerInterval) {
      const interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeElapsed: Math.floor((Date.now() - startTimeRef.current) / 1000),
        }));
      }, 1000);
      setTimerInterval(interval);
    }

    // Stop timer when game is complete
    if (gameState.isComplete && timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [isHydrated, gameState.moveCount, gameState.isComplete, timerInterval]);

  // Start timer
  const startTimer = useCallback(() => {
    if (timerInterval) return;

    const interval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        timeElapsed: Math.floor((Date.now() - startTimeRef.current) / 1000),
      }));
    }, 1000);

    setTimerInterval(interval);
  }, [timerInterval]);

  // Stop timer
  const stopTimer = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [timerInterval]);

  // Reset game
  const resetGame = useCallback((
    difficulty: Difficulty = gameState.difficulty
  ) => {
    stopTimer();

    const { puzzle, solution } = generatePuzzle(difficulty);
    const grid = createSudokuGrid(puzzle);

    startTimeRef.current = Date.now();

    const newState = {
      grid,
      puzzle,
      solution,
      selectedCell: null,
      isComplete: false,
      moveCount: 0,
      mistakeCount: 0,
      history: [],
      historyIndex: -1,
      notesMode: false,
      difficulty,
      timeElapsed: 0,
    };

    setGameState(newState);

    // Clear saved game when starting new game
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [gameState.difficulty, stopTimer]);

  // Select a cell
  const selectCell = useCallback((position: Position | null) => {
    setGameState(prev => ({
      ...prev,
      selectedCell: position,
    }));
  }, []);

  // Toggle notes mode
  const toggleNotesMode = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      notesMode: !prev.notesMode,
    }));
  }, []);

  // Make a move (place a number or toggle note)
  const makeMove = useCallback((row: number, col: number, value: CellValue) => {
    setGameState(prev => {
      const cell = prev.grid[row][col];

      // Can't modify given cells
      if (cell.isGiven) {
        return prev;
      }

      // Create new grid
      const newGrid: SudokuGrid = prev.grid.map(r =>
        r.map(c => ({
          ...c,
          notes: new Set(c.notes),
        }))
      );

      const newCell = newGrid[row][col];
      let move: SudokuMove;

      if (prev.notesMode && value !== 0) {
        // Toggle note
        const previousNotes = new Set(newCell.notes);
        if (newCell.notes.has(value)) {
          newCell.notes.delete(value);
        } else {
          newCell.notes.add(value);
        }

        move = {
          row,
          col,
          previousValue: cell.value,
          newValue: cell.value,
          previousNotes,
          newNotes: new Set(newCell.notes),
        };
      } else {
        // Place or clear number
        const previousValue = cell.value;

        // If placing a number, clear notes
        if (value !== 0) {
          newCell.notes.clear();
        }

        newCell.value = value;

        move = {
          row,
          col,
          previousValue,
          newValue: value,
          previousNotes: new Set(cell.notes),
          newNotes: new Set(newCell.notes),
        };
      }

      // Validate grid
      validateGrid(newGrid);

      // Check if puzzle is complete
      const isComplete = isPuzzleComplete(newGrid);

      // Count mistakes
      let mistakeCount = prev.mistakeCount;
      if (!prev.notesMode && value !== 0 && value !== prev.solution[row][col]) {
        mistakeCount++;
      }

      // Update move history
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(move);

      return {
        ...prev,
        grid: newGrid,
        isComplete,
        moveCount: prev.moveCount + 1,
        mistakeCount,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  }, []);

  // Undo move
  const undoMove = useCallback(() => {
    setGameState(prev => {
      if (prev.historyIndex < 0) {
        return prev;
      }

      const move = prev.history[prev.historyIndex];

      // Create new grid
      const newGrid: SudokuGrid = prev.grid.map(r =>
        r.map(c => ({
          ...c,
          notes: new Set(c.notes),
        }))
      );

      // Revert the move
      newGrid[move.row][move.col].value = move.previousValue;
      if (move.previousNotes) {
        newGrid[move.row][move.col].notes = new Set(move.previousNotes);
      }

      // Validate grid
      validateGrid(newGrid);

      return {
        ...prev,
        grid: newGrid,
        historyIndex: prev.historyIndex - 1,
        isComplete: false,
      };
    });
  }, []);

  // Redo move
  const redoMove = useCallback(() => {
    setGameState(prev => {
      if (prev.historyIndex >= prev.history.length - 1) {
        return prev;
      }

      const move = prev.history[prev.historyIndex + 1];

      // Create new grid
      const newGrid: SudokuGrid = prev.grid.map(r =>
        r.map(c => ({
          ...c,
          notes: new Set(c.notes),
        }))
      );

      // Apply the move
      newGrid[move.row][move.col].value = move.newValue;
      if (move.newNotes) {
        newGrid[move.row][move.col].notes = new Set(move.newNotes);
      }

      // Validate grid
      validateGrid(newGrid);

      // Check if complete
      const isComplete = isPuzzleComplete(newGrid);

      return {
        ...prev,
        grid: newGrid,
        historyIndex: prev.historyIndex + 1,
        isComplete,
      };
    });
  }, []);

  // Clear selected cell
  const clearCell = useCallback(() => {
    if (!gameState.selectedCell) return;

    const { row, col } = gameState.selectedCell;
    makeMove(row, col, 0);
  }, [gameState.selectedCell, makeMove]);

  // Get hint for selected cell
  const getHint = useCallback(() => {
    if (!gameState.selectedCell) return;

    const gridArray = gridToArray(gameState.grid);
    const hint = findHint(gridArray);

    if (hint) {
      makeMove(hint.row, hint.col, hint.value as CellValue);
    }
  }, [gameState.selectedCell, gameState.grid, makeMove]);

  // Show candidates for selected cell
  const showCandidates = useCallback(() => {
    if (!gameState.selectedCell) return [];

    const { row, col } = gameState.selectedCell;
    const gridArray = gridToArray(gameState.grid);

    return getCandidates(gridArray, row, col);
  }, [gameState.selectedCell, gameState.grid]);

  // Auto-fill notes for all empty cells
  const autoFillNotes = useCallback(() => {
    setGameState(prev => {
      const newGrid: SudokuGrid = prev.grid.map(r =>
        r.map(c => ({
          ...c,
          notes: new Set(c.notes),
        }))
      );

      const gridArray = gridToArray(newGrid);

      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 6; col++) {
          if (newGrid[row][col].value === 0 && !newGrid[row][col].isGiven) {
            const candidates = getCandidates(gridArray, row, col);
            newGrid[row][col].notes = new Set(candidates);
          }
        }
      }

      return {
        ...prev,
        grid: newGrid,
      };
    });
  }, []);

  // Check if can undo/redo
  const canUndo = gameState.historyIndex >= 0;
  const canRedo = gameState.historyIndex < gameState.history.length - 1;

  return {
    gameState,
    resetGame,
    selectCell,
    toggleNotesMode,
    makeMove,
    undoMove,
    redoMove,
    clearCell,
    getHint,
    showCandidates,
    autoFillNotes,
    canUndo,
    canRedo,
    startTimer,
    stopTimer,
  };
}
