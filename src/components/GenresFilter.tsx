import { useState } from "react";
import { useFilterStore } from "../store/filterStore";
import { fetchGenres } from "../services/movieApi";
import { useQuery } from "@tanstack/react-query";

type Genre = {
  id: number;
  name: string;
};

export default function GenresFilter() {
  const selectedGenres = useFilterStore(
    (state) => state.selectedGenres
  );

  const setSelectedGenres = useFilterStore(
    (state) => state.setSelectedGenres
  );

  const [showAll, setShowAll] = useState(false);

const { data, isLoading, error } = useQuery({
  queryKey: ["genres"],
  queryFn: fetchGenres,
});
const genres: Genre[] = data?.genres ?? [];

  const visibleGenres = showAll
    ? genres
    : genres.slice(0, 6);

  const toggleGenre = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(
        selectedGenres.filter(
          (id) => id !== genreId
        )
      );
    } else {
      setSelectedGenres([
        ...selectedGenres,
        genreId,
      ]);
    }
  };
  

  return (
    <div className="pb-7 border-b border-gray-100">

      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-[#111827]">
          Genres
        </h3>

        <button
          onClick={() => setShowAll(!showAll)}
        >
          ⌃
        </button>
      </div>

      <div className="space-y-4">
      {isLoading && <p>Loading...</p>}
  {error && <p>Error loading genres</p>}

        {visibleGenres.map((genre) => (
          <label
            key={genre.id}
            className="flex items-center gap-3 cursor-pointer"
          >

            <input
              type="checkbox"
              checked={selectedGenres.includes(
                genre.id
              )}
              onChange={() =>
                toggleGenre(genre.id)
              }
            />

            <span className="text-gray-500">
              {genre.name}
            </span>

          </label>
        ))}

      </div>

      
  <button
  onClick={() => setShowAll(prev => !prev)}
  className="mt-5 text-[#6C4EFF] text-sm font-medium"
>
  {showAll ? "Show Less" : "Show More"}
</button>

    </div>
  );
}