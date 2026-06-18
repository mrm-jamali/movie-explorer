import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchPopularMovies,
  fetchMovieVideos,
} from "../../services/movieApi";

type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
};

export default function HeroSlider() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchPopularMovies(1);

        const filteredMovies = data.results
          .filter((movie: any) => movie.backdrop_path)
          .slice(0, 5);

        setMovies(filteredMovies);
      } catch (error) {
        console.log(error);
      }
    };

    loadMovies();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === movies.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? movies.length - 1 : prev - 1
    );
  };

  if (!movies.length) {
    return (
      <div className="h-[220px] md:h-[360px] rounded-[20px] md:rounded-[30px] bg-gray-200 animate-pulse" />
    );
  }

  const currentMovie = movies[currentIndex];

  const handlePlay = async () => {
    try {
      const data = await fetchMovieVideos(currentMovie.id);

      const trailer = data.results.find(
        (video: any) =>
          video.type === "Trailer" &&
          video.site === "YouTube"
      );

      if (trailer) setTrailerKey(trailer.key);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-[20px] md:rounded-[30px] h-[220px] md:h-[360px] max-w-[1100px] mx-auto">

        {/* BACKDROP */}
        <img
          key={currentMovie.id}
          src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
          alt={currentMovie.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        {/* CONTENT */}
        <div className="relative z-10 flex h-full flex-col justify-center px-4 md:px-10">

          {/* TITLE */}
          <h2 className="max-w-[500px] text-[22px] md:text-[48px] leading-[28px] md:leading-[52px] font-bold tracking-[-1px] text-white">
            {currentMovie.title}
          </h2>

          {/* OVERVIEW */}
          <p className="mt-3 md:mt-5 max-w-[550px] text-[12px] md:text-[17px] leading-5 md:leading-8 text-white/90 line-clamp-2 md:line-clamp-3">
            {currentMovie.overview}
          </p>

          {/* BUTTONS */}
          <div className="mt-5 md:mt-8 flex items-center gap-3 md:gap-4">

            {/* PLAY */}
            <button
              onClick={handlePlay}
              className="h-[40px] md:h-[54px] px-4 md:px-7 rounded-full bg-[#7C3AED] text-white text-[12px] md:text-[15px] font-medium shadow-md hover:scale-[1.02] hover:bg-[#6D28D9] transition"
            >
              ▶ Play Now
            </button>

            {/* MORE INFO */}
            <button
              onClick={() =>
                navigate(`/movie/${currentMovie.id}`)
              }
              className="h-[40px] md:h-[54px] px-4 md:px-7 rounded-full border border-white/60 bg-white/10 backdrop-blur-md text-white text-[12px] md:text-[15px] font-medium hover:bg-white/20 transition"
            >
              More Info
            </button>

          </div>
        </div>

        {/* SLIDER BUTTONS */}
        <div className="absolute bottom-3 md:bottom-6 right-3 md:right-6 z-20 flex items-center gap-2 md:gap-3">

          <button
            onClick={prevSlide}
            className="h-9 w-9 md:h-11 md:w-11 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 flex items-center justify-center"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={nextSlide}
            className="h-9 w-9 md:h-11 md:w-11 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 flex items-center justify-center"
          >
            <ChevronRight size={18} />
          </button>

        </div>
      </div>

      {/* TRAILER */}
      {trailerKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-3">

          <div className="relative w-full max-w-[900px] h-[220px] sm:h-[350px] md:h-[500px]">

            <button
              onClick={() => setTrailerKey("")}
              className="absolute -top-10 right-0 text-white text-2xl"
            >
              ✕
            </button>

            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Trailer"
              allow="autoplay"
              allowFullScreen
              className="rounded-2xl"
            />
          </div>

        </div>
      )}
    </>
  );
}