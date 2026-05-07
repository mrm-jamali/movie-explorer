import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { fetchPopularMovies, fetchGenres } from "../services/movieApi";

import Hero from "../components/Hero";
import GenreFilter from "../components/GenreFilter";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

import type { Movie, MoviesResponse, GenresResponse } from "../types/movie";

import { Film, Play } from "lucide-react";
import SkeletonCard from "../components/SkeletonCard";

function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  // 🎬 Movies
  const { data, isLoading, error } = useQuery<MoviesResponse>({
    queryKey: ["movies"],
    queryFn: fetchPopularMovies,
  });

  // 🎭 Genres
  const { data: genresData } = useQuery<GenresResponse>({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

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
   

 if (error) {
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

  const heroMovie = data?.results?.[0];

  // 🎯 filter (genre + search)
  const filteredMovies = data?.results?.filter((movie: Movie) => {
    const matchGenre =
      selectedGenre === null ||
      movie.genre_ids?.includes(selectedGenre);

    const matchSearch =
      movie.title.toLowerCase().includes(search.toLowerCase());

    return matchGenre && matchSearch;
  });

  // ▶ continue watching (mock)
  const continueWatching = data?.results?.slice(5, 12);

  return (
    <>
      {/* HERO */}
      {heroMovie && (
        <Hero
          title={heroMovie.title}
          backdrop={heroMovie.backdrop_path}
          overview={heroMovie.overview}
        />
      )}

      {/* MAIN */}
      <div className="max-w-[1400px] mx-auto px-6">

        {/* 🔍 SEARCH + 🎭 GENRES (کنار هم) */}
        <div className="flex items-center justify-between gap-6 flex-wrap mt-20 mb-6">
          

          <SearchBar onSearch={setSearch} />

          <GenreFilter
            genres={genresData?.genres || []}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />

        </div>

        {/* TITLE */}
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Film size={18} className="text-purple-500" />
          Movies List
        </h2>

        {/* MOVIES */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide mt-4">
          <div className="flex gap-4 w-max">
            {filteredMovies?.map((movie: Movie) => (
              <div key={movie.id} className="w-[180px] flex-shrink-0">
                <MovieCard
                  title={movie.title}
                  poster={movie.poster_path}
                  release_date={movie.release_date}
                  rating={movie.vote_average}
                   id={movie.id}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CONTINUE WATCHING */}
        <h2 className="text-xl font-bold mt-10 mb-4 flex items-center gap-2">
          <Play size={18} className="text-purple-500" />
          Continue Watching
        </h2>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
          {continueWatching?.map((movie: Movie) => (
            <div key={movie.id} className="w-[200px] flex-shrink-0">
              <MovieCard
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