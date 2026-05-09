import { useEffect, useState } from "react";

type Props = {
  movie: any;
};

export default function AddFavorite({ movie }: Props) {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const handleFavorite = () => {
    const isExist = favorites.some((m) => m.id === movie.id);

    //  فقط ADD (نه remove)
    if (!isExist) {
      const updated = [...favorites, movie];

      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));

      console.log("🎬 Added to favorites:", movie.title); // 👈 خواسته تو
    }
  };

  const isFavorite = favorites.some((m) => m.id === movie.id);

  return (
    <button
      onClick={handleFavorite}
      className="bg-purple-500 text-white px-5 py-2 rounded-lg hover:bg-purple-600 transition w-fit flex items-center gap-2"
    >
       Add to Favorite

      {isFavorite && <span className="text-red-300">❤️</span>}
    </button>
  );
}