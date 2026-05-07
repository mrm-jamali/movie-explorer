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
  const selectedGenreIds = [28, 35, 18, 27, 10749, 878];

  const filteredGenres = selectedGenreIds
    .map((id) => genres.find((g) => g.id === id))
    .filter(Boolean) as Genre[];

  return (
    <div className="flex items-center justify-between gap-6 flex-wrap">

      {/* 🎭 Genres */}
      <div className="flex gap-2 flex-wrap">
        {filteredGenres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onSelectGenre(genre.id)}
            className={`px-4 py-2 rounded-full transition cursor-pointer ${
              selectedGenre === genre.id
                ? "bg-purple-500 text-white"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* 👀 View All */}
      <button
        onClick={() => onSelectGenre(null)}
        className={`px-4 py-2 rounded-full transition cursor-pointer ${
          selectedGenre === null
            ? "bg-purple-500 text-white"
            : "bg-purple-100 text-purple-700 hover:bg-purple-200"
        }`}
      >
        View All
      </button>

    </div>
  );
}