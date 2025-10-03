export default function MiniSudokuTipsGuide() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Mini Sudoku Tips & Strategies</h1>
      <p className="text-gray-700 mb-6">
        Improve your mini sudoku skills with practical techniques for 6×6 grids. Start with beginner tips, then
        progress to advanced strategies that speed up solving and reduce mistakes.
      </p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Beginner Tips</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Start with rows, columns, or 2×3 blocks that have the most clues.</li>
          <li>Look for naked singles where only one number can fit in a cell.</li>
          <li>Use pencil notes to track candidates and reveal patterns.</li>
          <li>Check intersections of constrained rows and columns.</li>
          <li>Remember to verify the 2×3 block constraints.</li>
        </ul>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-2xl font-semibold">Advanced Strategies</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Hidden singles within a row, column, or 2×3 block.</li>
          <li>Naked pairs to eliminate candidates from peer cells.</li>
          <li>Block–line interactions to remove candidates outside a block.</li>
          <li>Systematic scanning: sweep 1 through 6 across the grid.</li>
          <li>Process of elimination when multiple candidates remain.</li>
        </ul>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-2xl font-semibold">Practice Habits</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Play one mini sudoku daily to build pattern recognition.</li>
          <li>Use undo to learn from mistakes instead of guessing.</li>
          <li>Take short breaks if stuck; fresh eyes help.</li>
        </ul>
      </section>
    </main>
  );
}


