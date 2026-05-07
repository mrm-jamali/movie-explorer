export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
    release_date: string;
  genre_ids: number[];
    vote_average: number;
};


export type MoviesResponse = {
  results: Movie[];
};


export type Genre = {
  id: number;
  name: string;
};

export type GenresResponse = {
  genres: Genre[];
};


