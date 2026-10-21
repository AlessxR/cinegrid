import "./AppLayout.css";
import HomePage from "../../../pages/home/ui/HomePage";
import { useState } from "react";

const AppLayout = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <div className="app-layout">
            <aside className="app-layout__sidebar">
                <div className="app-layout__brand">
                    <div className="app-layout__logo">C</div>
                    <span>CineGrid</span>
                </div>
                <nav className="app-layout__navigation">
                    <a
                        className="app-layout__link app-layout__link--active"
                        href="#"
                    >
                        <span>Home</span>
                    </a>
                    <a className="app-layout__link" href="#">
                        <span>Discover</span>
                    </a>
                    <a className="app-layout__link" href="#">
                        <span>My Library</span>
                    </a>
                    <a className="app-layout__link" href="#">
                        <span>Watchlist</span>
                    </a>
                </nav>
            </aside>

            <div className="app-layout__main">
                <header className="app-layout__header">
                    <div className="app-layout__search">
                        <span className="app-layout__search-icon">⌕</span>
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(event) =>
                                setSearchQuery(event.target.value)
                            }
                            placeholder="Search movies and TV shows..."
                            aria-label="Search movies and TV shows"
                        />
                        <kbd>⌘ K</kbd>
                    </div>

                    <button
                        className="app-layout__profile"
                        type="button"
                        aria-label="User profile"
                    >
                        U
                    </button>
                </header>

                <main className="app-layout__content">
                    <HomePage searchQuery={searchQuery} />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
