'use client'

import React, { useState, useEffect } from 'react';
import { useSudokuGameState } from '@/hooks/useSudokuGameState';
import SudokuCell from './SudokuCell';
import NumberPad from './NumberPad';
import { Button } from '@/components/ui/button';
import { Difficulty, CellValue, Position } from '@/types/sudoku';
import { isRowComplete, isColumnComplete, isBlockComplete, getBlockCells } from '@/lib/sudoku/validation';
import { Pencil, Lightbulb, RotateCcw, RotateCw, Trash2, Play, Eye, EyeOff } from 'lucide-react';

export default function SudokuBoard() {
  const {
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
  } = useSudokuGameState();

  const [isHydrated, setIsHydrated] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showStats, setShowStats] = useState(true);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [highlightedCells, setHighlightedCells] = useState<Map<string, number>>(new Map());

  // Calculate cell size
  const cellSize = Math.min(400 / 6, 70);

  // Check for completed rows, columns, or blocks and trigger animation
  const checkCompletions = (row: number, col: number) => {
    const gridArray = gameState.grid.map(r => r.map(c => c.value));
    const cellsWithDelays = new Map<string, number>();

    // Check row completion (only if no errors in the row)
    if (isRowComplete(gridArray, row)) {
      const hasError = gameState.grid[row].some(cell => cell.hasError);
      if (!hasError) {
        // Wave from left to right
        for (let c = 0; c < 6; c++) {
          cellsWithDelays.set(`${row}-${c}`, c * 80); // 80ms delay between each cell
        }
      }
    }

    // Check column completion (only if no errors in the column)
    if (isColumnComplete(gridArray, col)) {
      const hasError = gameState.grid.some(r => r[col].hasError);
      if (!hasError) {
        // Wave from top to bottom
        for (let r = 0; r < 6; r++) {
          cellsWithDelays.set(`${r}-${col}`, r * 80); // 80ms delay between each cell
        }
      }
    }

    // Check block completion (only if no errors in the block)
    if (isBlockComplete(gridArray, row, col)) {
      const blockCells = getBlockCells(row, col);
      const hasError = blockCells.some(cell => gameState.grid[cell.row][cell.col].hasError);
      if (!hasError) {
        // Wave pattern for block: top-left to bottom-right
        blockCells.forEach((cell, index) => {
          cellsWithDelays.set(`${cell.row}-${cell.col}`, index * 70);
        });
      }
    }

    // Trigger animation if any completions found
    if (cellsWithDelays.size > 0) {
      setHighlightedCells(cellsWithDelays);

      // Clear animation after all animations complete (max delay + animation duration)
      const maxDelay = Math.max(...Array.from(cellsWithDelays.values()));
      setTimeout(() => {
        setHighlightedCells(new Map());
      }, maxDelay + 800); // 600ms animation + 200ms buffer
    }
  };

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    selectCell({ row, col });
  };

  // Handle hydration and load preferences
  useEffect(() => {
    setIsHydrated(true);
    if (typeof window !== 'undefined') {
      const savedShowStats = localStorage.getItem('sudoku-show-stats');
      if (savedShowStats !== null) {
        setShowStats(JSON.parse(savedShowStats));
      }
    }
  }, []);

  // Stop timer when game is complete
  useEffect(() => {
    if (gameState.isComplete) {
      stopTimer();
    }
  }, [gameState.isComplete, stopTimer]);

  // Check for completions whenever grid changes
  useEffect(() => {
    if (gameState.selectedCell && gameState.moveCount > 0) {
      const { row, col } = gameState.selectedCell;
      checkCompletions(row, col);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.grid]);

  // Handle number input from keypad
  const handleNumberInput = (num: CellValue) => {
    if (!gameState.selectedCell) return;

    // Start timer on first move
    if (gameState.moveCount === 0 && !gameState.isComplete) {
      startTimer();
    }

    const { row, col } = gameState.selectedCell;
    makeMove(row, col, num);
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameState.selectedCell) return;

      const { row, col } = gameState.selectedCell;

      // Number keys 1-6
      if (e.key >= '1' && e.key <= '6') {
        // Start timer on first move
        if (gameState.moveCount === 0 && !gameState.isComplete) {
          startTimer();
        }
        const num = parseInt(e.key) as CellValue;
        makeMove(row, col, num);
        e.preventDefault();
      }

      // Delete, Backspace, 0 - clear cell
      if (e.key === 'Delete' || e.key === 'Backspace' || e.key === '0') {
        clearCell();
        e.preventDefault();
      }

      // Arrow keys - navigate
      if (e.key.startsWith('Arrow')) {
        e.preventDefault();
        let newRow = row;
        let newCol = col;

        switch (e.key) {
          case 'ArrowUp':
            newRow = Math.max(0, row - 1);
            break;
          case 'ArrowDown':
            newRow = Math.min(5, row + 1);
            break;
          case 'ArrowLeft':
            newCol = Math.max(0, col - 1);
            break;
          case 'ArrowRight':
            newCol = Math.min(5, col + 1);
            break;
        }

        selectCell({ row: newRow, col: newCol });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.selectedCell, gameState.moveCount, gameState.isComplete, makeMove, clearCell, selectCell, startTimer]);

  // Handle new game
  const handleNewGame = () => {
    resetGame(difficulty);
    selectCell(null);
  };

  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    resetGame(newDifficulty);
    selectCell(null);
  };

  // Toggle controls
  const toggleControls = () => {
    const newValue = !showControls;
    setShowControls(newValue);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sudoku-show-controls', JSON.stringify(newValue));
    }
  };

  // Toggle stats visibility
  const toggleStats = () => {
    const newValue = !showStats;
    setShowStats(newValue);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sudoku-show-stats', JSON.stringify(newValue));
    }
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(6, ${cellSize}px)`,
    gridTemplateRows: `repeat(6, ${cellSize}px)`,
    gap: '0px',
    margin: 'auto',
  };

  return (
    <div id="play-mini-sudoku" className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/40">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-12 sm:py-16">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-4 text-white tracking-tight">
            Mini Sudoku
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            A <span className="font-bold text-yellow-200">compact</span> and challenging Sudoku experience with <span className="font-bold text-yellow-200">2×3 blocks</span>
          </p>
        </div>
      </div>

      <div className={`w-full mx-auto px-2 sm:px-4 py-4 sm:py-8 ${showControls ? 'max-w-6xl' : 'max-w-2xl'}`}>
        <div className={`grid gap-4 sm:gap-6 lg:gap-8 transition-all duration-300 ${showControls ? 'lg:grid-cols-3' : 'lg:grid-cols-1'}`}>

          {/* Main Game Area */}
          <div className={`w-full min-w-0 transition-all duration-300 ${showControls ? 'lg:col-span-2' : 'lg:col-span-1'}`}>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-indigo-100 p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
              {/* Timer and Stats */}
              <div className="flex items-center justify-between mb-4">
                {showStats ? (
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl px-3 py-2 shadow-sm">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-indigo-900 font-mono text-base font-bold">
                        {formatTime(gameState.timeElapsed)}
                      </span>
                      <span className="text-primary text-sm font-medium">| Moves: {gameState.moveCount}</span>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}

                <div className="flex items-center gap-2">
                  {/* Stats Toggle */}
                  <button
                    onClick={toggleStats}
                    className="flex items-center justify-center w-10 h-10 bg-indigo-100 hover:bg-indigo-200 rounded-xl transition-all hover:scale-105"
                    aria-label={showStats ? 'Hide stats' : 'Show stats'}
                    title={showStats ? 'Hide timer and moves' : 'Show timer and moves'}
                  >
                    {showStats ? (
                      <EyeOff className="w-5 h-5 text-indigo-700" />
                    ) : (
                      <Eye className="w-5 h-5 text-indigo-700" />
                    )}
                  </button>

                  {/* Controls Toggle */}
                  <button
                    onClick={toggleControls}
                    className="lg:flex hidden items-center justify-center w-10 h-10 bg-indigo-100 hover:bg-indigo-200 rounded-xl transition-all hover:scale-105"
                    aria-label={showControls ? 'Hide controls' : 'Show controls'}
                  >
                    <svg
                      className={`w-5 h-5 text-indigo-700 transition-transform duration-300 ${showControls ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Game Grid */}
              <div className="flex justify-center mb-6">
                {isHydrated ? (
                  <div
                    className="bg-gradient-to-br from-white via-indigo-50/20 to-purple-50/30 p-5 rounded-3xl shadow-2xl border-4 border-indigo-600"
                    style={{ width: 'fit-content' }}
                  >
                    <div style={gridContainerStyle}>
                      {gameState.grid.map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                          <SudokuCell
                            key={`${rowIndex}-${colIndex}`}
                            cell={cell}
                            row={rowIndex}
                            col={colIndex}
                            size={cellSize}
                            isSelected={
                              gameState.selectedCell?.row === rowIndex &&
                              gameState.selectedCell?.col === colIndex
                            }
                            isHighlighted={highlightedCells.has(`${rowIndex}-${colIndex}`)}
                            animationDelay={highlightedCells.get(`${rowIndex}-${colIndex}`) || 0}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                          />
                        ))
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="w-64 h-64 bg-gray-100 animate-pulse rounded-2xl" />
                )}
              </div>

              {/* Number Input Pad - Always visible under game */}
              <div className="flex justify-center">
                <NumberPad
                  onNumberSelect={handleNumberInput}
                  onUndo={undoMove}
                  disabled={!gameState.selectedCell || gameState.isComplete}
                  canUndo={canUndo && !gameState.isComplete}
                  notesMode={gameState.notesMode}
                />
              </div>

              {/* Completion Message */}
              {gameState.isComplete && (
                <div className="mt-6 p-4 bg-green-50 border-2 border-green-300 rounded-lg text-center">
                  <h3 className="text-2xl font-bold text-green-800 mb-2">
                    🎉 Congratulations!
                  </h3>
                  <p className="text-green-700">
                    You solved the puzzle in {formatTime(gameState.timeElapsed)} with {gameState.moveCount} moves!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Controls Sidebar */}
          {showControls && (
            <div className="w-full min-w-0">
              <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 space-y-6">
                {/* Difficulty Selection */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Difficulty</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
                      <Button
                        key={diff}
                        onClick={() => handleDifficultyChange(diff)}
                        variant={difficulty === diff ? 'default' : 'outline'}
                        size="sm"
                        className="capitalize"
                      >
                        {diff}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Game Controls */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Controls</h3>
                  <div className="space-y-2">
                    <Button
                      onClick={toggleNotesMode}
                      variant={gameState.notesMode ? 'default' : 'outline'}
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Notes Mode {gameState.notesMode && '✓'}
                    </Button>

                    <Button
                      onClick={getHint}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      disabled={!gameState.selectedCell || gameState.isComplete}
                    >
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Get Hint
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={undoMove}
                        variant="outline"
                        size="sm"
                        disabled={!canUndo}
                      >
                        <RotateCcw className="w-4 h-4 mr-1" />
                        Undo
                      </Button>
                      <Button
                        onClick={redoMove}
                        variant="outline"
                        size="sm"
                        disabled={!canRedo}
                      >
                        <RotateCw className="w-4 h-4 mr-1" />
                        Redo
                      </Button>
                    </div>

                    <Button
                      onClick={clearCell}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      disabled={!gameState.selectedCell || gameState.isComplete}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Cell
                    </Button>
                  </div>
                </div>

                {/* New Game */}
                <div>
                  <Button
                    onClick={handleNewGame}
                    variant="default"
                    size="lg"
                    className="w-full"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    New Game
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
