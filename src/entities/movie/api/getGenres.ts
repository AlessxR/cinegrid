import { tmdbFetch } from "../../../shared/api/tmdb";

export type TmdbGenre = {
    id: number;
    name: string;
};

type TmdbGenreResponse = {
    genres: TmdbGenre[];
}

export const getGenres = async (contentType: 'movies' | 'tv') => {
    const endpoint = contentType === 'movies' ? 'genre/movie/list' : 'genre/tv/list';

    const result = await tmdbFetch<TmdbGenreResponse>(endpoint);

    return result.genres;
}