import type { IMovie } from "../model/types";

type TmdbMovie = {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
    release_date: string;
};

export const mapTmdbMovie = (movie: TmdbMovie): IMovie => {
    return {
        id: String(movie.id),
        title: movie.title,
        posterUrl: movie.poster_path
            ? "https://image.tmdb.org/t/p/w500".concat(movie.poster_path)
            : "",
        rating: movie.vote_average,
        year: movie.release_date ? Number(movie.release_date.slice(0, 4)) : 0,
    };
};
