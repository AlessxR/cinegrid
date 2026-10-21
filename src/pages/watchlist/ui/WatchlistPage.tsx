import "./WatchlistPage.css";
import { Link } from "react-router";

const WatchlistPage = () => {
    return (
        <div className="watchlist-page">
            <div className="watchlist-page__heading">
                <div>
                    <h1>Watchlist</h1>
                    <p>Movies and shows you want to watch</p>
                </div>

                <span className="watchlist-page__count">0 titles</span>
            </div>

            <div className="watchlist-page__empty">
                <div className="watchlist-page__empty-icon">◷</div>

                <h2>Your watchlist is empty</h2>

                <p>
                    Keep track of movies and shows you want to watch. Discover
                    something interesting and save it for later.
                </p>

                <Link
                    className="watchlist-page__discover-button"
                    to="/discover"
                >
                    Discover movies
                    <span aria-hidden="true">→</span>
                </Link>
            </div>
        </div>
    );
};

export default WatchlistPage;
