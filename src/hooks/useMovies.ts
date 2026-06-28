import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "../services/movieApi";
import type { Movie } from "../types/movie";

type MoviesResponse = {
  results: Movie[];
   total_pages: number;
  page: number;
};

export const useMovies = (page: number) => {
  return useQuery<MoviesResponse>({
    queryKey: ["movies", page],

    queryFn: async () => {
      const data = await fetchPopularMovies(page);
      return data;
    },
  });
};