import { useState } from "react";
import "./MovieCard.css";
import { useWatchlist } from "../../../app/providers/watchlist/WatchlistProvider";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import type { ISavedMedia } from "../model/types";

interface Movie {
    id: string;
    title: string;
    year: number;
    rating: number;
    posterUrl: string;
    type: "movie" | "tv";
}

const MovieCard = ({ id, title, year, rating, posterUrl, type }: Movie) => {
    const navigate = useNavigate();
    const { watchlist, setWatchlist, watched, setWatched } = useWatchlist();

    const [imageError, setImageError] = useState<boolean>(false);

    const media: ISavedMedia = {
        id,
        title,
        year,
        rating,
        posterUrl,
        type,
    };

    const isInWatchlist = watchlist.some(
        (item) => item.id === id && item.type === type,
    );

    const isInWatched = watched.some(
        (item) => item.id === id && item.type === type,
    );

    const handleWatchlistToggle = () => {
        setWatchlist((prev) => {
            if (isInWatchlist) {
                return 
            }
        });
    };

    const handleWatchedToggle = () => {
        if (!isInWatched) {
            setWatched([...watched, mediaId]);
        } else {
            setWatched(watched.filter((movie) => movie !== mediaId));
        }
    };

    const handleCardClick = () => {
        const path = type === "movie" ? "movie" : "tv";

        navigate(`/${path}/${id}`);
    };

    return (
        <article className="movie-card" onClick={handleCardClick}>
            <div className="movie-card__poster-wrapper">
                {imageError ? (
                    <div className="movie-card__poster-fallback">
                        <span>🎬</span>
                        <p>{title}</p>
                    </div>
                ) : (
                    <img
                        className="movie-card__poster"
                        src={posterUrl}
                        alt={`${title} poster`}
                        loading="lazy"
                        onError={() => {
                            setImageError(true);
                        }}
                    />
                )}

                <span className="movie-card__rating">★ {rating}</span>
            </div>

            <div className="movie-card__content">
                <h3 className="movie-card__title">{title}</h3>
                <p className="movie-card__year">{year}</p>
                <Stack direction="column" spacing={1}>
                    <Button
                        variant="contained"
                        fullWidth
                        size="small"
                        color={isInWatchlist ? "error" : "primary"}
                        onClick={(event) => {
                            event.stopPropagation();
                            handleWatchlistToggle();
                        }}
                    >
                        {isInWatchlist
                            ? "Remove from Watchlist"
                            : "Add to Watchlist"}
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        size="small"
                        color={isInWatched ? "error" : "primary"}
                        onClick={(event) => {
                            event.stopPropagation();
                            handleWatchedToggle();
                        }}
                    >
                        {isInWatched ? "Mask as Unwatched" : "Mark as Watched"}
                    </Button>
                </Stack>
            </div>
        </article>
    );
};

export default MovieCard;
