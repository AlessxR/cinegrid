export type MediaHeroData = {
    id: number;
    title: string;
    date: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    genres: {
        id: number;
        name: string;
    }[];
};