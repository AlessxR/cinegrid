import { useOutletContext } from "react-router";
import MovieGrid from "../../../widgets/movie-grid/ui/MovieGrid";
import { movies } from "../../../entities/movie/model/mockMovies";

const HomePage = () => {
    const searchQuery = useOutletContext<string>();

    return (
        <div>
            <h1>CineGrid</h1>
            <h2>Discover your next favorite movie.</h2>
            <MovieGrid
                searchQuery={searchQuery}
                contentType="movies"
                movies={movies}
            />
        </div>
    );
};

export default HomePage;
