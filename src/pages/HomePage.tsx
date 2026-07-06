import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import HeroSlider from "../components/Hero";
import { fetchPopularMovies, fetchGenres } from "../services/movieApi";
import { useEffect } from "react";
import GenreFilter from "../components/GenreFilter";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/movie";
import QueryState from "../components/QueryState";
import { Film, Play, ChevronLeft, ChevronRight } from "lucide-react";

function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [currentHero, setCurrentHero] = useState(0);
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
  const heroMovies =
    movies?.filter((movie: Movie) => movie.backdrop_path).slice(0, 6) || [];
  useEffect(() => {
    if (!heroMovies.length) return;

    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev === heroMovies.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [heroMovies]);

  return (
    <QueryState isLoading={isLoading} error={error}>
      <HeroSlider
        heroMovies={heroMovies}
        currentHero={currentHero}
        setCurrentHero={setCurrentHero}
      />

      <div className="max-w-[1400px] mx-auto px-6">
        {/* SEARCH + FILTER */}

        {/* <div className="flex items-center justify-between gap-6 flex-wrap mt-20 mb-6">

        <SearchBar onSearch={setSearch} />
        



        <GenreFilter

          genres={genresData?.genres || []}

          selectedGenre={selectedGenre}

          onSelectGenre={setSelectedGenre}

        />

      </div> */}

        {/* <div className="mt-20 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
  
  <SearchBar onSearch={setSearch} />

  <GenreFilter
    genres={genresData?.genres || []}
    selectedGenre={selectedGenre}
    onSelectGenre={setSelectedGenre}
  />

</div> */}
        {/* SEARCH + GENRE FILTER - Fully Responsive */}
{/* SEARCH + GENRE FILTER */}
{/* SEARCH + GENRE FILTER */}
{/* SEARCH + GENRE FILTER */}
{/* SEARCH + GENRE FILTER */}
<div className="mt-20 mb-6 w-full">
  <div className="flex flex-col lg:flex-row gap-5 lg:items-center">
    
    {/* SearchBar */}
    <div className="w-full lg:flex-1 min-w-0">
      <SearchBar onSearch={setSearch} />
    </div>

    {/* Genre Filter */}
    <div className="w-full lg:w-auto lg:flex-shrink-0">
      <GenreFilter
        genres={genresData?.genres || []}
        selectedGenre={selectedGenre}
        onSelectGenre={setSelectedGenre}
      />
    </div>

  </div>
</div>
        {/* MOVIES HEADER */}

        <div className="flex items-center justify-between mb-4 mt-8 lg:mt-16">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Film size={18} className="text-purple-500" />
            Movies List
          </h2>

          <div className="flex items-center gap-2">
           <button
  onClick={() => scrollMovies("left")}
  className="
    h-9 
    w-9 
    flex 
    items-center 
    justify-center 
    rounded-full 
    bg-white 
    shadow 
    cursor-pointer
    hover:bg-purple-500
    hover:text-white
    transition-colors
  "
>
  <ChevronLeft size={18} />
</button>

           <button
  onClick={() => scrollMovies("right")}
  className="
    h-9 
    w-9 
    flex 
    items-center 
    justify-center 
    rounded-full 
    bg-white 
    shadow 
    cursor-pointer
    hover:bg-purple-500
    hover:text-white
    transition-colors
  "
>
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

        <div className="flex items-center justify-between mt-8 lg:mt-16 mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Play size={18} className="text-purple-500" />
            Continue Watching
          </h2>

          <div className="flex items-center gap-2">
         <button
  onClick={() => scrollContinue("left")}
  className="
    h-9 
    w-9 
    flex 
    items-center 
    justify-center 
    rounded-full 
    bg-white 
    shadow 
    cursor-pointer
    hover:bg-purple-500
    hover:text-white
    transition-colors
  "
>
  <ChevronLeft size={18} />
</button>

          <button
  onClick={() => scrollContinue("right")}
  className="
    h-9 
    w-9 
    flex 
    items-center 
    justify-center 
    rounded-full 
    bg-white 
    shadow 
    cursor-pointer
    hover:bg-purple-500
    hover:text-white
    transition-colors
  "
>
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
