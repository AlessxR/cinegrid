import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
    getTvShowDetails,
    type TvShowDetails,
} from "../../../entities/movie/api/getTvShowDetails";
import type { MediaHeroData } from "../../../entities/media/model/types";
import { Alert, CircularProgress } from "@mui/material";
import { useWatchlist } from "../../../app/providers/watchlist/WatchlistProvider";
import MediaHero from "../../../entities/media/ui/MediaHero";

const TvShowDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { watchlist, setWatchlist, watched, setWatched } = useWatchlist();

    const [data, setData] = useState<TvShowDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState<null | string>(null);

    const tvShowId = data ? `tv:${data.id}` : "";

    const isInWatchlist = watchlist.includes(tvShowId);
    const isWatched = watched.includes(tvShowId);

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

    const handleWatchlistToggle = () => {
        setWatchlist((prev) =>
            isInWatchlist
                ? prev.filter((item) => item !== tvShowId)
                : [...prev, tvShowId],
        );
    };

    const handleWatchedToggle = () => {
        setWatched((prev) =>
            isWatched
                ? prev.filter((item) => item !== tvShowId)
                : [...prev, tvShowId],
        );
    };

    if (isLoading) return <CircularProgress />;
    if (isError) return <Alert severity="error">{isError}</Alert>;
    if (data === null) return <h2>TV show not found.</h2>;

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
