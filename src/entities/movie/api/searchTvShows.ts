import { tmdbFetch } from "../../../shared/api/tmdb";
import type { IMovie } from "../model/types";
import type { TmdbResponse } from "./getPopularTvShows";
import { mapTmdbTvShows } from "./mapTmdbTvShow";

export const searchTv = async (query: string): Promise<IMovie[]> => {
    const result = await tmdbFetch<TmdbResponse>(`search/tv`, {
        query,
    });

    return result.results.map(mapTmdbTvShows);
};
