import React from 'react';
import { SudokuCell as SudokuCellType } from '@/types/sudoku';

interface SudokuCellProps {
  cell: SudokuCellType;
  row: number;
  col: number;
  size: number;
  isSelected: boolean;
  isHighlighted?: boolean;
  animationDelay?: number;
  onClick: () => void;
}

export default function SudokuCell({
  cell,
  row,
  col,
  size,
  isSelected,
  isHighlighted = false,
  animationDelay = 0,
  onClick
}: SudokuCellProps) {
  const cellSize = Math.min(size * 0.9, 70); // Max size of 70px, with 90% of available space

  // Determine if cell has thick borders (2×3 block boundaries)
  const hasThickTop = row % 2 === 0 && row !== 0;
  const hasThickBottom = row === 5;
  const hasThickLeft = col % 3 === 0 && col !== 0;
  const hasThickRight = col === 5;

  const getCellClasses = () => {
    let classes = 'relative cursor-pointer transition-all duration-200 flex items-center justify-center font-bold rounded-sm';

    // Base styling
    if (cell.isGiven) {
      classes += ' bg-gradient-to-br from-blue-50 to-blue-100 text-blue-900';
    } else {
      classes += ' bg-white text-gray-900 hover:bg-blue-50/50';
    }

    // Selected cell
    if (isSelected) {
      classes += ' ring-4 ring-blue-500 ring-inset z-10';
    }

    // Error highlighting
    if (cell.hasError) {
      classes += ' bg-red-50 text-red-600';
    }

    // Pointer for interactive cells
    if (!cell.isGiven) {
      classes += ' hover:shadow-lg';
    } else {
      classes += ' cursor-default';
    }

    return classes;
  };

  const getBorderStyles = () => {
    const style: React.CSSProperties = {
      borderWidth: '1px',
      borderColor: '#d1d5db', // gray-300
    };

    // Add thick borders for 2×3 blocks
    if (hasThickTop) {
      style.borderTopWidth = '3px';
      style.borderTopColor = '#374151'; // gray-700
    }
    if (hasThickBottom) {
      style.borderBottomWidth = '3px';
      style.borderBottomColor = '#374151';
    }
    if (hasThickLeft) {
      style.borderLeftWidth = '3px';
      style.borderLeftColor = '#374151';
    }
    if (hasThickRight) {
      style.borderRightWidth = '3px';
      style.borderRightColor = '#374151';
    }

    return style;
  };

  const renderContent = () => {
    // Show number if cell has value
    if (cell.value !== 0) {
      const fontSize = Math.min(cellSize * 0.5, 32);
      return (
        <span
          className={isHighlighted ? 'animate-wave-bounce' : ''}
          style={{
            fontSize: `${fontSize}px`,
            animationDelay: isHighlighted ? `${animationDelay}ms` : '0ms',
          }}
        >
          {cell.value}
        </span>
      );
    }

    // Show pencil marks/notes if available
    if (cell.notes.size > 0) {
      const noteSize = Math.min(cellSize * 0.2, 10);
      const notes = Array.from(cell.notes).sort();

      return (
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 p-1 gap-0.5">
          {[1, 2, 3, 4, 5, 6].map(num => {
            const isActive = notes.includes(num);
            return (
              <div
                key={num}
                className="flex items-center justify-center text-gray-400"
                style={{ fontSize: `${noteSize}px` }}
              >
                {isActive ? num : ''}
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={getCellClasses()}
      style={{
        width: cellSize,
        height: cellSize,
        minWidth: cellSize,
        minHeight: cellSize,
        ...getBorderStyles(),
      }}
      onClick={onClick}
      title={cell.isGiven ? 'Given clue' : 'Click to input number'}
    >
      {renderContent()}

      {/* Error indicator with diagonal stripes */}
      {cell.hasError && (
        <div
          className="absolute inset-0 pointer-events-none opacity-30 rounded-sm"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              #ef4444 0,
              #ef4444 2px,
              transparent 2px,
              transparent 6px
            )`,
          }}
        />
      )}
    </div>
  );
}
