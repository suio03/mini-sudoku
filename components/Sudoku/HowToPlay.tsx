import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function MiniSudokuHowToPlay() {
  return (
    <div className="space-y-6">
      {/* Overview removed to avoid duplication with landing intro */}

      {/* The Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📋 The Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="text-blue-600 font-bold text-xl">1️⃣</div>
              <div>
                <div className="font-semibold text-blue-800">Row Rule</div>
                <div className="text-blue-700 text-sm">
                  Each <strong>row</strong> must contain all numbers from 1 to 6 with no duplicates.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="text-green-600 font-bold text-xl">2️⃣</div>
              <div>
                <div className="font-semibold text-green-800">Column Rule</div>
                <div className="text-green-700 text-sm">
                  Each <strong>column</strong> must contain all numbers from 1 to 6 with no duplicates.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="text-purple-600 font-bold text-xl">3️⃣</div>
              <div>
                <div className="font-semibold text-purple-800">Block Rule (2×3)</div>
                <div className="text-purple-700 text-sm">
                  Each <strong>2×3 rectangular block</strong> (2 rows × 3 columns) must contain all numbers from 1 to 6 with no duplicates.
                  The blocks are horizontal rectangles with <strong>thick borders</strong> to help you see them clearly.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed How to Play steps removed to avoid duplication with Tips/FAQ */}

      {/* Visual Examples removed to reduce duplication */}

      {/* Game Controls removed (covered by UI) */}

      {/* Keyboard Shortcuts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⌨️ Keyboard Shortcuts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
              <kbd className="px-2 py-1 bg-gray-200 rounded text-sm font-mono">←↑→↓</kbd>
              <span className="text-sm">Navigate cells</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
              <kbd className="px-2 py-1 bg-gray-200 rounded text-sm font-mono">1-6</kbd>
              <span className="text-sm">Enter numbers</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
              <kbd className="px-2 py-1 bg-gray-200 rounded text-sm font-mono">Del</kbd>
              <span className="text-sm">Erase cell</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
              <kbd className="px-2 py-1 bg-gray-200 rounded text-sm font-mono">0</kbd>
              <span className="text-sm">Clear cell</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
