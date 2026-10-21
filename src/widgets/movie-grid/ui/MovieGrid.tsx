import "./MovieGrid.css";
import MovieCard from "../../../entities/movie/ui/MovieCard";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

interface IMovie {
    title: string;
    year: number;
    rating: number;
    posterUrl: string;
}

interface MovieGridProps {
    searchQuery: string;
}

type SortOption = "popular" | "rating" | "newest" | "title";

const movies: IMovie[] = [
    {
        title: "Interstellar",
        year: 2014,
        rating: 8.7,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
    {
        title: "Inception",
        year: 2010,
        rating: 8.8,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    },
    {
        title: "The Dark Knight",
        year: 2008,
        rating: 9.0,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
    {
        title: "The Shawshank Redemption",
        year: 1994,
        rating: 9.3,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    },
    {
        title: "Pulp Fiction",
        year: 1994,
        rating: 8.9,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",
    },
    {
        title: "The Matrix",
        year: 1999,
        rating: 8.7,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    },
    {
        title: "Fight Club",
        year: 1999,
        rating: 8.8,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
    },
    {
        title: "Parasite",
        year: 2019,
        rating: 8.5,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    },
    {
        title: "Whiplash",
        year: 2014,
        rating: 8.5,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeN8k6I.jpg",
    },
];

const MovieGrid = ({ searchQuery }: MovieGridProps) => {
    const [sortOption, setSortOption] = useState<SortOption>("popular");
    let sortMovies: IMovie[] = [];

    const filteredMovies = movies.filter((movie) => {
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

                <h2>No movies found</h2>

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
                        key={movie.title}
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
