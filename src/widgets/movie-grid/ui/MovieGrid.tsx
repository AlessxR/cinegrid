import MovieCard from "../../../entities/movie/ui/MovieCard";

interface IMovie {
    title: string;
    year: number;
    rating: number;
}

const movies: IMovie[] = [
    {
        title: "Interstellar",
        year: 2014,
        rating: 8.7,
    },
    {
        title: "Inception",
        year: 2010,
        rating: 8.8,
    },
    {
        title: "The Dark Knight",
        year: 2008,
        rating: 9.0,
    },
];

const MovieGrid = () => {
    return (
        <section>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.title}
                    title={movie.title}
                    year={movie.year}
                    rating={movie.rating}
                />
            ))}
        </section>
    );
};

export default MovieGrid;
