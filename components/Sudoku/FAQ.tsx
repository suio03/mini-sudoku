import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

export default function MiniSudokuFAQ() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-600">Everything you need to know about Mini Sudoku 6×6</p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-2">
        <AccordionItem value="what-is" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">What is Mini Sudoku 6×6?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                Mini Sudoku is a compact version of traditional Sudoku using a 6×6 grid instead of 9×9.
                The grid is divided into six <strong>2×3 rectangular blocks</strong> (2 rows × 3 columns each).
              </p>
              <p>
                You fill the grid with numbers <strong>1-6</strong>, ensuring no duplicates in any row, column, or 2×3 block.
                It's perfect for quick 5-15 minute play sessions while providing the same logical satisfaction as full Sudoku!
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="why-6x6" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">Why 6×6 instead of 9×9?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <p>6×6 Mini Sudoku offers several advantages:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>⚡ Faster completion:</strong> 5-15 minutes vs 15-45 minutes for 9×9</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>🎯 Beginner friendly:</strong> Less intimidating for Sudoku newcomers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>📱 Mobile optimized:</strong> Better fit for phone screens</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>☕ Perfect for breaks:</strong> Quick mental exercise during coffee breaks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>🧠 Same logic:</strong> All the deduction and satisfaction of traditional Sudoku</span>
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Condensed: How to Play details removed (covered in intro/HowToPlay) */}

        {/* Merged keyboard + mobile info */}
        <AccordionItem value="devices" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">Is it mobile and keyboard friendly?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Mobile:</strong> Responsive layout, large tap targets, number pad below the grid.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Keyboard:</strong> Arrow keys to move, 1–6 to enter, Delete/Backspace/0 to erase.</span>
                </li>
              </ul>
              <p className="text-gray-600 italic mt-2">Play mini sudoku comfortably on any device.</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="hints" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">How do hints work?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <p>The hint system provides intelligent assistance:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Smart analysis:</strong> Analyzes current grid state to find next logical move</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Non-spoiling:</strong> Shows the cell to focus on, lets you deduce the number</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Learning tool:</strong> Helps you understand solving techniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Use sparingly:</strong> Best for when truly stuck, to develop solving skills</span>
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="errors" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">What do red cells mean?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <p>Red highlighting indicates rule violations:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span><strong>Row violation:</strong> Duplicate number in same row</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span><strong>Column violation:</strong> Duplicate number in same column</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span><strong>Block violation:</strong> Duplicate number in same 2×3 block</span>
                </li>
              </ul>
              <p className="text-gray-600 italic mt-2">Fix all violations to complete the puzzle successfully!</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="unique-solution" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">Are puzzles guaranteed to have unique solutions?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <p>Yes! Every puzzle is algorithmically verified to ensure:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Exactly one solution:</strong> No ambiguity or multiple valid completions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Logical solvability:</strong> Can be completed using pure deduction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>No guessing required:</strong> Every move can be logically determined</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Appropriate difficulty:</strong> Clue count matches selected difficulty level</span>
                </li>
              </ul>
              <p className="text-gray-600 italic mt-2">If you're stuck, there's always a logical next move to find!</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="difficulty" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">What are the difficulty levels?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <div className="grid gap-3">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="font-semibold text-green-800">🟢 Easy</div>
                  <div className="text-green-700 text-sm">
                    • 20-24 starting clues<br />
                    • ~5-8 minutes to solve<br />
                    • Perfect for beginners
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="font-semibold text-yellow-800">🟡 Medium</div>
                  <div className="text-yellow-700 text-sm">
                    • 16-19 starting clues<br />
                    • ~8-12 minutes to solve<br />
                    • Balanced challenge
                  </div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="font-semibold text-red-800">🔴 Hard</div>
                  <div className="text-red-700 text-sm">
                    • 12-15 starting clues<br />
                    • ~12-20 minutes to solve<br />
                    • Expert level
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="stats" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">What statistics are tracked?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <p>We track your progress locally in your browser:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Total puzzles completed</strong> by difficulty level</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Best completion times</strong> for each difficulty</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Average solve time</strong> to track improvement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Move count</strong> per puzzle</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Hints used</strong> for self-improvement tracking</span>
                </li>
              </ul>
              <p className="text-gray-600 italic mt-2">All stats are stored locally - no account or sign-up required!</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Separate mobile item removed (merged above) */}

        <AccordionItem value="progress" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">Will I lose my progress?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <p>No! The game features automatic saving:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Every move saved:</strong> All input is preserved instantly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Resume anytime:</strong> Close browser and continue exactly where you left off</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Survives refreshes:</strong> Reload the page without losing anything</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Timer preserved:</strong> Elapsed time continues from where you stopped</span>
                </li>
              </ul>
              <p className="text-gray-600 italic mt-2">Progress clears only when you click "New Game"</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="stuck" className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
            <span className="text-left font-medium">What should I do if I'm stuck?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <p>Try these strategies when stuck:</p>
              <ol className="space-y-2 pl-4 list-decimal">
                <li><strong>Use the hint button:</strong> Get guidance on the next logical move</li>
                <li><strong>Enable notes mode:</strong> Track candidates with pencil marks</li>
                <li><strong>Scan for naked singles:</strong> Look for cells with only one possibility</li>
                <li><strong>Check almost-complete rows/columns/blocks:</strong> Often reveal forced moves</li>
                <li><strong>Use undo freely:</strong> Backtrack and try different approaches</li>
                <li><strong>Take a break:</strong> Fresh perspective often reveals patterns you missed</li>
                <li><strong>Start systematically:</strong> Go number-by-number checking placement options</li>
              </ol>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
