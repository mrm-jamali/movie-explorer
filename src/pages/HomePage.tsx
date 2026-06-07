import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import {
  fetchPopularMovies,
  fetchGenres,
} from "../services/movieApi";

import GenreFilter from "../components/GenreFilter";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import HeroSlider from "../components/Hero";

import type { Movie } from "../types/movie";

import { Film, Play, ChevronLeft, ChevronRight } from "lucide-react";
import SkeletonCard from "../components/SkeletonCard";

function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const sliderRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["movies", 1],
    queryFn: () => fetchPopularMovies(1),
  });

  const { data: genresData } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  const movies = data?.results || [];

  const heroMovies =
    movies
      ?.filter((movie: Movie) => movie.backdrop_path)
      .slice(0, 6) || [];

  const filteredMovies = movies.filter((movie: Movie) => {
    const matchGenre =
      selectedGenre === null ||
      movie.genre_ids?.includes(selectedGenre);

    const matchSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchGenre && matchSearch;
  });

  const continueWatching = movies.slice(5, 12);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const amount = 240;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 mt-10">
        <div className="flex gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center">
        <p className="text-red-500 text-lg font-semibold mb-4">
          Something went wrong 😢
        </p>

        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {/* HERO */}
      <HeroSlider
        heroMovies={heroMovies}
        currentHero={0}
        setCurrentHero={() => {}}
      />

      {/* CONTENT */}
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

          {/* ARROWS */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="h-9 w-9 flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-100 transition"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => scroll("right")}
              className="h-9 w-9 flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-100 transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* MOVIES SLIDER */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-hidden scroll-smooth pb-4"
        >
          {filteredMovies.map((movie: Movie) => (
            <div
              key={movie.id}
              className="w-[190px] flex-shrink-0 hover:scale-[1.03] transition-transform duration-300"
            >
              <MovieCard
                id={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                release_date={movie.release_date}
                rating={movie.vote_average}
              />
            </div>
          ))}
        </div>

        {/* CONTINUE WATCHING */}
        <h2 className="text-xl font-bold mt-10 mb-4 flex items-center gap-2">
          <Play size={18} className="text-purple-500" />
          Continue Watching
        </h2>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
          {continueWatching.map((movie: Movie) => (
            <div
              key={movie.id}
              className="w-[200px] flex-shrink-0"
            >
              <MovieCard
                id={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                release_date={movie.release_date}
                rating={movie.vote_average}
              />
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

export default HomePage;