import { Box } from "@mui/material";
import { useWatchlist } from "../../../app/providers/watchlist/WatchlistProvider";
import { movies, tvShows } from "../../../entities/movie/model/mockMovies";
import "./LibraryPage.css";
import MovieCard from "../../../entities/movie/ui/MovieCard";

const LibraryPage = () => {
    const { watched } = useWatchlist();
    const allTitles = [...movies, ...tvShows];
    const watchedItems = allTitles.filter((movie) =>
        watched.includes(movie.id),
    );

    return (
        <div className="library-page">
            <div className="library-page__heading">
                <div>
                    <h1>My Library</h1>
                    <p>Your personal movie collection</p>
                </div>

                <span className="library-page__count">
                    {watchedItems.length} movies
                </span>
            </div>

            <div className="library-page__filters">
                <button
                    className="library-page__filter library-page__filter--active"
                    type="button"
                >
                    All movies
                </button>

                <button className="library-page__filter" type="button">
                    Watched
                </button>

                <button className="library-page__filter" type="button">
                    Want to watch
                </button>
            </div>

            {watchedItems.length === 0 ? (
                <div className="library-page__empty">
                    <div className="library-page__empty-icon">🎬</div>

                    <h2>Your collection is empty</h2>

                    <p>
                        Explore movies and add your favorites to build your
                        personal library.
                    </p>
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
                    {watchedItems.map((item) => (
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

export default LibraryPage;
