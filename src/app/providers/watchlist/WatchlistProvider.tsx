import {
    useState,
    type ReactNode,
    useEffect,
} from "react";
import { WatchlistContext } from "./WatchlistContext";
import type { ISavedMedia } from "../../../entities/movie/model/types";

interface WatchlistProviderProps {
    children: ReactNode;
}

const isSavedMediaArray = (value: unknown): value is ISavedMedia[] => {
    if (!Array.isArray(value)) {
        return false;
    }

    return value.every((el) => {
        if (typeof el !== "object" || el === null) {
            return false;
        }

        const item = el as Record<string, unknown>;

        return (
            typeof item.id === "string" &&
            typeof item.title === "string" &&
            typeof item.year === "number" &&
            typeof item.rating === "number" &&
            typeof item.posterUrl === "string" &&
            (item.type === "movie" || item.type === "tv")
        );
    });
};

const WatchlistProvider = ({ children }: WatchlistProviderProps) => {
    const [watchlist, setWatchlist] = useState<ISavedMedia[]>(() => {
        try {
            const cinegridWatchlist =
                localStorage.getItem("cinegrid-watchlist");

            if (!cinegridWatchlist) return [];
            const parsedCinegridWatchlist = JSON.parse(cinegridWatchlist);

            if (isSavedMediaArray(parsedCinegridWatchlist)) {
                return parsedCinegridWatchlist;
            } else {
                return [];
            }
        } catch (e) {
            console.error(e);
            return [];
        }
    });

    const [watched, setWatched] = useState<ISavedMedia[]>(() => {
        try {
            const cinegridWatched = localStorage.getItem("cinegrid-watched");

            if (!cinegridWatched) return [];
            const parsedCinegridWatched = JSON.parse(cinegridWatched);
            if (isSavedMediaArray(parsedCinegridWatched)) {
                return parsedCinegridWatched;
            } else {
                return [];
            }
        } catch (e) {
            console.error(e);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("cinegrid-watchlist", JSON.stringify(watchlist));
        localStorage.setItem("cinegrid-watched", JSON.stringify(watched));
    }, [watchlist, watched]);

    return (
        <WatchlistContext.Provider
            value={{ watchlist, setWatchlist, watched, setWatched }}
        >
            {children}
        </WatchlistContext.Provider>
    );
};

export default WatchlistProvider;
