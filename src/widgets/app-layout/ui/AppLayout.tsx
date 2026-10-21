import { useState } from "react";
import { NavLink, Outlet } from "react-router";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import MovieRoundedIcon from "@mui/icons-material/MovieRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import "./AppLayout.css";
import { InputAdornment, TextField } from "@mui/material";

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
                        end
                    >
                        <HomeRoundedIcon />
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
                        <ExploreRoundedIcon />
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
                        <MovieRoundedIcon />
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
                        <BookmarkRoundedIcon />
                        <span>Watchlist</span>
                    </NavLink>
                </nav>
            </aside>

            <div className="app-layout__main">
                <header className="app-layout__header">
                    <TextField
                        className="app-layout__search"
                        type="search"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search movies and TV shows..."
                        aria-label="Search movies and TV shows"
                        size="small"
                        fullWidth
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchRoundedIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <kbd>⌘ K</kbd>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    >
                        <span className="app-layout__search-icon">
                            <SearchRoundedIcon />
                        </span>
                    </TextField>

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
