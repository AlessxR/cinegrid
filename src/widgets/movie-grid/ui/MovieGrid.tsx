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
