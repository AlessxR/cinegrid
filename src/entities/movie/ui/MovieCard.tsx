interface Movie {
    title: string;
    year: number;
    rating: number;
}

const MovieCard = ({ title, year, rating }: Movie) => {
    return (
        <article>
            <h3>Title: {title}</h3>
            <p>Year: {year}</p>
            <p>Rating: {rating}</p>
        </article>
    );
};

export default MovieCard;
