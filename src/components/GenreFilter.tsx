import { useState } from "react";
import type { Genre } from "../types/movie";

type Props = {
  genres: Genre[];
  selectedGenre: number | null;
  onSelectGenre: (id: number | null) => void;
};

export default function GenreFilter({
  genres,
  selectedGenre,
  onSelectGenre,
}: Props) {
  const [showAll, setShowAll] = useState(false);

  const selectedGenreIds = [28, 35, 18, 27, 10749, 878];

  const filteredGenres = selectedGenreIds
    .map((id) => genres.find((g) => g.id === id))
    .filter(Boolean) as Genre[];

  const visibleGenres = showAll ? filteredGenres : filteredGenres.slice(0, 5);

  return (
    <div className="flex flex-wrap gap-2 items-center">

      {visibleGenres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelectGenre(genre.id)}
          className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full transition cursor-pointer text-sm md:text-base ${
            selectedGenre === genre.id
              ? "bg-purple-500 text-white"
              : "bg-purple-100 text-purple-700 hover:bg-purple-200"
          }`}
        >
          {genre.name}
        </button>
      ))}

      {/* View All */}
      <button
        onClick={() => onSelectGenre(null)}
        className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full transition cursor-pointer text-sm md:text-base ${
          selectedGenre === null
            ? "bg-purple-500 text-white"
            : "bg-purple-100 text-purple-700 hover:bg-purple-200"
        }`}
      >
        View All
      </button>

      {/* Show More */}
      <button
        onClick={() => setShowAll((prev) => !prev)}
        className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
      >
        {showAll ? "Show Less" : "More"}
      </button>

    </div>
  );
}