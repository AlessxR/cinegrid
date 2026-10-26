import { Box } from "@mui/material";
import { useWatchlist } from "../../../app/providers/watchlist/WatchlistProvider";
import "./LibraryPage.css";
import MovieCard from "../../../entities/movie/ui/MovieCard";
import { useState } from "react";
import type { ISavedMedia } from "../../../entities/movie/model/types";

type Filters = "all" | "watched" | "wantToWatch";

const LibraryPage = () => {
    const { watched, watchlist } = useWatchlist();

    const [filter, setFilter] = useState<Filters>("all");

    const allItems = [...watched, ...watchlist].filter(
        (media, index, items) =>
            items.findIndex(
                (item) => item.id === media.id && item.type === media.type,
            ) === index,
    );

    let displayedItems: ISavedMedia[] = allItems;

    switch (filter) {
        case "all":
            displayedItems = allItems;
            break;
        case "watched":
            displayedItems = watched;
            break;
        case "wantToWatch":
            displayedItems = watchlist;
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
                    {displayedItems.length} movies
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
                            key={`${item.type}:${item.id}`}
                            type={item.type}
                        />
                    ))}
                </Box>
            )}
        </div>
    );
};

export default LibraryPage;
