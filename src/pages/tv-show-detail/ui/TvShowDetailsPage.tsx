import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
    getTvShowDetails,
    type TvShowDetails,
} from "../../../entities/movie/api/getTvShowDetails";
import type { MediaHeroData } from "../../../entities/media/model/types";
import { Alert, CircularProgress } from "@mui/material";
import { useWatchlist } from "../../../app/providers/watchlist/WatchlistContext";
import MediaHero from "../../../entities/media/ui/MediaHero";
import type { ISavedMedia } from "../../../entities/movie/model/types";

const TvShowDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { watchlist, setWatchlist, watched, setWatched } = useWatchlist();

    const [data, setData] = useState<TvShowDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState<null | string>(null);

    const tvShowId = data ? `${data.id}` : "";

    const isInWatchlist = watchlist.some(
        (item) => item.id === tvShowId && item.type === "tv",
    );

    const isWatched = watched.some(
        (item) => item.id === tvShowId && item.type === "tv",
    );

    useEffect(() => {
        const fetchTvShowDetails = async () => {
            if (!id) return;

            try {
                setIsError(null);
                setIsLoading(true);
                const tvShowDetails = await getTvShowDetails(id);
                setData(tvShowDetails);
            } catch (e) {
                if (e instanceof Error) {
                    setIsError(e.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        void fetchTvShowDetails();
    }, [id]);

    if (isLoading) return <CircularProgress />;
    if (isError) return <Alert severity="error">{isError}</Alert>;
    if (data === null) return <h2>TV show not found.</h2>;

    const media: ISavedMedia = {
        id: String(data.id),
        title: data.name,
        year: Number(data.first_air_date.slice(0, 4)),
        rating: data.vote_average,
        posterUrl: data.poster_path
            ? "https://image.tmdb.org/t/p/w500".concat(data.poster_path)
            : "",
        type: "tv",
    };

    const handleWatchlistToggle = () => {
        setWatchlist((prev) => {
            if (isInWatchlist) {
                return prev.filter(
                    (movie) => !(movie.id === media.id && movie.type === "tv"),
                );
            }

            return [...prev, media];
        });
    };

    const handleWatchedToggle = () => {
        setWatched((prev) => {
            if (isWatched) {
                return prev.filter(
                    (movie) => !(movie.id === media.id && movie.type === "tv"),
                );
            } else {
                return [...prev, media];
            }
        });
    };

    const heroData: MediaHeroData = {
        id: data.id,
        title: data.name,
        date: data.first_air_date,
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

export default TvShowDetailsPage;
