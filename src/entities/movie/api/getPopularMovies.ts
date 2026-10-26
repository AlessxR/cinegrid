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

type PopularMoviesResult = {
    movies: IMovie[];
    page: number;
    totalPages: number;
};

export const getPopularMovies = async (
    page: number = 1,
): Promise<PopularMoviesResult> => {
    const popularMovies = await tmdbFetch<TmdbResponse>("movie/popular", {
        page,
    });

    return {
        movies: popularMovies.results.map(mapTmdbMovie),
        page: popularMovies.page,
        totalPages: popularMovies.total_pages,
    };
};
