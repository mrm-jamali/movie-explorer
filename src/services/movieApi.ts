import type {GenresResponse,MoviesResponse } from "../types/movie";



const BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = "f78cc0f4996abf0b855de7672aacf8e6";


export const fetchPopularMovies = async (page: number): Promise<MoviesResponse> => {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );

  if (!res.ok) {
    throw new Error("failed to fetch movies");
  }

  return res.json();
};





export const fetchFilteredMovies = async (
    page: number,
  genres: number[],
  year: number,
    rating: number
): Promise<MoviesResponse> => {

  const genreQuery =
    genres.length > 0
      ? `&with_genres=${genres.join(",")}`
      : "";

  const yearQuery = `&primary_release_year=${year}`;

    const ratingQuery =
    rating > 0 ? `&vote_average.gte=${rating}` : "";
    

  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}${genreQuery}${yearQuery}${ratingQuery}&sort_by=release_date.desc`
  );

  if (!res.ok) {
    throw new Error("failed to fetch movies");
  }

  return res.json();
};








export const fetchGenres = async (): Promise<GenresResponse> => {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch genres");
  }

  return res.json();
};


export const fetchSearchMovies = async (query: string) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${query}`
  );
  return res.json();
};


export const fetchMovieDetails = async (id: string) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch movie");
  return res.json();
};

export const fetchMovieCredits = async (id: string) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
  );

  if (!res.ok) throw new Error("Failed to fetch credits");
  return res.json();
};

export const fetchSimilarMovies = async (id: string) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`
  );

  if (!res.ok) throw new Error("Failed to fetch similar movies");
  return res.json();
};