import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import { fetchPopularMovies, fetchGenres } from "../services/movieApi";

import GenreFilter from "../components/GenreFilter";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

import type { Movie } from "../types/movie";
import QueryState from "../components/QueryState";

import { Film, Play, ChevronLeft, ChevronRight } from "lucide-react";

function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const movieSliderRef = useRef<HTMLDivElement | null>(null);
  const continueSliderRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["movies", 1],
    queryFn: () => fetchPopularMovies(1),
  });

  const { data: genresData } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  const movies = data?.results || [];

  const filteredMovies = movies.filter((movie: Movie) => {
    const matchGenre =
      selectedGenre === null || movie.genre_ids?.includes(selectedGenre);

    const matchSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchGenre && matchSearch;
  });

  const continueWatching = movies.slice(5, 12);

  // scroll handler for movies
  const scrollMovies = (direction: "left" | "right") => {
    if (!movieSliderRef.current) return;

    movieSliderRef.current.scrollBy({
      left: direction === "left" ? -240 : 240,
      behavior: "smooth",
    });
  };

  // scroll handler for continue watching
  const scrollContinue = (direction: "left" | "right") => {
    if (!continueSliderRef.current) return;

    continueSliderRef.current.scrollBy({
      left: direction === "left" ? -240 : 240,
      behavior: "smooth",
    });
  };

  return (
   <QueryState
  isLoading={isLoading}
  error={error}
>
    <div className="max-w-[1400px] mx-auto px-6">

      {/* SEARCH + FILTER */}
      <div className="flex items-center justify-between gap-6 flex-wrap mt-20 mb-6">
        <SearchBar onSearch={setSearch} />

        <GenreFilter
          genres={genresData?.genres || []}
          selectedGenre={selectedGenre}
          onSelectGenre={setSelectedGenre}
        />
      </div>

      {/* MOVIES HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Film size={18} className="text-purple-500" />
          Movies List
        </h2>

        <div className="flex items-center gap-2">
          <button onClick={() => scrollMovies("left")}>
            <ChevronLeft size={18} />
          </button>

          <button onClick={() => scrollMovies("right")}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* MOVIES */}
      <div ref={movieSliderRef} className="flex gap-5 overflow-hidden">
        {filteredMovies.map((movie: Movie) => (
          <div key={movie.id} className="w-[200px] flex-shrink-0">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {/* CONTINUE WATCHING */}
      <div className="flex items-center justify-between mt-10 mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Play size={18} className="text-purple-500" />
          Continue Watching
        </h2>

        <div className="flex items-center gap-2">
          <button onClick={() => scrollContinue("left")}>
            <ChevronLeft size={18} />
          </button>

          <button onClick={() => scrollContinue("right")}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div ref={continueSliderRef} className="flex gap-5 overflow-hidden">
        {continueWatching.map((movie: Movie) => (
          <div key={movie.id} className="w-[200px] flex-shrink-0">
            <MovieCard movie={movie} showFavorite={false} />
          </div>
        ))}
      </div>

    </div>
  </QueryState>
  );
}

export default HomePage;
