import {
  createContext,
  useContext,
 
} from "react";
import type { ReactNode } from "react";

import { useAuth } from "./AuthContext";

/* =========================
   TYPES
========================= */

export interface WatchMovie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface WatchListContextType {
  watchList: WatchMovie[];
  toggleWatchList: (movie: WatchMovie) => void;
  isInWatchList: (id: number) => boolean;
}

/* =========================
   CONTEXT
========================= */

const WatchListContext =
  createContext<WatchListContextType | undefined>(undefined);

/* =========================
   PROVIDER
========================= */

export function WatchListProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user, syncCurrentUser } = useAuth();

  const watchList: WatchMovie[] = user?.watchlist || [];

  const toggleWatchList = (movie: WatchMovie) => {
    if (!user) return;

    const exists = user.watchlist.some(
      (m) => m.id === movie.id
    );

    const updatedWatchlist: WatchMovie[] = exists
      ? user.watchlist.filter((m) => m.id !== movie.id)
      : [...user.watchlist, movie];

    const prevActivities = user.activities || [];

    const newActivity = {
      id: crypto.randomUUID(),
      type: "watchlist" as const,
      movieId: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
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
    user?.watchlist.some((m) => m.id === id) ?? false;

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

/* =========================
   HOOK
========================= */

export function useWatchList() {
  const context = useContext(WatchListContext);

  if (!context) {
    throw new Error(
      "useWatchList must be used inside WatchListProvider"
    );
  }

  return context;
}