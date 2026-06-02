import { createContext, useContext } from "react";
import type { Movie } from "../types/movie";
import { useAuth } from "./AuthContext";

type FavoriteContextType = {
  favorites: number[];
  toggleFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
};

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export function FavoriteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, syncCurrentUser } = useAuth();

  /* =========================
     TOGGLE FAVORITE
  ========================= */
  const toggleFavorite = (movie: Movie) => {
    if (!user) return;

    const exists = user.favorites.includes(movie.id);

    const updatedFavorites = exists
      ? user.favorites.filter((id) => id !== movie.id)
      : [...user.favorites, movie.id];

    /* =========================
       NEW NOTIFICATION
    ========================= */
    const newNotification = {
      id: crypto.randomUUID(),
      type: "favorite" as const,
      title: "Favorites updated",
      message: exists
        ? `Removed ${movie.title} from favorites`
        : `Added ${movie.title} to favorites`,
      movieId: movie.id,
      time: new Date().toISOString(),
      read: false,
    };

    syncCurrentUser({
      ...user,
      favorites: updatedFavorites,
      notifications: [
        newNotification,
        ...(user.notifications || []),
      ],
    });
  };

  /* =========================
     REMOVE FAVORITE (manual)
  ========================= */
  const removeFavorite = (id: number) => {
    if (!user) return;

    syncCurrentUser({
      ...user,
      favorites: user.favorites.filter((m) => m !== id),
    });
  };

  /* =========================
     CHECK FAVORITE
  ========================= */
  const isFavorite = (id: number) =>
    user?.favorites.includes(id) ?? false;

  return (
    <FavoriteContext.Provider
      value={{
        favorites: user?.favorites || [],
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
  const ctx = useContext(FavoriteContext);

  if (!ctx) {
    throw new Error("useFavorites must be inside provider");
  }

  return ctx;
}