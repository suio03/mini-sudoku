import SudokuBoard from '@/components/Sudoku/SudokuBoard';
import Features from '@/components/Sudoku/Features';
import HowToPlay from '@/components/Sudoku/HowToPlay';
import Tips from '@/components/Sudoku/Tips';
import FAQ from '@/components/Sudoku/FAQ';
import RelatedGames from '@/components/Sudoku/RelatedGames';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/40">
      {/* Game Section */}
      <SudokuBoard />

      {/* Related Games */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-4">
        <RelatedGames />
      </div>

      {/* SEO Content Sections */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Keyword-Focused Mini Sudoku Intro */}
        <section id="about-mini-sudoku" aria-labelledby="about-mini-sudoku-heading" className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-indigo-100 p-6 sm:p-8 lg:p-10">
          <h2 id="about-mini-sudoku-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Play Mini Sudoku (6×6) — Fast, Fun, and Free
          </h2>
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed text-lg">
              Mini sudoku is a compact version of classic sudoku designed for quick, satisfying play sessions. Our
              mini sudoku uses a <strong className="text-indigo-600">6×6 grid</strong> with <strong className="text-purple-600">2×3 blocks</strong>, giving you the same logic and
              deduction you love—just faster. Whether you prefer an <strong className="text-indigo-600">easy mini sudoku</strong> to warm up, a balanced
              <strong className="text-purple-600"> medium mini sudoku</strong>, or a challenging <strong className="text-pink-600">hard mini sudoku</strong>, you can enjoy unlimited
              puzzles without sign‑up. Mini sudoku is perfect for short breaks, commutes, and daily brain training on desktop or mobile.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              If you are new to the genre, mini sudoku makes learning sudoku approachable. Because the grid is smaller, patterns
              appear sooner, and logical deductions are clearer. Mini sudoku focuses your attention on the essentials: rows, columns,
              and 2×3 blocks. You get all the strategy with less time spent scanning a large board. Advanced players also love mini sudoku
              for sharpening fundamentals, practicing techniques, and speed‑solving. Mini sudoku is simple to start, deep to master, and
              endlessly replayable.
            </p>
            
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mt-8 mb-4">What Makes Mini Sudoku Different?</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              Mini sudoku emphasizes quick logic over long scanning. On a 6×6 board, each placement has higher impact, making progress
              feel constant. With fewer cells per row and column, mini sudoku often reveals "naked singles" and "hidden singles" faster.
              If you enjoy the flow of deduction without the time commitment of 9×9, mini sudoku is ideal. Our generator ensures each
              mini sudoku has a unique solution and can be solved logically without guessing.
            </p>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mt-8 mb-4">How to Play Mini Sudoku</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              Fill the mini sudoku grid with numbers 1–6. Each row, each column, and each 2×3 block must contain all numbers 1–6 without
              repeats. Use pencil notes, check errors, and apply step‑by‑step reasoning. Mini sudoku rewards careful observation: consider
              intersections of a row and column, look for missing numbers, and scan blocks systematically. If you get stuck, use a hint to
              nudge your next move while keeping the logic intact.
            </p>
            <ul className="space-y-2 my-6">
              <li className="flex items-start gap-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <span className="text-indigo-600 font-bold text-lg flex-shrink-0">🎯</span>
                <span className="text-gray-800">Mini sudoku uses 2×3 blocks instead of 3×3.</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <span className="text-purple-600 font-bold text-lg flex-shrink-0">⌨️</span>
                <span className="text-gray-800">Mini sudoku supports full keyboard input and touch‑friendly controls.</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <span className="text-indigo-600 font-bold text-lg flex-shrink-0">↩️</span>
                <span className="text-gray-800">Mini sudoku includes undo/redo, notes mode, and optional hints.</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <span className="text-purple-600 font-bold text-lg flex-shrink-0">💾</span>
                <span className="text-gray-800">Mini sudoku tracks time and moves locally, with automatic saving.</span>
              </li>
            </ul>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mt-8 mb-4">Why Choose This Mini Sudoku?</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our mini sudoku is fast, clean, and privacy‑friendly. The interface is optimized for phones and desktops, the number pad is
              designed for comfortable tapping, and the board features clear 2×3 block borders. Mini sudoku puzzles are generated on demand
              with three difficulty levels—easy mini sudoku for beginners, medium mini sudoku for steady challenge, and hard mini sudoku for
              experts. Because mini sudoku loads quickly and saves progress automatically, it fits perfectly into a busy day.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Many players use mini sudoku to build daily consistency. Solving one mini sudoku a day creates a lightweight habit that improves
              pattern recognition and decision‑making. If you want to improve at full‑size sudoku, mini sudoku is the best practice ground:
              same rules, faster feedback. Mini sudoku helps you internalize techniques like scanning, elimination, pairs, and singles without
              feeling overwhelmed.
            </p>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mt-8 mb-4">Mini Sudoku Difficulty Levels</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              Choose a mini sudoku difficulty that matches your mood:
              easy mini sudoku (more starting clues and straightforward logic), medium mini sudoku (balanced deductions), and hard mini sudoku
              (fewer clues and tighter constraints). Switching difficulty is instant in the control panel, so you can move between easy mini sudoku
              and hard mini sudoku at any time.
            </p>
            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200 shadow-md">
              <p className="text-emerald-900 font-medium leading-relaxed text-lg">
                <span className="font-bold text-emerald-700">🎮 Ready to play?</span> Scroll to the board or use the buttons above to jump in. Mini sudoku is always free, always available, and always fun—no accounts, no paywalls. Bookmark this page and come back whenever you want a quick dose of logic. Mini sudoku awaits!
              </p>
            </div>
          </div>
        </section>
        {/* FAQ */}
        <section id="faq">
          <FAQ />
        </section>

      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 border-t-4 border-purple-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white text-sm font-medium">
            © 2025 Mini Sudoku 6×6. Free online Sudoku game. Play unlimited puzzles!
          </p>
          <p className="text-white/80 text-xs mt-2">
            All puzzles generated algorithmically • No sign-up required • Completely free
          </p>
        </div>
      </footer>
    </main>
  );
}
