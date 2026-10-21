import MovieGrid from "../../../widgets/movie-grid/ui/MovieGrid";

interface HomePageProps {
    searchQuery: string;
}

const HomePage = ({ searchQuery }: HomePageProps) => {
    return (
        <div>
            <h1>CineGrid</h1>
            <h2>Discover your next favorite movie.</h2>
            <MovieGrid searchQuery={searchQuery} />
        </div>
    );
};

export default HomePage;
