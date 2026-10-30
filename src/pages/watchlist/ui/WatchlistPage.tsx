import { Box } from "@mui/material";
import { useWatchlist } from "../../../app/providers/watchlist/WatchlistContext";
import MovieCard from "../../../entities/movie/ui/MovieCard";
import "./WatchlistPage.css";
import { Link } from "react-router";

const WatchlistPage = () => {
    const { watchlist } = useWatchlist();

    return (
        <div className="watchlist-page">
            <div className="watchlist-page__heading">
                <div>
                    <h1>Watchlist</h1>
                    <p>Movies and shows you want to watch</p>
                </div>

                <span className="watchlist-page__count">
                    {watchlist.length} titles
                </span>
            </div>

            {watchlist.length === 0 ? (
                <div className="watchlist-page__empty">
                    <div className="watchlist-page__empty-icon">◷</div>

                    <h2>Your watchlist is empty</h2>

                    <p>
                        Keep track of movies and shows you want to watch.
                        Discover something interesting and save it for later.
                    </p>

                    <Link
                        className="watchlist-page__discover-button"
                        to="/discover"
                    >
                        Discover movies
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            ) : (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(180px, 1fr))",
                        gap: 3,
                    }}
                >
                    {watchlist.map((item) => (
                        <MovieCard
                            id={item.id}
                            posterUrl={item.posterUrl}
                            rating={item.rating}
                            title={item.title}
                            year={item.year}
                            key={`${item.type}:${item.id}`}
                            type={item.type}
                        />
                    ))}
                </Box>
            )}
        </div>
    );
};

export default WatchlistPage;
