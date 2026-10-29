import { tmdbFetch } from "../../../shared/api/tmdb";
import type { IMovie } from "../model/types";
import { mapTmdbTvShows } from "./mapTmdbTvShow";
import type { TmdbResponse } from "./getPopularTvShows";

type DiscoverTvResult = {
    movies: IMovie[];
    page: number;
    totalPages: number;
};

export const discoverTv = async (
    genreId: number | "",
    page: number = 1,
): Promise<DiscoverTvResult> => {
    const params: Record<string, string | number> = { page };

    if (genreId !== "") {
        params.with_genres = genreId;
    }

    const result = await tmdbFetch<TmdbResponse>("discover/tv", params);

    return {
        movies: result.results.map(mapTmdbTvShows),
        page: result.page,
        totalPages: result.total_pages,
    };
};