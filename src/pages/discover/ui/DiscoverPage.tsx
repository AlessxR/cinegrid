import { useOutletContext } from "react-router";
import MovieGrid from "../../../widgets/movie-grid/ui/MovieGrid";
import "./DiscoverPage.css";

const DiscoverPage = () => {
    const searchQuery = useOutletContext<string>();

    return (
        <div className="discover-page">
            <div className="discover-page__heading">
                <div>
                    <span className="discover-page__eyebrow">
                        YOUR NEXT FAVORITE
                    </span>

                    <h1>Discover</h1>

                    <p>Explore movies and find your next favorite story.</p>
                </div>
            </div>

            <section className="discover-page__catalog">
                <div className="discover-page__catalog-heading">
                    <div>
                        <h2>Explore titles</h2>
                        <p>
                            {searchQuery.trim()
                                ? `Search results for "${searchQuery.trim()}"`
                                : "Handpicked movies to get you started"}
                        </p>
                    </div>
                </div>

                <MovieGrid searchQuery={searchQuery} />
            </section>
        </div>
    );
};

export default DiscoverPage;
