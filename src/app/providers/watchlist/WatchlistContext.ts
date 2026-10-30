import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ISavedMedia } from "../../../entities/movie/model/types";

interface WatchlistContextType {
    watchlist: ISavedMedia[];
    setWatchlist: Dispatch<SetStateAction<ISavedMedia[]>>;
    watched: ISavedMedia[];
    setWatched: Dispatch<SetStateAction<ISavedMedia[]>>;
}

export const WatchlistContext = createContext<WatchlistContextType | null>(
    null,
);

export const useWatchlist = () => {
    const context = useContext(WatchlistContext);

    if (context === null) {
        throw new Error("useWatchlist must be used within WatchlistProvider");
    }

    return context;
};
