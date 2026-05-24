import { useQuery } from "@tanstack/react-query";

import {
  fetchPopularMovies,
} from "../services/movieApi";

export const useMovies = (page: number) => {
  return useQuery({
    queryKey: ["movies", page],

    queryFn: async () => {
      const data =
        await fetchPopularMovies(page);

      return data;
    },
  });
};