import { tmdbFetch } from "../../../shared/api/tmdb";
import type { IMovie } from "../model/types";
import { mapTmdbMovie } from "./mapTmdbMovie";
import type { TmdbResponse } from "./getPopularMovies";

type DiscoverMoviesResult = {
    movies: IMovie[];
    page: number;
    totalPages: number;
};

export const discoverMovies = async (
    genreId: number | "",
    page: number = 1,
): Promise<DiscoverMoviesResult> => {
    const params: Record<string, string | number> = { page };

    if (genreId !== "") {
        params.with_genres = genreId;
    }

    const result = await tmdbFetch<TmdbResponse>("discover/movie", params);

    return {
        movies: result.results.map(mapTmdbMovie),
        page: result.page,
        totalPages: result.total_pages,
    };
};
