import { useState } from "react";
import "./MovieCard.css";
import { useWatchlist } from "../../../app/providers/watchlist/WatchlistProvider";
import { Button } from "@mui/material";

interface Movie {
    id: string;
    title: string;
    year: number;
    rating: number;
    posterUrl: string;
}

const MovieCard = ({ id, title, year, rating, posterUrl }: Movie) => {
    const { watchlist, setWatchlist } = useWatchlist();

    const [imageError, setImageError] = useState<boolean>(false);

    const isInWatchlist = watchlist.includes(id);

    const handleWatchlistToggle = () => {
        if (!isInWatchlist) {
            setWatchlist([...watchlist, id]);
        } else {
            setWatchlist(watchlist.filter((movie) => movie !== id));
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
            </div>
        </article>
    );
};

export default MovieCard;
