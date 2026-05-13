import { create } from "zustand";

type FilterStore = {
  selectedGenres: number[];
  setSelectedGenres: (genres: number[]) => void;

  releaseYear: number;
  setReleaseYear: (year: number) => void;

  rating: number;
  setRating: (rating: number) => void;

  resetFilters: () => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  selectedGenres: [],
  releaseYear: 2024,
  rating: 0,

  setSelectedGenres: (genres) =>
    set({ selectedGenres: genres }),

  setReleaseYear: (year) =>
    set({ releaseYear: year }),

  setRating: (rating) =>
    set({ rating }),

  resetFilters: () =>
    set({
      selectedGenres: [],
      releaseYear: 2024,
      rating: 0,
    }),
}));