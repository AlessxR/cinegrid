import { useOutletContext } from "react-router";
import { useEffect, useState } from "react";
import {
    Alert,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    ToggleButton,
    ToggleButtonGroup,
    type SelectChangeEvent,
} from "@mui/material";

import MovieGrid from "../../../widgets/movie-grid/ui/MovieGrid";
import type { IMovie } from "../../../entities/movie/model/types";
import { searchMovies as searchMoviesRequest } from "../../../entities/movie/api/searchMovie";
import { searchTv } from "../../../entities/movie/api/searchTvShows";

import "./DiscoverPage.css";
import {
    getGenres,
    type TmdbGenre,
} from "../../../entities/movie/api/getGenres";
import { discoverTv } from "../../../entities/movie/api/discoverTv";
import { discoverMovies } from "../../../entities/movie/api/discoverMovie";

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
    const [genres, setGenres] = useState<TmdbGenre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<number | "">("");

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
                        : await discoverTv(selectedGenre, page);
                } else {
                    result = query
                        ? await searchMoviesRequest(query, page)
                        : await discoverMovies(selectedGenre, page);
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
    }, [searchQuery, contentType, page, selectedGenre]);

    useEffect(() => {
        let isCurrent = true;

        const fetchGenres = async () => {
            try {
                const dataGenres = await getGenres(contentType);

                if (isCurrent) {
                    setGenres(dataGenres);
                }
            } catch (e) {
                if (isCurrent) {
                    console.error(e);
                }
            }
        };

        void fetchGenres();

        return () => {
            isCurrent = false;
        };
    }, [contentType]);

    const handleGenreChange = (event: SelectChangeEvent<number | "">) => {
        const value = event.target.value;
        setSelectedGenre(value === "" ? "" : Number(value));
        setPage(1);
    };

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
                                setPage(1);
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
                <FormControl sx={{ minWidth: 200 }} size="small">
                    <InputLabel id="genre-select-label">Genre</InputLabel>

                    <Select
                        labelId="genre-select-label"
                        id="genre-select"
                        value={selectedGenre}
                        label="Genre"
                        onChange={handleGenreChange}
                    >
                        <MenuItem value="">All genres</MenuItem>

                        {genres.map((genre) => (
                            <MenuItem key={genre.id} value={genre.id}>
                                {genre.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

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
