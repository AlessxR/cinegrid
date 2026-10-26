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

const MovieDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<MovieDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState<string | null>(null);

    const { watchlist, setWatchlist, watched, setWatched } = useWatchlist();
    const movieId = data ? String(data.id) : "";

    const isInWatchlist = watchlist.includes(movieId);
    const isWatched = watched.includes(movieId);

    const handleWatchlistToggle = () => {
        setWatchlist((prev) =>
            isInWatchlist
                ? prev.filter((item) => item !== movieId)
                : [...prev, movieId],
        );
    };

    const handleWatchedToggle = () => {
        setWatched((prev) =>
            isWatched
                ? prev.filter((item) => item !== movieId)
                : [...prev, movieId],
        );
    };

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
