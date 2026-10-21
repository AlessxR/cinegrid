import "./MovieGrid.css";
import MovieCard from "../../../entities/movie/ui/MovieCard";

interface IMovie {
    title: string;
    year: number;
    rating: number;
    posterUrl: string;
}

interface MovieGridProps {
    searchQuery: string;
}

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
];

const MovieGrid = ({ searchQuery }: MovieGridProps) => {
    const filteredMovies = movies.filter((movie) => {
        return movie.title
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase());
    });

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
        <section className="movie-grid">
            {filteredMovies.map((movie) => (
                <MovieCard
                    key={movie.title}
                    title={movie.title}
                    year={movie.year}
                    rating={movie.rating}
                    posterUrl={movie.posterUrl}
                />
            ))}
        </section>
    );
};

export default MovieGrid;
