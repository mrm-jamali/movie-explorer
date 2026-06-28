import { createContext, useContext } from "react";
// import type { Movie } from "../types/movie";
import type { MovieItem } from "../types/user";
import { useAuth } from "./AuthContext";

// type FavoriteMovie = {
//   id: number;
//   title: string;
//   poster: string;
//   release_date: string;
//   rating: number;
// };

type FavoriteContextType = {
  favorites:MovieItem[];
  toggleFavorite: (movie: MovieItem) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
};
const FavoriteContext =
  createContext<
    FavoriteContextType | null
  >(null);

export function FavoriteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    user,
    syncCurrentUser,
  } = useAuth();

  // const favorites =
  //   user?.favorites || [];
  const favorites: MovieItem[] = user?.favorites ?? [];

  const toggleFavorite = (movie: MovieItem) => {
    if (!user) return;

    const exists =
      user.favorites.some(
        (m) => m.id === movie.id
      );

    const updatedFavorites =
      exists
        ? user.favorites.filter(
            (m) => m.id !== movie.id
          )
        : [
            ...user.favorites,
            movie,
          ];

    const prevActivities =
      user.activities || [];

    const newActivity = {
      id: crypto.randomUUID(),
      type: "favorite" as const,
      movieId: movie.id,
      title: movie.title,
     poster_path: movie.poster_path,
      time: new Date().toISOString(),
    };

    const updatedActivities =
      exists
        ? prevActivities.filter(
            (a) =>
              !(
                a.type ===
                  "favorite" &&
                a.movieId === movie.id
              )
          )
        : [
            newActivity,
            ...prevActivities,
          ];

    const newNotification = {
      id: crypto.randomUUID(),
      type: "favorite" as const,
      title: "Favorites updated",
      text: exists
        ? `Removed ${movie.title} from favorites`
        : `Added ${movie.title} to favorites`,
      movieId: movie.id,
      time: new Date().toISOString(),
      read: false,
    };

    syncCurrentUser({
      ...user,
      favorites:
        updatedFavorites,

      activities:
        updatedActivities,

      notifications: [
        newNotification,
        ...(user.notifications ||
          []),
      ],
    });
  };

  const removeFavorite = (
    id: number
  ) => {
    if (!user) return;

    syncCurrentUser({
      ...user,

      favorites:
        user.favorites.filter(
          (m) => m.id !== id
        ),

      activities:
        user.activities.filter(
          (a) =>
            !(
              a.type ===
                "favorite" &&
              a.movieId === id
            )
        ),
    });
  };

  const isFavorite = (
    id: number
  ) =>
    user?.favorites.some(
      (m) => m.id === id
    ) ?? false;

  return ( 
    <FavoriteContext.Provider
      value={{
        favorites,
        toggleFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const ctx =
    useContext(
      FavoriteContext
    );

  if (!ctx) {
    throw new Error(
      "useFavorites must be inside provider"
    );
  }

  return ctx;
}