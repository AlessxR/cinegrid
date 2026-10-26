import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
    getMovieDetails,
    type MovieDetails,
} from "../../../entities/movie/api/getMovieDetails";
import { Alert, CircularProgress } from "@mui/material";
import { useWatchlist } from "../../../app/providers/watchlist/WatchlistProvider";
import type { MediaHeroData } from "../../../entities/media/model/types";
import MediaHero from "../../../entities/media/ui/MediaHero";
import type { ISavedMedia } from "../../../entities/movie/model/types";

const MovieDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<MovieDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState<string | null>(null);

    const { watchlist, setWatchlist, watched, setWatched } = useWatchlist();
    const movieId = data ? String(data.id) : "";

    const isInWatchlist = watchlist.some(
        (item) => item.id === movieId && item.type === "movie",
    );

    const isWatched = watched.some(
        (item) => item.id === movieId && item.type === "movie",
    );

    useEffect(() => {
        const fetchDetailsPage = async () => {
            if (!id) return;

            try {
                setIsError(null);
                setIsLoading(true);
                const movieDetails = await getMovieDetails(id);
                setData(movieDetails);
            } catch (e) {
                if (e instanceof Error) {
                    setIsError(e.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        void fetchDetailsPage();
    }, [id]);

    if (isLoading) return <CircularProgress />;
    if (isError) return <Alert severity="error">{isError}</Alert>;
    if (data === null) return <h2>Movie not found.</h2>;

    const media: ISavedMedia = {
        id: String(data.id),
        title: data.title,
        year: Number(data.release_date.slice(0, 4)),
        rating: data.vote_average,
        posterUrl: data.poster_path
            ? "https://image.tmdb.org/t/p/w500".concat(data.poster_path)
            : "",
        type: "movie",
    };

    const handleWatchlistToggle = () => {
        setWatchlist((prev) => {
            if (isInWatchlist) {
                return prev.filter(
                    (movie) =>
                        !(movie.id === media.id && movie.type === "movie"),
                );
            }

            return [...prev, media];
        });
    };

    const handleWatchedToggle = () => {
        setWatched((prev) => {
            if (isWatched) {
                return prev.filter(
                    (movie) =>
                        !(movie.id === media.id && movie.type === "movie"),
                );
            } else {
                return [...prev, media];
            }
        });
    };

    const heroData: MediaHeroData = {
        id: data.id,
        title: data.title,
        date: data.release_date,
        overview: data.overview,
        poster_path: data.poster_path,
        backdrop_path: data.backdrop_path,
        vote_average: data.vote_average,
        genres: data.genres,
    };

    return (
        <MediaHero
            data={heroData}
            isInWatchlist={isInWatchlist}
            isWatched={isWatched}
            onWatchlistToggle={handleWatchlistToggle}
            onWatchedToggle={handleWatchedToggle}
            onBack={() => navigate("/discover")}
        />
    );
};

export default MovieDetailsPage;
