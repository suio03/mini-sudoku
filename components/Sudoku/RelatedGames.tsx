import Link from 'next/link';
import Image from 'next/image';

const relatedGames = [
  {
    name: 'Tango Game unlimited',
    url: 'https://tangogameunlimited.app/',
    logo: '/other-game/tango.svg',
    category: 'Logic Puzzle',
    hoverColor: 'blue',
  },
  {
    name: 'Zip Game',
    url: 'https://zipgame.net/',
    logo: '/other-game/zip-game.svg',
    category: 'Logic Puzzle',
    hoverColor: 'green',
  },
  {
    name: 'Elemendle',
    url: 'https://elemendle.com/',
    logo: '/other-game/elemendle.svg',
    category: 'Chemistry Puzzle',
    hoverColor: 'purple',
  },
  {
    name: 'Bleachdle',
    url: 'https://bleachdle.app/',
    logo: '/other-game/bleachdle.svg',
    category: 'Anime Trivia',
    hoverColor: 'orange',
  },
];

const hoverStyles: Record<string, string> = {
  blue: 'hover:border-blue-400 hover:shadow-blue-200/70',
  green: 'hover:border-emerald-400 hover:shadow-emerald-200/70',
  purple: 'hover:border-purple-400 hover:shadow-purple-200/70',
  orange: 'hover:border-orange-400 hover:shadow-orange-200/70',
};

export default function RelatedGames() {
  return (
    <section
      aria-labelledby="related-games-heading"
      className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-indigo-100 shadow-xl p-6 sm:p-8 lg:p-10"
    >
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h2
            id="related-games-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
          >
            Discover More Creative Logic Games
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Love fast, brainy challenges? Try these curated mini-games from our friends in the puzzle, music, and trivia space.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {relatedGames.map(game => (
            <Link
              key={game.name}
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-4 rounded-xl border border-indigo-100 bg-gradient-to-br from-white via-indigo-50/40 to-purple-50/30 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                hoverStyles[game.hoverColor] ?? ''
              }`}
            >
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border border-indigo-100 bg-white">
                <Image src={game.logo} alt={`${game.name} logo`} fill sizes="56px" className="object-contain p-2" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-indigo-900 group-hover:text-indigo-700">
                  {game.name}
                </span>
                <span className="text-sm text-indigo-500 group-hover:text-indigo-600">{game.category}</span>
                <span className="mt-2 text-xs font-medium text-indigo-400 group-hover:text-indigo-600">
                  Play now ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
