
import type { IMovie } from "../model/types";

type TmdbTv = {
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
};

export const mapTmdbTvShows = (tv: TmdbTv): IMovie => {
    return {
        id: String(tv.id),
        title: tv.name,
        year: tv.first_air_date
            ? Number(tv.first_air_date.slice(0, 4))
            : 0,
        rating: tv.vote_average,
        posterUrl: tv.poster_path
            ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
            : "",
    };
};
