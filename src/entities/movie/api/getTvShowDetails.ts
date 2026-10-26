
import { tmdbFetch } from "../../../shared/api/tmdb";

export type TvShowDetails = {
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    first_air_date: string;
    vote_average: number;
    genres: {
        id: number;
        name: string;
    }[];
};

export const getTvShowDetails = (id: string): Promise<TvShowDetails> => {
    return tmdbFetch(`tv/${id}`);
};
