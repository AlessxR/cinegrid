import "./MovieGrid.css";
import MovieCard from "../../../entities/movie/ui/MovieCard";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { tvShows } from "../../../entities/movie/model/mockMovies";
import type { IMovie } from "../../../entities/movie/model/types";

type SortOption = "popular" | "rating" | "newest" | "title";
type ContentType = "movies" | "tv";

interface MovieGridProps {
    searchQuery: string;
    contentType: ContentType;
    movies: IMovie[];
}

const MovieGrid = ({ searchQuery, contentType, movies }: MovieGridProps) => {
    const [sortOption, setSortOption] = useState<SortOption>("popular");
    let sortMovies: IMovie[] = [];

    const currentItems = contentType === "movies" ? movies : tvShows;

    const filteredMovies = currentItems.filter((movie) => {
        return movie.title
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase());
    });

    switch (sortOption) {
        case "newest":
            sortMovies = [...filteredMovies].sort((a, b) => b.year - a.year);
            break;
        case "rating":
            sortMovies = [...filteredMovies].sort(
                (a, b) => b.rating - a.rating,
            );
            break;
        case "title":
            sortMovies = [...filteredMovies].sort((a, b) =>
                a.title.localeCompare(b.title),
            );
            break;
        default:
            sortMovies = filteredMovies;
            break;
    }

    if (filteredMovies.length === 0) {
        return (
            <section className="movie-grid__empty">
                <span className="movie-grid__empty-icon" aria-hidden="true">
                    ⌕
                </span>

                <h2>
                    No {contentType === "movies" ? "movies" : "TV shows"} found
                </h2>

                <p>Try another title or check your spelling.</p>
            </section>
        );
    }

    return (
        <>
            <div className="movie-grid__toolbar">
                <span className="movie-grid__results-label">
                    Browse collection
                </span>

                <FormControl className="movie-grid__sort">
                    <InputLabel id="movie-sort-label">Sort by</InputLabel>

                    <Select<SortOption>
                        labelId="movie-sort-label"
                        className="movie-grid__sort-select"
                        value={sortOption}
                        label="Sort by"
                        aria-label="Sort movies"
                        onChange={(event) => {
                            setSortOption(event.target.value);
                        }}
                    >
                        <MenuItem value="popular">Popular</MenuItem>
                        <MenuItem value="rating">Highest rated</MenuItem>
                        <MenuItem value="newest">Newest first</MenuItem>
                        <MenuItem value="title">Title A–Z</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <section className="movie-grid">
                {sortMovies.map((movie) => (
                    <MovieCard
                        id={movie.id}
                        key={movie.id}
                        title={movie.title}
                        year={movie.year}
                        rating={movie.rating}
                        posterUrl={movie.posterUrl}
                    />
                ))}
            </section>
        </>
    );
};

export default MovieGrid;
