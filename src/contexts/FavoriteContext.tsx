import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext<any>(null);

export function FavoriteProvider({ children }: any) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavorites = () => {
  return useContext(FavoriteContext);
};