import "./MovieGrid.css";
import MovieCard from "../../../entities/movie/ui/MovieCard";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

type SortOption = "popular" | "rating" | "newest" | "title";
type ContentType = "movies" | "tv";

interface IMovie {
    id: string;
    title: string;
    year: number;
    rating: number;
    posterUrl: string;
}

interface MovieGridProps {
    searchQuery: string;
    contentType: ContentType;
}

const movies: IMovie[] = [
    {
        id: "movie-interstellar",
        title: "Interstellar",
        year: 2014,
        rating: 8.7,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
    {
        id: "movie-inception",
        title: "Inception",
        year: 2010,
        rating: 8.8,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    },
    {
        id: "movie-dark-knight",
        title: "The Dark Knight",
        year: 2008,
        rating: 9.0,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
    {
        id: "movie-shawshank-redemption",
        title: "The Shawshank Redemption",
        year: 1994,
        rating: 9.3,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    },
    {
        id: "movie-pulp-fiction",
        title: "Pulp Fiction",
        year: 1994,
        rating: 8.9,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",
    },
    {
        id: "movie-matrix",
        title: "The Matrix",
        year: 1999,
        rating: 8.7,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    },
    {
        id: "movie-fight-club",
        title: "Fight Club",
        year: 1999,
        rating: 8.8,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
    },
    {
        id: "movie-parasite",
        title: "Parasite",
        year: 2019,
        rating: 8.5,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    },
    {
        id: "movie-whiplash",
        title: "Whiplash",
        year: 2014,
        rating: 8.5,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeN8k6I.jpg",
    },
];

const tvShows: IMovie[] = [
    {
        id: "tv-breaking-bad",
        title: "Breaking Bad",
        year: 2008,
        rating: 9.5,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
    },
    {
        id: "tv-game-of-thrones",
        title: "Game of Thrones",
        year: 2011,
        rating: 9.2,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
    },
    {
        id: "tv-stranger-things",
        title: "Stranger Things",
        year: 2016,
        rating: 8.6,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    },
    {
        id: "tv-the-office",
        title: "The Office",
        year: 2005,
        rating: 8.6,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/qWnJzyZ5e7Wp2p2G2hD9Z3z6Z5b.jpg",
    },
    {
        id: "tv-sherlock",
        title: "Sherlock",
        year: 2010,
        rating: 9.1,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/7WTsnHkbA0FaG6R9twfFde0I9hl.jpg",
    },
    {
        id: "tv-the-last-of-us",
        title: "The Last of Us",
        year: 2023,
        rating: 8.7,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/dmo6TYuuJgaYinXBPjrgG9mB5od.jpg",
    },
    {
        id: "tv-dark",
        title: "Dark",
        year: 2017,
        rating: 8.7,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
    },
    {
        id: "tv-chernobyl",
        title: "Chernobyl",
        year: 2019,
        rating: 9.3,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg",
    },
];

const MovieGrid = ({ searchQuery, contentType }: MovieGridProps) => {
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
