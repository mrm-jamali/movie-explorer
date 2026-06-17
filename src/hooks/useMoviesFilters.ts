import { useState } from "react";

export function useMoviesFilters() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [year, setYear] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);

  const reset = () => {
    setPage(1);
    setSearch("");
    setSelectedGenres([]);
    setYear(0);
    setRating(0);
  };

  return {
    page,
    setPage,
    search,
    setSearch,
    selectedGenres,
    setSelectedGenres,
    year,
    setYear,
    rating,
    setRating,
    reset,
  };
}