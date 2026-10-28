import { tmdbFetch } from "../../../shared/api/tmdb";
import type { IMovie } from "../model/types";
import type { TmdbResponse } from "./getPopularTvShows";
import { mapTmdbTvShows } from "./mapTmdbTvShow";

export const searchTv = async (
    query: string,
    page: number = 1,
): Promise<{
    movies: IMovie[];
    page: number;
    totalPages: number;
}> => {
    const result = await tmdbFetch<TmdbResponse>(`search/tv`, {
        query,
        page: String(page),
    });
    
    return {
        movies: result.results.map(mapTmdbTvShows),
        page: result.page,
        totalPages: result.total_pages,
    };
};
