# 🎮 Mini Sudoku 6×6

**A compact and challenging Sudoku experience with 2×3 blocks!**

Perfect for quick brain training sessions, commutes, and daily logic practice. Mini Sudoku offers the same strategic depth as classic Sudoku but in a faster, more accessible format.

🔗 **[Play Now →](https://mini-sudoku.app)**

## 🌟 Features

### 🚀 **Unlimited Play**
- Play as many puzzles as you want
- Generate new puzzles instantly
- No sign-up required

### 🎯 **Multiple Difficulty Levels**
- **Easy** - More clues, straightforward logic
- **Medium** - Balanced challenge
- **Hard** - Fewer clues, advanced techniques required

### 🎮 **Full-Featured Game Experience**
- **Notes Mode** - Pencil marks for candidate numbers
- **Hints** - Get a nudge when stuck
- **Undo/Redo** - Easily correct mistakes
- **Timer & Move Tracking** - Monitor your progress
- **Auto-save** - Never lose your progress

### ✨ **Modern Design**
- **Beautiful UI** - Purple/indigo gradient theme
- **Mobile Responsive** - Perfect on phones, tablets, and desktop
- **Smooth Animations** - Celebrate completed rows/columns/blocks
- **Keyboard Support** - Full keyboard navigation and input

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mini-sudoku.git
   cd mini-sudoku
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Play

### Basic Rules
1. **Fill the 6×6 grid** with numbers 1-6
2. **Each row** must contain all numbers 1-6 exactly once
3. **Each column** must contain all numbers 1-6 exactly once
4. **Each 2×3 block** must contain all numbers 1-6 exactly once

### Controls
- **Click cell** to select it
- **Number keys (1-6)** to fill in numbers
- **Arrow keys** to navigate between cells
- **Delete/Backspace** to clear a cell
- **Notes mode** for pencil marks
- **Hints** when you get stuck

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: React hooks with custom game logic
- **Deployment**: Ready for [Vercel](https://vercel.com/), [Netlify](https://netlify.com/), or any static host

## 📁 Project Structure

```
mini-sudoku/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with SEO metadata
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles with modern theme
├── components/            # React components
│   ├── Sudoku/           # Game-specific components
│   │   ├── SudokuBoard.tsx # Main game interface
│   │   ├── SudokuCell.tsx  # Individual puzzle cells
│   │   ├── NumberPad.tsx   # Number input pad
│   │   ├── HowToPlay.tsx   # Game instructions
│   │   └── ...             # Other game components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
│   └── useSudokuGameState.ts
├── lib/                  # Utility libraries
│   ├── sudoku/          # Game logic
│   │   ├── generator.ts # Puzzle generation
│   │   ├── solver.ts    # Puzzle solving logic
│   │   └── validation.ts # Rule validation
│   └── utils.ts         # General utilities
├── types/               # TypeScript type definitions
│   └── sudoku.ts        # Game type definitions
└── public/             # Static assets
```

## 🎮 Game Logic

### Puzzle Generation
- Uses backtracking algorithms
- Generates puzzles with unique solutions
- Adjustable difficulty based on number of clues
- Ensures solvability through logical deduction

### Validation System
- Real-time rule checking
- Visual feedback for errors
- Highlights completed rows/columns/blocks

### Statistics Tracking
- Local storage for game statistics
- Completion times and move counts
- Win rates per difficulty level

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/dashboard)
3. Deploy automatically with zero configuration

### Manual Deployment
```bash
# Build the project
pnpm build

# The build output is ready for deployment
pnpm start
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with clear messages**
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push and create a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use existing component patterns
- Maintain the modern purple/indigo design theme
- Update documentation for new features

## 📊 SEO & Marketing

This project is optimized for users searching:
- "Mini Sudoku 6×6"
- "Sudoku 2×3 blocks"
- "Quick Sudoku game"
- "Mini Sudoku free"

### Key SEO Features
- Optimized meta tags and descriptions
- Structured data for search engines
- Mobile-first responsive design
- Fast page load times

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by classic Sudoku puzzles
- Community feedback and contributions

---

**Love the game?** ⭐ Star this repository and share it with puzzle enthusiasts!

**Want a quick brain workout?** 🎮 [Play now](https://mini-sudoku.app) - no sign-up required!
