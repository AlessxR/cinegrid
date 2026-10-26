export interface IMovie {
    id: string;
    title: string;
    year: number;
    rating: number;
    posterUrl: string;
}

export type MediaDetails = {
    id: number;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    genres: {
        id: number;
        name: string;
    }[];
}