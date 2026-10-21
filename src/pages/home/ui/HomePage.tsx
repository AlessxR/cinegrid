import MovieCard from "../../../entities/movie/ui/MovieCard";

const movies = [
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

const HomePage = () => {
    return (
        <div>
            <h1>CineGrid</h1>
            <h2>Discover your next favorite movie.</h2>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.title}
                    title={movie.title}
                    year={movie.year}
                    rating={movie.rating}
                />
            ))}
        </div>
    );
};

export default HomePage;
