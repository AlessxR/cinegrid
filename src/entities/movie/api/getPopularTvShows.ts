import { tmdbFetch } from "../../../shared/api/tmdb";
import type { IMovie } from "../model/types";
import { mapTmdbTvShows } from "./mapTmdbTvShow";

export type TmdbResponse = {
    page: number;
    results: {
        id: number;
        backdrop_path: string;
        first_air_date: string | null;
        genre_ids: number[];
        name: string;
        origin_country: string[];
        origin_language: string;
        original_name: string;
        overview: string;
        popularity: number;
        poster_path: string | null;
        vote_average: number;
        vote_count: number;
    }[];
    total_pages: number;
    total_results: number;
};

export const getPopularTv = async (): Promise<IMovie[]> => {
    const popularTv = await tmdbFetch("tv/popular");

    return popularTv.results.map(mapTmdbTvShows);
};
