import { tmdbFetch } from "../../../shared/api/tmdb";
import type { IMovie } from "../model/types";
import { mapTmdbMovie } from "./mapTmdbMovie";

export type TmdbResponse = {
    page: number;
    results: {
        id: number;
        title: string;
        poster_path: string;
        vote_average: number;
        release_date: string;
    }[];
    total_pages: number;
    total_results: number;
};

export const getPopularMovies = async (): Promise<IMovie[]> => {
    const popularMovies = await tmdbFetch("movie/popular");

    return popularMovies.results.map(mapTmdbMovie);
};
