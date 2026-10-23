import { tmdbFetch } from "../../../shared/api/tmdb";
import type { IMovie } from "../model/types";
import { mapTmdbMovie } from "./mapTmdbMovie";

export const searchMovies = async (query: string): Promise<IMovie[]> => {
    const params = new URLSearchParams({ query });
    const result = await tmdbFetch(`search/movie?${params}`);

    return result.results.map(mapTmdbMovie);
};
