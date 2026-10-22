import { Box } from "@mui/material";
import { useWatchlist } from "../../../app/providers/watchlist/WatchlistProvider";
import { movies, tvShows } from "../../../entities/movie/model/mockMovies";
import MovieCard from "../../../entities/movie/ui/MovieCard";
import "./WatchlistPage.css";
import { Link } from "react-router";

const WatchlistPage = () => {
    const { watchlist } = useWatchlist();

    const allTitles = [...movies, ...tvShows];

    const watchlistItems = allTitles.filter((movie) =>
        watchlist.includes(movie.id),
    );

    return (
        <div className="watchlist-page">
            <div className="watchlist-page__heading">
                <div>
                    <h1>Watchlist</h1>
                    <p>Movies and shows you want to watch</p>
                </div>

                <span className="watchlist-page__count">
                    {watchlistItems.length} titles
                </span>
            </div>

            {watchlistItems.length === 0 ? (
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
                    {watchlistItems.map((item) => (
                        <MovieCard
                            id={item.id}
                            posterUrl={item.posterUrl}
                            rating={item.rating}
                            title={item.title}
                            year={item.year}
                            key={item.id}
                        />
                    ))}
                </Box>
            )}
        </div>
    );
};

export default WatchlistPage;
