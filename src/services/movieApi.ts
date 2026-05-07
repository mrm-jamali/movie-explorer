import type {GenresResponse,MoviesResponse } from "../types/movie";



const BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = "f78cc0f4996abf0b855de7672aacf8e6";

export const fetchPopularMovies = async ():Promise<MoviesResponse> => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  
  if (!res.ok) {
    throw new Error("filed to fetch movie");
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
