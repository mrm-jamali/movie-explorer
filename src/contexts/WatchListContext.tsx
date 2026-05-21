import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface WatchMovie {
  id: number;
  title: string;
  poster: string;
  release_date: string;
  rating: number;
}

interface WatchListContextType {
  watchList: WatchMovie[];

  toggleWatchList: (
    movie: WatchMovie
  ) => void;

  isInWatchList: (
    id: number
  ) => boolean;
}

const WatchListContext =
  createContext<
    WatchListContextType | undefined
  >(undefined);

export function WatchListProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [watchList, setWatchList] =
    useState<WatchMovie[]>([]);

  const toggleWatchList = (
    movie: WatchMovie
  ) => {
    setWatchList((prev) => {
      const exists = prev.some(
        (item) => item.id === movie.id
      );

      if (exists) {
        return prev.filter(
          (item) =>
            item.id !== movie.id
        );
      }

      return [...prev, movie];
    });
  };

  const isInWatchList = (
    id: number
  ) => {
    return watchList.some(
      (movie) => movie.id === id
    );
  };

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
  const context = useContext(
    WatchListContext
  );

  if (!context) {
    throw new Error(
      "useWatchList must be used inside WatchListProvider"
    );
  }

  return context;
}