import { AnimatePresence, motion } from "framer-motion";

type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
};

type Props = {
  heroMovies: Movie[];
  currentHero: number;
  setCurrentHero: (index: number) => void;
};

export default function HeroSlider({
  heroMovies,
  currentHero,
  setCurrentHero,
}: Props) {
  if (!heroMovies.length) return null;

 return (
  <div className="mx-auto max-w-[1400px] mt-10  px-6">
    
    <AnimatePresence mode="wait">
      <motion.div
        key={heroMovies[currentHero].id}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.9 }}
        className="relative h-[460px] rounded-[22px] overflow-hidden"
      >
        {/* BACKDROP */}
        <img
          src={`https://image.tmdb.org/t/p/original${heroMovies[currentHero].backdrop_path}`}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10" />

        {/* CONTENT */}
        <div className="absolute bottom-12 left-8 max-w-[520px] text-white">
          <h1 className="text-3xl font-bold leading-tight">
            {heroMovies[currentHero].title}
          </h1>

          <p className="mt-3 text-sm text-gray-200 line-clamp-3">
            {heroMovies[currentHero].overview}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-medium transition">
              Watch Now
            </button>

            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition">
              + Watchlist
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>

    {/* DOTS */}
    <div className="mt-4 flex justify-center items-center gap-2">
      {heroMovies.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentHero(index)}
          className={`
            transition-all duration-500 rounded-full
            ${
              currentHero === index
                ? "w-7 h-2 bg-purple-500"
                : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
            }
          `}
        />
      ))}
    </div>
  </div>
);
}