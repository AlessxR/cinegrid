import "./LibraryPage.css";

const LibraryPage = () => {
    return (
        <div className="library-page">
            <div className="library-page__heading">
                <div>
                    <h1>My Library</h1>
                    <p>Your personal movie collection</p>
                </div>

                <span className="library-page__count">0 movies</span>
            </div>

            <div className="library-page__filters">
                <button
                    className="library-page__filter library-page__filter--active"
                    type="button"
                >
                    All movies
                </button>

                <button className="library-page__filter" type="button">
                    Watched
                </button>

                <button className="library-page__filter" type="button">
                    Want to watch
                </button>
            </div>

            <div className="library-page__empty">
                <div className="library-page__empty-icon">🎬</div>

                <h2>Your collection is empty</h2>

                <p>
                    Explore movies and add your favorites to build your personal
                    library.
                </p>
            </div>
        </div>
    );
};

export default LibraryPage;
