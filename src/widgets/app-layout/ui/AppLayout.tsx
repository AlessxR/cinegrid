import "./AppLayout.css";
import { useState } from "react";
import { NavLink, Outlet } from "react-router";

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
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "app-layout__link app-layout__link--active"
                                : "app-layout__link"
                        }
                        to="/"
                    >
                        <span>Home</span>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "app-layout__link app-layout__link--active"
                                : "app-layout__link"
                        }
                        to="/discover"
                    >
                        <span>Discover</span>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "app-layout__link app-layout__link--active"
                                : "app-layout__link"
                        }
                        to="/library"
                    >
                        <span>My Library</span>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "app-layout__link app-layout__link--active"
                                : "app-layout__link"
                        }
                        to="/watchlist"
                    >
                        <span>Watchlist</span>
                    </NavLink>
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
                    <Outlet context={searchQuery} />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
