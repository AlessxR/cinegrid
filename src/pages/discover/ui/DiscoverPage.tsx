import { useOutletContext } from "react-router";
import MovieGrid from "../../../widgets/movie-grid/ui/MovieGrid";

const DiscoverPage = () => {
    const searchQuery = useOutletContext<string>();
    return (
        <div className="discover-page">
            <div className="discover-page__heading">
                <div>
                    <h1>Discover</h1>
                    <p>Discover your next favorite movie.</p>
                </div>
            </div>
            <MovieGrid searchQuery={searchQuery} />
        </div>
    );
};

export default DiscoverPage;
