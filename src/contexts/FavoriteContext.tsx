import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export type Movie = {
  id: number;
  title: string;
  poster: string;
  release_date: string;
  rating?: number;
  overview?: string;
};

type FavoriteContextType = {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
};

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export function FavoriteProvider({ children }: any) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // ✅ Load
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }

    const stored = localStorage.getItem(`favorites-${user.username}`);
    setFavorites(stored ? JSON.parse(stored) : []);
  }, [user]);

  // ✅ Sync helper
  const sync = (data: Movie[]) => {
    if (!user) return;

    setFavorites(data);
    localStorage.setItem(
      `favorites-${user.username}`,
      JSON.stringify(data)
    );
  };

  // ⭐ add/remove
  const toggleFavorite = (movie: Movie) => {
    if (!user) return;

    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id);

      const updated = exists
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie];

      localStorage.setItem(
        `favorites-${user.username}`,
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  // ❌ remove مستقیم (برای لیست)
  const removeFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.filter((m) => m.id !== id);

      localStorage.setItem(
        `favorites-${user.username}`,
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const isFavorite = (id: number) =>
    favorites.some((m) => m.id === id);

  return (
    <FavoriteContext.Provider
      value={{ favorites, toggleFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavorites = () => {
  const ctx = useContext(FavoriteContext);

  if (!ctx) throw new Error("useFavorites must be inside provider");

  return ctx;
};