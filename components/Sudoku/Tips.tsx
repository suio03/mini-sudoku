import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function MiniSudokuTips() {
  return (
    <div className="space-y-6">
      {/* Beginner Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🌟 Beginner Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">1</div>
              <div>
                <div className="font-semibold text-green-800 mb-1">Start with High-Clue Areas</div>
                <div className="text-green-700 text-sm">
                  Look for rows, columns, or 2×3 blocks that already have the most given numbers.
                  These are the easiest to complete because you have fewer possibilities to consider.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">2</div>
              <div>
                <div className="font-semibold text-blue-800 mb-1">Find Naked Singles</div>
                <div className="text-blue-700 text-sm">
                  A "naked single" is a cell where only one number can fit. Check the cell's row, column,
                  and 2×3 block - if 5 numbers are already used, the 6th must go there!
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">3</div>
              <div>
                <div className="font-semibold text-purple-800 mb-1">Use Pencil Marks</div>
                <div className="text-purple-700 text-sm">
                  Toggle "Notes Mode" to mark possible candidate numbers in small text.
                  This prevents mental overload and helps you spot patterns more easily.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="bg-yellow-100 text-yellow-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">4</div>
              <div>
                <div className="font-semibold text-yellow-800 mb-1">Check Row-Column Intersections</div>
                <div className="text-yellow-700 text-sm">
                  Where a row and column cross, both constraints apply. If a number is used in the row
                  or column, it can't go in that intersection cell. Use both to narrow possibilities.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-pink-50 rounded-lg border border-pink-200">
              <div className="bg-pink-100 text-pink-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">5</div>
              <div>
                <div className="font-semibold text-pink-800 mb-1">Don't Forget the 2×3 Blocks!</div>
                <div className="text-pink-700 text-sm">
                  The horizontal rectangular blocks (marked with thick borders) are crucial.
                  Many beginners forget to check block constraints - don't make that mistake!
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🧠 Advanced Strategies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
              <div className="font-semibold text-indigo-800 mb-2">🔍 Hidden Singles</div>
              <div className="text-indigo-700 text-sm mb-2">
                Even if a cell has multiple candidates, check if one of them can ONLY go in that cell
                within its row, column, or block. That makes it the answer!
              </div>
              <div className="text-xs text-indigo-600 bg-indigo-100 p-2 rounded">
                Example: If number 3 can only fit in one cell of a row (even if that cell has other candidates), 3 must go there.
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-pink-50 to-red-50 rounded-lg border border-pink-200">
              <div className="font-semibold text-pink-800 mb-2">👥 Naked Pairs</div>
              <div className="text-pink-700 text-sm mb-2">
                If two cells in the same row, column, or block both have the exact same two candidates,
                those numbers must go in those cells - eliminate them from all other cells in that unit.
              </div>
              <div className="text-xs text-pink-600 bg-pink-100 p-2 rounded">
                Example: Two cells both show {2,5} as candidates → remove 2 and 5 from all other cells in that row/column/block.
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
              <div className="font-semibold text-green-800 mb-2">🔗 Block-Line Interaction</div>
              <div className="text-green-700 text-sm mb-2">
                If a number in a 2×3 block can only appear in one row or column of that block,
                you can eliminate that number from the rest of that row or column outside the block.
              </div>
              <div className="text-xs text-green-600 bg-green-100 p-2 rounded">
                Example: Number 4 must be in top row of a block → eliminate 4 from rest of that row.
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
              <div className="font-semibold text-orange-800 mb-2">🎯 Process of Elimination</div>
              <div className="text-orange-700 text-sm mb-2">
                When solving gets tough, ask "what can't go here?" instead of "what goes here?"
                Eliminate impossible numbers to reveal the answer.
              </div>
              <div className="text-xs text-orange-600 bg-orange-100 p-2 rounded">
                Example: If placing each candidate (1-6) violates a rule except one, that's your answer!
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
              <div className="font-semibold text-blue-800 mb-2">🔢 Systematic Scanning</div>
              <div className="text-blue-700 text-sm mb-2">
                Go number-by-number (1 through 6) and scan where each can be placed across the entire grid.
                This methodical approach often reveals placements you'd miss with random scanning.
              </div>
              <div className="text-xs text-blue-600 bg-blue-100 p-2 rounded">
                Technique: "Where can all the 1's go? Now where can all the 2's go?" etc.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Mistakes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⚠️ Common Mistakes to Avoid
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <div className="text-red-600 text-xl">❌</div>
              <div>
                <div className="font-semibold text-red-800">Guessing Instead of Logic</div>
                <div className="text-red-700 text-sm">
                  Every puzzle is solvable through pure deduction. If you're guessing, you're missing a logical step.
                  Use hints or take a break instead.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <div className="text-red-600 text-xl">❌</div>
              <div>
                <div className="font-semibold text-red-800">Ignoring 2×3 Block Constraints</div>
                <div className="text-red-700 text-sm">
                  The rectangular blocks are just as important as rows and columns.
                  Always check all three constraints (row, column, block) before placing a number.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <div className="text-red-600 text-xl">❌</div>
              <div>
                <div className="font-semibold text-red-800">Not Using Pencil Marks</div>
                <div className="text-red-700 text-sm">
                  Trying to track all possibilities in your head leads to errors.
                  Use notes mode to write down candidates - it's not cheating, it's smart solving!
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <div className="text-red-600 text-xl">❌</div>
              <div>
                <div className="font-semibold text-red-800">Ignoring Error Highlights</div>
                <div className="text-red-700 text-sm">
                  Red cells show immediate feedback when you violate rules.
                  Fix these errors as soon as they appear - they'll compound and confuse you later.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <div className="text-red-600 text-xl">❌</div>
              <div>
                <div className="font-semibold text-red-800">Being Afraid to Undo</div>
                <div className="text-red-700 text-sm">
                  Experimentation is part of learning! Use undo freely to test hypotheses.
                  There's no penalty - it's a tool, not a failure.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Approach */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🛠️ Step-by-Step Solving Approach
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <div className="text-blue-600 font-bold shrink-0">Step 1:</div>
              <div className="text-blue-800 text-sm">
                <div className="font-medium">Scan for Naked Singles</div>
                <div>Find cells where only one number can fit based on row, column, and block constraints.</div>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
              <div className="text-purple-600 font-bold shrink-0">Step 2:</div>
              <div className="text-purple-800 text-sm">
                <div className="font-medium">Fill Pencil Marks</div>
                <div>Enable notes mode and mark candidates for empty cells. This reveals patterns.</div>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
              <div className="text-green-600 font-bold shrink-0">Step 3:</div>
              <div className="text-green-800 text-sm">
                <div className="font-medium">Look for Hidden Singles</div>
                <div>Check if any candidate can only go in one cell within its row, column, or block.</div>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <div className="text-yellow-600 font-bold shrink-0">Step 4:</div>
              <div className="text-yellow-800 text-sm">
                <div className="font-medium">Scan Systematically</div>
                <div>Go number-by-number (1, 2, 3, 4, 5, 6) checking placement across entire grid.</div>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
              <div className="text-orange-600 font-bold shrink-0">Step 5:</div>
              <div className="text-orange-800 text-sm">
                <div className="font-medium">Repeat with New Information</div>
                <div>Each placement reveals new constraints. Go back to Step 1 and continue the cycle.</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pro Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💎 Pro Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div className="font-semibold text-blue-800 mb-1">🎯 Start at Corners</div>
              <div className="text-blue-700 text-xs">
                Corner cells belong to fewer units, making them easier to deduce. Start from edges and work inward.
              </div>
            </div>

            <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="font-semibold text-purple-800 mb-1">⏰ Take Breaks</div>
              <div className="text-purple-700 text-xs">
                Stuck for 3+ minutes? Step away for 30 seconds. Fresh eyes spot patterns you've been missing.
              </div>
            </div>

            <div className="p-3 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg border border-green-200">
              <div className="font-semibold text-green-800 mb-1">📐 Use Symmetry</div>
              <div className="text-green-700 text-xs">
                Many puzzles have symmetric patterns in clue placement. Recognizing this can guide your solving.
              </div>
            </div>

            <div className="p-3 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
              <div className="font-semibold text-orange-800 mb-1">🔄 Practice Daily</div>
              <div className="text-orange-700 text-xs">
                Solve one puzzle daily to build pattern recognition. Consistency beats marathon sessions!
              </div>
            </div>

            <div className="p-3 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg border border-red-200">
              <div className="font-semibold text-red-800 mb-1">🎓 Learn from Mistakes</div>
              <div className="text-red-700 text-xs">
                When you use undo, understand WHY the previous move was wrong. That's how you improve.
              </div>
            </div>

            <div className="p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
              <div className="font-semibold text-cyan-800 mb-1">⚡ Speed Comes Later</div>
              <div className="text-cyan-700 text-xs">
                Focus on accuracy first. Speed develops naturally as pattern recognition improves with practice.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
