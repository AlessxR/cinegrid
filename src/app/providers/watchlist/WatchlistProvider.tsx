import {
    createContext,
    useState,
    type ReactNode,
    type Dispatch,
    type SetStateAction,
    useContext,
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
    const [watchlist, setWatchlist] = useState<string[]>([]);

    return (
        <WatchlistContext.Provider value={{ watchlist, setWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => useContext(WatchlistContext);

export default WatchlistProvider;
