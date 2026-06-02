export type User = {
  id: string;

  username: string;
  email: string;
  password: string;

  avatar: string;
  location: string;
  joined: string;

  favorites: number[];
  watchlist: number[];


  activities: {
    id: string;
    type: "favorite" | "watchlist";
    movieId: number;
    title: string;
    poster: string;
    time: string;
  }[];

  notifications: {
  id: string;
  type: "favorite" | "watchlist";
  title: string;
  text: string;
  movieId: number;
  time: string;
  read: boolean;
}[];
};