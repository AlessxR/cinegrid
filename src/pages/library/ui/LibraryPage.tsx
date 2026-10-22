import { Box } from "@mui/material";
import { useWatchlist } from "../../../app/providers/watchlist/WatchlistProvider";
import { movies, tvShows } from "../../../entities/movie/model/mockMovies";
import "./LibraryPage.css";
import MovieCard from "../../../entities/movie/ui/MovieCard";
import { useState } from "react";
import type { IMovie } from "../../../entities/movie/model/types";

type Filters = "all" | "watched" | "wantToWatch";

const LibraryPage = () => {
    const { watched, watchlist } = useWatchlist();
    const allTitles = [...movies, ...tvShows];

    const watchedItems = allTitles.filter((movie) =>
        watched.includes(movie.id),
    );

    const watchlistItems = allTitles.filter((movie) =>
        watchlist.includes(movie.id),
    );

    const [filter, setFilter] = useState<Filters>("all");

    let displayedItems: IMovie[] = allTitles;

    switch (filter) {
        case "all":
            displayedItems = allTitles;
            break;
        case "watched":
            displayedItems = watchedItems;
            break;
        case "wantToWatch":
            displayedItems = watchlistItems;
            break;
        default:
    }

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
                    className={`library-page__filter ${
                        filter === "all" ? "library-page__filter--active" : ""
                    }`}
                    type="button"
                    onClick={() => setFilter("all")}
                >
                    All movies
                </button>

                <button
                    onClick={() => setFilter("watched")}
                    className={`library-page__filter ${
                        filter === "watched"
                            ? "library-page__filter--active"
                            : ""
                    }`}
                    type="button"
                >
                    Watched
                </button>

                <button
                    onClick={() => setFilter("wantToWatch")}
                    className={`library-page__filter ${
                        filter === "wantToWatch"
                            ? "library-page__filter--active"
                            : ""
                    }`}
                    type="button"
                >
                    Want to watch
                </button>
            </div>

            {displayedItems.length === 0 ? (
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
                    {displayedItems.map((item) => (
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
