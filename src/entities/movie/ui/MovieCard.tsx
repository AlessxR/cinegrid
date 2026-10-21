import { useState } from "react";
import "./MovieCard.css";

interface Movie {
    title: string;
    year: number;
    rating: number;
    posterUrl: string;
}

const MovieCard = ({ title, year, rating, posterUrl }: Movie) => {
    const [imageError, setImageError] = useState<boolean>(false);

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
            </div>
        </article>
    );
};

export default MovieCard;
