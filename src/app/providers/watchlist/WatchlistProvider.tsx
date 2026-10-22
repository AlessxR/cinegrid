import {
    createContext,
    useState,
    type ReactNode,
    type Dispatch,
    type SetStateAction,
    useContext,
    useEffect,
} from "react";

interface WatchlistProviderProps {
    children: ReactNode;
}

interface WatchlistContextType {
    watchlist: string[];
    setWatchlist: Dispatch<SetStateAction<string[]>>;

    watched: string[];
    setWatched: Dispatch<SetStateAction<string[]>>;
}

const WatchlistContext = createContext<WatchlistContextType>({
    watchlist: [],
    setWatchlist: () => {},

    watched: [],
    setWatched: () => {},
});

const WatchlistProvider = ({ children }: WatchlistProviderProps) => {
    const [watchlist, setWatchlist] = useState<string[]>(() => {
        try {
            const cinegridWatchlist =
                localStorage.getItem("cinegrid-watchlist");

            if (!cinegridWatchlist) return [];
            return JSON.parse(cinegridWatchlist);
        } catch (e) {
            console.error(e);
            return [];
        }
    });

    const [watched, setWatched] = useState<string[]>(() => {
        try {
            const cinegridWatched = localStorage.getItem("cinegrid-watched");

            if (!cinegridWatched) return [];
            return JSON.parse(cinegridWatched);
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

export const useWatchlist = () => useContext(WatchlistContext);

export default WatchlistProvider;
