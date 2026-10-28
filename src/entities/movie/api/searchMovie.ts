import { tmdbFetch } from "../../../shared/api/tmdb";
import type { IMovie } from "../model/types";
import { mapTmdbMovie } from "./mapTmdbMovie";

type SearchMoviesResponse = {
    page: number;
    results: Parameters<typeof mapTmdbMovie>[0][];
    total_pages: number;
    total_results: number;
};

export const searchMovies = async (
    query: string,
    page: number = 1,
): Promise<{ movies: IMovie[]; page: number; totalPages: number }> => {
    const params = new URLSearchParams({ query, page: String(page) });
    const result = await tmdbFetch<SearchMoviesResponse>(
        `search/movie?${params}`,
    );

    return {
        movies: result.results.map(mapTmdbMovie),
        page: result.page,
        totalPages: result.total_pages,
    };
};
