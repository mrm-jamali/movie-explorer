import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { fetchMovieVideos } from "../services/movieApi";
import { Play, Plus } from "lucide-react";
type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  // videoKey?: string;   // اگر داری اضافه کن
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
  const [showVideo, setShowVideo] = useState(false);
  const [currentVideoKey, setCurrentVideoKey] = useState<string>("");

  if (!heroMovies.length) return null;

  const currentMovie = heroMovies[currentHero];

  const handleWatchNow = async () => {
    try {
      const data = await fetchMovieVideos(currentMovie.id);
      const results = data?.results || [];

      const trailer =
        results.find(
          (v: any) => v.type === "Trailer" && v.site === "YouTube",
        ) || results.find((v: any) => v.site === "YouTube");

      if (!trailer?.key) {
        console.warn("No trailer found for this movie");
        return;
      }

      setCurrentVideoKey(trailer.key);
      setShowVideo(true);
    } catch (error) {
      console.log("API ERROR:", error);
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] mt-10 px-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9 }}
          className="relative h-[460px] rounded-[22px] overflow-hidden"
        >
          {/* BACKDROP */}
          <img
            src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10" />

          {/* CONTENT */}
          <div className="absolute bottom-12 left-8 max-w-[520px] text-white">
            <h1 className="text-3xl font-bold leading-tight">
              {currentMovie.title}
            </h1>

            <p className="mt-3 text-sm text-gray-200 line-clamp-3">
              {currentMovie.overview}
            </p>

       <div className="mt-5 flex items-center gap-3">

  {/* WATCH NOW */}
  <button
    onClick={handleWatchNow}
    className="flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-purple-600 hover:bg-purple-700 rounded-2xl text-base md:text-lg font-semibold text-white transition"
  >
    <Play size={20} />
    Watch Now
  </button>

  {/* WATCHLIST */}
  <button
    className="flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-base md:text-lg font-semibold text-white transition"
  >
    <Plus size={20} />
    Watchlist
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

      {/* Video Player */}
      {showVideo && (
        <VideoPlayer
          videoKey={currentVideoKey}
          onClose={() => setShowVideo(false)}
        />
      )}
    </div>
  );
}
