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
}

const WatchlistContext = createContext<WatchlistContextType>({
    watchlist: [],
    setWatchlist: () => {},
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

    useEffect(() => {
        localStorage.setItem("cinegrid-watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    return (
        <WatchlistContext.Provider value={{ watchlist, setWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => useContext(WatchlistContext);

export default WatchlistProvider;
