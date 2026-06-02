import {
  createContext,
  useContext,
  ReactNode,
} from "react";

import { useAuth } from "./AuthContext";

interface WatchMovie {
  id: number;
  title: string;
  poster: string;
  release_date: string;
  rating: number;
}

interface WatchListContextType {
  watchList: number[];
  toggleWatchList: (movie: WatchMovie) => void;
  isInWatchList: (id: number) => boolean;
}

const WatchListContext =
  createContext<WatchListContextType | undefined>(undefined);

export function WatchListProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user, syncCurrentUser } = useAuth();

  const watchList = user?.watchlist || [];

  const toggleWatchList = (movie: WatchMovie) => {
    if (!user) return;

    const exists = user.watchlist.includes(movie.id);

    const updatedWatchlist = exists
      ? user.watchlist.filter((id) => id !== movie.id)
      : [...user.watchlist, movie.id];

    // ✅ safe activities
    const prevActivities = user.activities || [];

    const newActivity = {
      id: crypto.randomUUID(),
      type: "watchlist" as const,
      movieId: movie.id,
      title: movie.title,
      poster: movie.poster,
      time: new Date().toISOString(),
    };

    const updatedActivities = exists
      ? prevActivities.filter(
          (a) => a.movieId !== movie.id
        )
      : [newActivity, ...prevActivities];

    syncCurrentUser({
      ...user,
      watchlist: updatedWatchlist,
      activities: updatedActivities,
    });
  };

  const isInWatchList = (id: number) =>
    user?.watchlist.includes(id) ?? false;

  return (
    <WatchListContext.Provider
      value={{
        watchList,
        toggleWatchList,
        isInWatchList,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
}

export function useWatchList() {
  const context = useContext(WatchListContext);

  if (!context) {
    throw new Error(
      "useWatchList must be used inside WatchListProvider"
    );
  }

  return context;
}