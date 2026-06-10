export type MovieItem = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

export type Activity = {
  id: string;
  type: "favorite" | "watchlist";
  movieId: number;
  title: string;
  poster_path: string;
  time: string;
};

export type Notification = {
  id: string;
  type: "favorite" | "watchlist";
  title: string;
  text: string;
  movieId: number;
  time: string;
  read: boolean;
};

export type User = {
  id: string;

  username: string;
  email: string;
  password: string;

  avatar: string;
  location: string;
  joined: string;

  favorites: MovieItem[];
  watchlist: MovieItem[];

  activities: Activity[];

  notifications: Notification[];
};