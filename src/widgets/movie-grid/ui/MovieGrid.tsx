import './MovieGrid.css';
import MovieCard from "../../../entities/movie/ui/MovieCard";

interface IMovie {
    title: string;
    year: number;
    rating: number;
    posterUrl: string;
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
            "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
    {
        title: "The Dark Knight",
        year: 2008,
        rating: 9.0,
        posterUrl:
            "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
];

const MovieGrid = () => {
    return (
        <section className='movie-grid'>
            {movies.map((movie) => (
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
