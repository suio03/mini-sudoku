import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function MiniSudokuFeatures() {
  return (
    <div className="space-y-6">
      {/* Main Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⭐ Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="text-blue-600 text-2xl">🧩</div>
              <div>
                <div className="font-semibold text-blue-800">Unique Puzzles</div>
                <div className="text-blue-700 text-sm">
                  Every puzzle has exactly one solution, verified by our algorithm. No ambiguity, pure logic!
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="text-purple-600 text-2xl">♾️</div>
              <div>
                <div className="font-semibold text-purple-800">Unlimited Play</div>
                <div className="text-purple-700 text-sm">
                  Generate endless 6×6 puzzles. No daily limits, no paywalls. Play as many as you want, anytime!
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <div className="text-green-600 text-2xl">🎯</div>
              <div>
                <div className="font-semibold text-green-800">3 Difficulty Levels</div>
                <div className="text-green-700 text-sm">
                  Easy (20-24 clues), Medium (16-19 clues), Hard (12-15 clues). Perfect progression for all skill levels.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
              <div className="text-yellow-600 text-2xl">💡</div>
              <div>
                <div className="font-semibold text-yellow-800">Smart Hints</div>
                <div className="text-yellow-700 text-sm">
                  Get intelligent guidance without spoilers. Hints point to logical moves while you deduce the answer.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
              <div className="text-indigo-600 text-2xl">📝</div>
              <div>
                <div className="font-semibold text-indigo-800">Pencil Marks</div>
                <div className="text-indigo-700 text-sm">
                  Note-taking system to track candidate numbers. Toggle notes mode for strategic solving.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
              <div className="text-red-600 text-2xl">🔄</div>
              <div>
                <div className="font-semibold text-red-800">Undo/Redo</div>
                <div className="text-red-700 text-sm">
                  Freely experiment with different approaches. Unlimited undo and redo for stress-free solving.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg">
              <div className="text-pink-600 text-2xl">⚡</div>
              <div>
                <div className="font-semibold text-pink-800">Real-time Validation</div>
                <div className="text-pink-700 text-sm">
                  Instant error detection with red highlighting. Know immediately if you violate Sudoku rules.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg">
              <div className="text-teal-600 text-2xl">💾</div>
              <div>
                <div className="font-semibold text-teal-800">Auto-Save</div>
                <div className="text-teal-700 text-sm">
                  Every move is automatically saved. Close your browser and resume exactly where you left off.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
              <div className="text-orange-600 text-2xl">📱</div>
              <div>
                <div className="font-semibold text-orange-800">Mobile Optimized</div>
                <div className="text-orange-700 text-sm">
                  Touch-friendly number pad below the grid. Large tap targets, perfect for phones and tablets.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg">
              <div className="text-cyan-600 text-2xl">🎨</div>
              <div>
                <div className="font-semibold text-cyan-800">Wave Animations</div>
                <div className="text-cyan-700 text-sm">
                  Satisfying wave animation when you complete rows, columns, or 2×3 blocks. Visual celebration!
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-lime-50 to-lime-100 rounded-lg">
              <div className="text-lime-600 text-2xl">⌨️</div>
              <div>
                <div className="font-semibold text-lime-800">Keyboard Support</div>
                <div className="text-lime-700 text-sm">
                  Full keyboard navigation. Arrow keys for movement, 1-6 for input, Delete to erase. Fast solving!
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
              <div className="text-amber-600 text-2xl">📊</div>
              <div>
                <div className="font-semibold text-amber-800">Progress Tracking</div>
                <div className="text-amber-700 text-sm">
                  Track time, move count, and completion stats. Monitor your improvement over time.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Features removed to avoid duplication with intro/FAQ */}

      {/* Why Mini Sudoku */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ❓ Why Choose Mini Sudoku 6×6?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="text-2xl">⚡</div>
                <div>
                  <div className="font-semibold text-blue-900 mb-1">Quick & Satisfying</div>
                  <div className="text-blue-800 text-sm">
                    Complete puzzles in 5-15 minutes instead of 15-45 minutes. Perfect for short breaks,
                    commutes, or when you want quick mental stimulation without a long commitment.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎓</div>
                <div>
                  <div className="font-semibold text-green-900 mb-1">Perfect for Learning</div>
                  <div className="text-green-800 text-sm">
                    Less intimidating than 9×9 grids. Beginners can learn Sudoku strategies without feeling
                    overwhelmed. Master the logic first, then scale up if desired!
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📱</div>
                <div>
                  <div className="font-semibold text-purple-900 mb-1">Mobile-First Design</div>
                  <div className="text-purple-800 text-sm">
                    Compact 6×6 grid fits perfectly on phone screens. Number pad positioned for easy thumb access.
                    No pinch-to-zoom or scrolling needed!
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🧠</div>
                <div>
                  <div className="font-semibold text-orange-900 mb-1">Brain Training</div>
                  <div className="text-orange-800 text-sm">
                    Enhance logical thinking, pattern recognition, and problem-solving skills.
                    Quick sessions make daily practice easy and sustainable!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
