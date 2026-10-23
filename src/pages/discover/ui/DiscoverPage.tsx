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
import { searchMovies as searchMoviesRequest } from "../../../entities/movie/api/searchMovie";

type ContentType = "movies" | "tv";

const DiscoverPage = () => {
    const searchQuery = useOutletContext<string>();

    const [contentType, setContentType] = useState<ContentType>("movies");
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<string | null>(null);

    useEffect(() => {
        let isCurrent = true;

        const fetchMovies = async () => {
            setIsLoading(true);
            setIsError(null);

            try {
                const query = searchQuery.trim();

                const results = query
                    ? await searchMoviesRequest(query)
                    : await getPopularMovies();

                if (isCurrent) {
                    setMovies(results);
                }
            } catch (err) {
                if (isCurrent) {
                    setIsError(
                        err instanceof Error
                            ? err.message
                            : "Failed to load movies.",
                    );
                }
            } finally {
                if (isCurrent) {
                    setIsLoading(false);
                }
            }
        };

        const debounce = setTimeout(() => {
            void fetchMovies();
        }, 400);

        return () => {
            isCurrent = false;
            clearTimeout(debounce);
        };
    }, [searchQuery]);

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
                        onChange={(_, newValue: ContentType | null) => {
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

                {isLoading ? (
                    <div className="discover-page__loading">
                        <CircularProgress />
                    </div>
                ) : isError ? (
                    <Alert severity="error">{isError}</Alert>
                ) : (
                    <MovieGrid
                        movies={movies}
                        contentType={contentType}
                        searchQuery={searchQuery}
                    />
                )}
            </section>
        </div>
    );
};

export default DiscoverPage;
