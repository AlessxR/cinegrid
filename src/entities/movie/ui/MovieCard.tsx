import { useState } from "react";
import "./MovieCard.css";
import { useWatchlist } from "../../../app/providers/watchlist/WatchlistProvider";
import { Button, Stack } from "@mui/material";

interface Movie {
    id: string;
    title: string;
    year: number;
    rating: number;
    posterUrl: string;
}

const MovieCard = ({ id, title, year, rating, posterUrl }: Movie) => {
    const { watchlist, setWatchlist, watched, setWatched } = useWatchlist();

    const [imageError, setImageError] = useState<boolean>(false);

    const isInWatchlist = watchlist.includes(id);
    const isInWatched = watched.includes(id);

    const handleWatchlistToggle = () => {
        if (!isInWatchlist) {
            setWatchlist([...watchlist, id]);
        } else {
            setWatchlist(watchlist.filter((movie) => movie !== id));
        }
    };

    const handleWatchedToggle = () => {
        if (!isInWatched) {
            setWatched([...watched, id]);
        } else {
            setWatched(watched.filter((movie) => movie !== id));
        }
    };

    return (
        <article className="movie-card">
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
                <Stack direction='column' spacing={1}>
                    <Button
                    
                    variant="contained"
                    fullWidth
                    size="small"
                    color={isInWatchlist ? "error" : "primary"}
                    onClick={handleWatchlistToggle}
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
                    onClick={handleWatchedToggle}
                >
                    {isInWatched ? "Mask as Unwatched" : "Mark as Watched"}
                </Button>
                </Stack>
            </div>
        </article>
    );
};

export default MovieCard;
