import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export type Movie = {
  id: number;
  title: string;
  poster: string;
  release_date: string;
  overview?: string;
};

type FavoriteContextType = {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
};

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const [favorites, setFavorites] = useState<Movie[]>([]);

  // 📥 Load favorites from current user
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }

    const storedFavorites = user.favorites || [];
    setFavorites(storedFavorites as any);
  }, [user]);

  // 🔄 Sync helper to localStorage (currentUser + users)
  const syncUser = (updatedUser: any) => {
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const updatedUsers = users.map((u: any) =>
      u.id === updatedUser.id ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // ⭐ add/remove favorite
  const toggleFavorite = (movie: Movie) => {
    if (!user) return;

    const exists = user.favorites.includes(movie.id);

    const updatedFavorites = exists
      ? user.favorites.filter((id: number) => id !== movie.id)
      : [...user.favorites, movie.id];

    const updatedUser = {
      ...user,
      favorites: updatedFavorites,
    };

    syncUser(updatedUser);

    setFavorites(updatedFavorites as any);
  };

  // ❌ remove directly
  const removeFavorite = (id: number) => {
    if (!user) return;

    const updatedFavorites = user.favorites.filter(
      (movieId: number) => movieId !== id
    );

    const updatedUser = {
      ...user,
      favorites: updatedFavorites,
    };

    syncUser(updatedUser);

    setFavorites(updatedFavorites as any);
  };

  // ✅ check favorite
  const isFavorite = (id: number) =>
    user?.favorites.includes(id) ?? false;

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

export const useFavorites = () => {
  const ctx = useContext(FavoriteContext);

  if (!ctx) {
    throw new Error("useFavorites must be inside FavoriteProvider");
  }

  return ctx;
};