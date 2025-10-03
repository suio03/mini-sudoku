import React from 'react';
import { Button } from '@/components/ui/button';
import { CellValue } from '@/types/sudoku';
import { X, RotateCcw } from 'lucide-react';

interface NumberPadProps {
  onNumberSelect: (num: CellValue) => void;
  onUndo?: () => void;
  disabled?: boolean;
  canUndo?: boolean;
  notesMode?: boolean;
}

export default function NumberPad({
  onNumberSelect,
  onUndo,
  disabled,
  canUndo = true,
  notesMode
}: NumberPadProps) {
  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      {/* Number Grid - 3x2 layout */}
      <div className="grid grid-cols-4 gap-2">
        {/* First Row: 1, 2, 3, Erase */}
        <Button
          onClick={() => onNumberSelect(1)}
          disabled={disabled}
          variant="outline"
          size="lg"
          className="text-3xl font-bold h-16 bg-gray-100 hover:bg-gray-200 border-2 border-gray-300"
        >
          1
        </Button>
        <Button
          onClick={() => onNumberSelect(2)}
          disabled={disabled}
          variant="outline"
          size="lg"
          className="text-3xl font-bold h-16 bg-gray-100 hover:bg-gray-200 border-2 border-gray-300"
        >
          2
        </Button>
        <Button
          onClick={() => onNumberSelect(3)}
          disabled={disabled}
          variant="outline"
          size="lg"
          className="text-3xl font-bold h-16 bg-gray-100 hover:bg-gray-200 border-2 border-gray-300"
        >
          3
        </Button>
        <Button
          onClick={() => onNumberSelect(0)}
          disabled={disabled}
          variant="outline"
          size="lg"
          className="h-16 bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 flex flex-col items-center justify-center gap-0.5 disabled:opacity-40"
        >
          <X className="w-6 h-6" />
          <span className="text-xs font-medium">Erase</span>
        </Button>

        {/* Second Row: 4, 5, 6, Undo */}
        <Button
          onClick={() => onNumberSelect(4)}
          disabled={disabled}
          variant="outline"
          size="lg"
          className="text-3xl font-bold h-16 bg-gray-100 hover:bg-gray-200 border-2 border-gray-300"
        >
          4
        </Button>
        <Button
          onClick={() => onNumberSelect(5)}
          disabled={disabled}
          variant="outline"
          size="lg"
          className="text-3xl font-bold h-16 bg-gray-100 hover:bg-gray-200 border-2 border-gray-300"
        >
          5
        </Button>
        <Button
          onClick={() => onNumberSelect(6)}
          disabled={disabled}
          variant="outline"
          size="lg"
          className="text-3xl font-bold h-16 bg-gray-100 hover:bg-gray-200 border-2 border-gray-300"
        >
          6
        </Button>
        <Button
          onClick={onUndo}
          disabled={!canUndo}
          variant="outline"
          size="lg"
          className="h-16 bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 flex flex-col items-center justify-center gap-0.5 disabled:opacity-40"
        >
          <RotateCcw className="w-5 h-5" />
          <span className="text-xs font-medium">Undo</span>
        </Button>
      </div>
    </div>
  );
}
