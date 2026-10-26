import { tmdbFetch } from "../../../shared/api/tmdb";
import type { IMovie } from "../model/types";
import { mapTmdbTvShows } from "./mapTmdbTvShow";

export const searchTv = async (query: string): Promise<IMovie[]> => {
    const params = new URLSearchParams({ query });
    const result = await tmdbFetch(`search/tv?${params}`);

    return result.results.map(mapTmdbTvShows);
};
