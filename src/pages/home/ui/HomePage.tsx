import { Alert, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router";

import { getPopularMovies } from "../../../entities/movie/api/getPopularMovies";
import type { IMovie } from "../../../entities/movie/model/types";
import MovieGrid from "../../../widgets/movie-grid/ui/MovieGrid";

import "./HomePage.css";

const HomePage = () => {
    const searchQuery = useOutletContext<string>();
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCurrent = true;

        const fetchMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                if (isCurrent) {
                    setMovies(popularMovies.movies);
                }
            } catch (e) {
                if (isCurrent) {
                    setError(
                        e instanceof Error
                            ? e.message
                            : "Failed to load popular movies.",
                    );
                }
            } finally {
                if (isCurrent) {
                    setIsLoading(false);
                }
            }
        };

        void fetchMovies();

        return () => {
            isCurrent = false;
        };
    }, []);

    const featuredMovie = movies[0];

    return (
        <main className="home-page">
            <section className="home-page__hero" aria-labelledby="home-title">
                <div className="home-page__hero-copy">
                    <span className="home-page__eyebrow">
                        YOUR PERSONAL MOVIE GUIDE
                    </span>
                    <h1 id="home-title">
                        Find your next
                        <br />
                        <span>favorite story.</span>
                    </h1>
                    <p>
                        Discover popular movies, keep track of what you want to
                        watch, and make your next movie night an easy choice.
                    </p>
                    <Link className="home-page__explore-link" to="/discover">
                        Explore the catalog
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>

                <div className="home-page__feature">
                    {featuredMovie ? (
                        <Link
                            className="home-page__feature-link"
                            to={`/movie/${featuredMovie.id}`}
                            aria-label={`View ${featuredMovie.title}`}
                        >
                            {featuredMovie.posterUrl && (
                                <img
                                    className="home-page__feature-poster"
                                    src={featuredMovie.posterUrl}
                                    alt=""
                                />
                            )}
                            <span className="home-page__feature-badge">
                                POPULAR RIGHT NOW
                            </span>
                            <span className="home-page__feature-info">
                                <span className="home-page__feature-title">
                                    {featuredMovie.title}
                                </span>
                                <span className="home-page__feature-meta">
                                    <span>
                                        ★ {featuredMovie.rating.toFixed(1)}
                                    </span>
                                    <span>
                                        {featuredMovie.year || "Year unknown"}
                                    </span>
                                </span>
                            </span>
                        </Link>
                    ) : (
                        <div
                            className="home-page__feature-placeholder"
                            aria-hidden="true"
                        >
                            <span className="home-page__feature-orbit home-page__feature-orbit--outer" />
                            <span className="home-page__feature-orbit home-page__feature-orbit--inner" />
                            <span className="home-page__feature-mark">C</span>
                        </div>
                    )}
                </div>
            </section>

            <section
                className="home-page__catalog"
                aria-labelledby="home-catalog-title"
                aria-busy={isLoading}
            >
                <div className="home-page__section-heading">
                    <div>
                        <span className="home-page__section-eyebrow">
                            {searchQuery.trim() ? "YOUR SEARCH" : "FRESH PICKS"}
                        </span>
                        <h2 id="home-catalog-title">
                            {searchQuery.trim()
                                ? "Popular movie matches"
                                : "Popular this week"}
                        </h2>
                        <p>
                            {searchQuery.trim()
                                ? `Showing popular movies matching "${searchQuery.trim()}".`
                                : "A few crowd favorites to get your watchlist started."}
                        </p>
                    </div>
                    <Link
                        className="home-page__text-link"
                        to="/discover"
                        aria-label="Browse all movies and TV shows"
                    >
                        Browse all
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>

                {isLoading ? (
                    <div className="home-page__status" role="status">
                        <CircularProgress size={30} />
                        <span>Finding something good to watch...</span>
                    </div>
                ) : error ? (
                    <Alert className="home-page__error" severity="error">
                        {error}
                    </Alert>
                ) : (
                    <MovieGrid
                        searchQuery={searchQuery}
                        contentType="movies"
                        movies={movies}
                    />
                )}
            </section>
        </main>
    );
};

export default HomePage;
