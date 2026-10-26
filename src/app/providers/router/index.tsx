import { createBrowserRouter } from "react-router";
import AppLayout from "../../../widgets/app-layout/ui/AppLayout";
import DiscoverPage from "../../../pages/discover/ui/DiscoverPage";
import LibraryPage from "../../../pages/library/ui/LibraryPage";
import WatchlistPage from "../../../pages/watchlist/ui/WatchlistPage";
import MovieDetailsPage from "../../../pages/movie-details/ui/MovieDetailsPage";
import TvShowDetailsPage from "../../../pages/tv-show-detail/ui/TvShowDetailsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: AppLayout,
        children: [
            { index: true, Component: DiscoverPage },
            { path: "discover", Component: DiscoverPage },
            { path: "library", Component: LibraryPage },
            { path: "watchlist", Component: WatchlistPage },
            { path: "movie/:id", Component: MovieDetailsPage },
            { path: "tv/:id", Component: TvShowDetailsPage },
        ],
    },
]);
