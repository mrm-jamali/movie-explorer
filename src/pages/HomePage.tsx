import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies, fetchGenres } from "../services/movieApi";
import MovieCard from "../components/MovieCard";

import Hero from "../components/Hero";
import GenreFilter from "../components/GenreFilter";

import type { Movie, MoviesResponse, GenresResponse } from "../types/movie";
import { useState } from "react";
import { Play } from "lucide-react";
import { Film } from "lucide-react";


function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  // 🎬 Movies
  const { data, isLoading, error } = useQuery<MoviesResponse>({
    queryKey: ["movie"],
    queryFn: fetchPopularMovies,
  });
    console.log(data?.results?.[0]);

  // 🎭 Genres
  const { data: genresData } = useQuery<GenresResponse>({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  if (isLoading) return <p>isLoading...</p>;
  if (error) return <p>something went wrong</p>;

  const heroMovie = data?.results?.[0];

  //  filter movies by genre
  const filteredMovies = selectedGenre
    ? data?.results?.filter((movie) =>
        (movie.genre_ids ?? []).includes(selectedGenre)
      )
    : data?.results;

  //  Continue Watching (mock section)
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

      {/*  MAIN */}
      
          <div className="max-w-[1400px] mx-auto px-6">

        {/*  Genres */}
     
<h2 className="text-xl font-bold mt-10 mb-0 flex items-center gap-2">
  <Film size={18} className="text-purple-500" />
  Movies List
</h2>

        <GenreFilter
          genres={genresData?.genres || []}
          selectedGenre={selectedGenre}
          onSelectGenre={setSelectedGenre}
        />

        {/*  Movies */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide mt-4">
          <div className="flex gap-4 w-max">
            {filteredMovies?.map((movie: Movie) => (
              <div key={movie.id} className="w-[160px] flex-shrink-0">
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

        {/*  Continue Watching */}
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