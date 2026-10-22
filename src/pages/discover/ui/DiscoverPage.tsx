import { useOutletContext } from "react-router";
import MovieGrid from "../../../widgets/movie-grid/ui/MovieGrid";
import "./DiscoverPage.css";
import {
    Alert,
    CircularProgress,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { IMovie } from "../../../entities/movie/model/types";
import { getPopularMovies } from "../../../entities/movie/api/getPopularMovies";

type ContentType = "movies" | "tv";

const DiscoverPage = () => {
    const searchQuery = useOutletContext<string>();
    const [contentType, setContentType] = useState<ContentType>("movies");
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<null | string>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            setIsError(null);
            setIsLoading(true);

            try {
                const moviesByAPI = await getPopularMovies();
                setMovies(moviesByAPI);
            } catch (err) {
                if (err instanceof Error) {
                    setIsError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (isLoading) return <CircularProgress />;
    if (isError) return <Alert severity="error">{isError}</Alert>;

    return (
        <div className="discover-page">
            <div className="discover-page__heading">
                <div>
                    <span className="discover-page__eyebrow">
                        YOUR NEXT FAVORITE
                    </span>

                    <h1>Discover</h1>
                    <ToggleButtonGroup
                        value={contentType}
                        exclusive
                        onChange={(event, newValue) => {
                            if (newValue !== null) {
                                setContentType(newValue);
                            }
                        }}
                        aria-label="Content type"
                    >
                        <ToggleButton value="movies">Movies</ToggleButton>
                        <ToggleButton value="tv">TV Shows</ToggleButton>
                    </ToggleButtonGroup>

                    <p>Explore movies and find your next favorite story.</p>
                </div>
            </div>

            <section className="discover-page__catalog">
                <div className="discover-page__catalog-heading">
                    <div>
                        <h2>Explore titles</h2>
                        <p>
                            {searchQuery.trim()
                                ? `Search results for "${searchQuery.trim()}"`
                                : contentType === "movies"
                                  ? "Handpicked movies to get you started"
                                  : "Handpicked series to get you started"}
                        </p>
                    </div>
                </div>

                <MovieGrid
                    movies={movies}
                    contentType={contentType}
                    searchQuery={searchQuery}
                />
            </section>
        </div>
    );
};

export default DiscoverPage;
