import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import {
  fetchPopularMovies,
  fetchGenres,
} from "../services/movieApi";

import Hero from "../components/Hero";
import GenreFilter from "../components/GenreFilter";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

import type {
  Movie,
  MoviesResponse,
  GenresResponse,
} from "../types/movie";

import {
  Film,
  Play,
} from "lucide-react";

import SkeletonCard from "../components/SkeletonCard";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

function HomePage() {

  const [selectedGenre, setSelectedGenre] =
    useState<number | null>(null);

  const [search, setSearch] =
    useState("");

  // 🎬 HERO CURRENT INDEX
  const [currentHero, setCurrentHero] =
    useState(0);

  /* =========================================
     MOVIES
  ========================================= */

  const {
    data,
    isLoading,
    error,
  } = useQuery<MoviesResponse>({
    queryKey: ["movies", 1],
    queryFn: () =>
      fetchPopularMovies(1),
  });

  /* =========================================
     GENRES
  ========================================= */

  const { data: genresData } =
    useQuery<GenresResponse>({
      queryKey: ["genres"],
      queryFn: fetchGenres,
    });

  /* =========================================
     HERO MOVIES
  ========================================= */

  const heroMovies =
    data?.results
      ?.filter(
        (movie) =>
          movie.backdrop_path
      )
      .slice(0, 6) || [];

  /* =========================================
     AUTO SLIDER
  ========================================= */

  useEffect(() => {

    if (!heroMovies.length) return;

    const interval =
      setInterval(() => {

        setCurrentHero((prev) =>
          prev === heroMovies.length - 1
            ? 0
            : prev + 1
        );

      }, 4000);

    return () =>
      clearInterval(interval);

  }, [heroMovies.length]);

  /* =========================================
     LOADING
  ========================================= */

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

  /* =========================================
     ERROR
  ========================================= */

  if (error || !data) {

    return (

      <div
        className="
          flex flex-col
          items-center
          justify-center
          mt-20
          text-center
        "
      >

        <p
          className="
            text-red-500
            text-lg
            font-semibold
            mb-4
          "
        >
          Something went wrong 😢
        </p>

        <button
          onClick={() =>
            window.location.reload()
          }
          className="
            px-4 py-2
            bg-purple-500
            text-white
            rounded-full
            hover:bg-purple-600
            transition
          "
        >
          Retry
        </button>

      </div>

    );

  }

  const movies =
    data.results;

  /* =========================================
     FILTER
  ========================================= */

  const filteredMovies =
    movies.filter(
      (movie: Movie) => {

        const matchGenre =
          selectedGenre === null ||
          movie.genre_ids?.includes(
            selectedGenre
          );

        const matchSearch =
          movie.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        return (
          matchGenre &&
          matchSearch
        );

      }
    );

  /* =========================================
     CONTINUE WATCHING
  ========================================= */

  const continueWatching =
    movies.slice(5, 12);

  return (

    <>

      {/* =====================================
          HERO SLIDER
      ====================================== */}

      {heroMovies.length > 0 && (

        <div
          className="
            relative
            overflow-hidden
          "
        >

          <AnimatePresence mode="wait">

            <motion.div
              key={
                heroMovies[currentHero]
                  .id
              }

              initial={{
                opacity: 0,
                scale: 1.04,
              }}

              animate={{
                opacity: 1,
                scale: 1,
              }}

              exit={{
                opacity: 0,
                scale: 0.98,
              }}

              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
            >

              <Hero
                title={
                  heroMovies[currentHero]
                    .title
                }
                backdrop={
                  heroMovies[currentHero]
                    .backdrop_path
                }
                overview={
                  heroMovies[currentHero]
                    .overview
                }
              />

            </motion.div>

          </AnimatePresence>

          {/* DOTS */}
          <div
            className="
              absolute
              bottom-6
              left-1/2
              -translate-x-1/2
              flex items-center
              gap-3
              z-30
            "
          >

            {heroMovies.map(
              (_, index) => (

                <button
                  key={index}
                  onClick={() =>
                    setCurrentHero(index)
                  }
                  className={`
                    rounded-full
                    transition-all
                    duration-500

                    ${
                      currentHero === index
                        ? `
                          w-8
                          h-3
                          bg-white
                        `
                        : `
                          w-3
                          h-3
                          bg-white/40
                          hover:bg-white/70
                        `
                    }
                  `}
                />

              )
            )}

          </div>

        </div>

      )}

      {/* =====================================
          CONTENT
      ====================================== */}

      <div
        className="
          max-w-[1400px]
          mx-auto
          px-6
        "
      >

        {/* SEARCH + FILTER */}
        <div
          className="
            flex items-center
            justify-between
            gap-6
            flex-wrap
            mt-20
            mb-6
          "
        >

          <SearchBar
            onSearch={setSearch}
          />

          <GenreFilter
            genres={
              genresData?.genres || []
            }
            selectedGenre={
              selectedGenre
            }
            onSelectGenre={
              setSelectedGenre
            }
          />

        </div>

        {/* MOVIES */}
        <h2
          className="
            text-xl
            font-bold
            mb-3
            flex items-center
            gap-2
          "
        >

          <Film
            size={18}
            className="
              text-purple-500
            "
          />

          Movies List

        </h2>

        <div
          className="
            flex
            gap-4
            overflow-x-auto
            scrollbar-hide
            mt-4
          "
        >

          <div
            className="
              flex
              gap-4
              w-max
            "
          >

            {filteredMovies.map(
              (movie: Movie) => (

                <div
                  key={movie.id}
                  className="
                    w-[180px]
                    flex-shrink-0
                  "
                >

                  <MovieCard
                    id={movie.id}
                    title={movie.title}
                    poster={movie.poster_path}
                    release_date={movie.release_date}
                    rating={movie.vote_average}
                  />

                </div>

              )
            )}

          </div>

        </div>

        {/* CONTINUE WATCHING */}
        <h2
          className="
            text-xl
            font-bold
            mt-10
            mb-4
            flex items-center
            gap-2
          "
        >

          <Play
            size={18}
            className="
              text-purple-500
            "
          />

          Continue Watching

        </h2>

        <div
          className="
            flex
            gap-6
            overflow-x-auto
            scrollbar-hide
            pb-4
          "
        >

          {continueWatching.map(
            (movie: Movie) => (

              <div
                key={movie.id}
                className="
                  w-[200px]
                  flex-shrink-0
                "
              >

                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  poster={movie.poster_path}
                  release_date={movie.release_date}
                  rating={movie.vote_average}
                />

              </div>

            )
          )}

        </div>

      </div>

    </>

  );

}

export default HomePage;