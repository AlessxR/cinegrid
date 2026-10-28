import { useOutletContext } from "react-router";
import { useEffect, useState } from "react";
import {
    Alert,
    CircularProgress,
    Pagination,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";

import MovieGrid from "../../../widgets/movie-grid/ui/MovieGrid";
import type { IMovie } from "../../../entities/movie/model/types";
import { getPopularMovies } from "../../../entities/movie/api/getPopularMovies";
import { searchMovies as searchMoviesRequest } from "../../../entities/movie/api/searchMovie";
import { searchTv } from "../../../entities/movie/api/searchTvShows";
import { getPopularTv } from "../../../entities/movie/api/getPopularTvShows";

import "./DiscoverPage.css";

type ContentType = "movies" | "tv";

type PaginatedContent = {
    movies: IMovie[];
    page: number;
    totalPages: number;
};

const DiscoverPage = () => {
    const searchQuery = useOutletContext<string>();

    const [contentType, setContentType] = useState<ContentType>("movies");
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [searchQuery, contentType]);

    useEffect(() => {
        let isCurrent = true;

        const fetchContent = async () => {
            setIsLoading(true);
            setIsError(null);

            try {
                const query = searchQuery.trim();
                let result: PaginatedContent;

                if (contentType === "tv") {
                    result = query
                        ? await searchTv(query, page)
                        : await getPopularTv(page);
                } else {
                    result = query
                        ? await searchMoviesRequest(query, page)
                        : await getPopularMovies(page);
                }

                if (isCurrent) {
                    setMovies(result.movies);
                    setTotalPages(result.totalPages);
                }
            } catch (err) {
                if (isCurrent) {
                    setIsError(
                        err instanceof Error
                            ? err.message
                            : "Failed to load content.",
                    );
                }
            } finally {
                if (isCurrent) {
                    setIsLoading(false);
                }
            }
        };

        const debounce = setTimeout(() => {
            void fetchContent();
        }, 400);

        return () => {
            isCurrent = false;
            clearTimeout(debounce);
        };
    }, [searchQuery, contentType, page]);

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

                {isLoading && movies.length === 0 ? (
                    <div className="discover-page__loading">
                        <CircularProgress />
                    </div>
                ) : isError ? (
                    <Alert severity="error">{isError}</Alert>
                ) : (
                    <>
                        <MovieGrid
                            movies={movies}
                            contentType={contentType}
                            searchQuery={searchQuery}
                        />

                        {isLoading && (
                            <div className="discover-page__loading">
                                <CircularProgress size={24} />
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="discover-page__pagination">
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={(_, value) => setPage(value)}
                                    disabled={isLoading}
                                    color="primary"
                                    shape="rounded"
                                    showFirstButton
                                    showLastButton
                                    siblingCount={1}
                                    boundaryCount={1}
                                    aria-label={
                                        contentType === "movies"
                                            ? "Movie pages"
                                            : "TV show pages"
                                    }
                                />
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default DiscoverPage;
