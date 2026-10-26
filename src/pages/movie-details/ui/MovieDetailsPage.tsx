import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
    getMovieDetails,
    type MovieDetails,
} from "../../../entities/movie/api/getMovieDetails";
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Typography,
} from "@mui/material";
import { useWatchlist } from "../../../app/providers/watchlist/WatchlistProvider";
import {
    ArrowBack,
    BookmarkAdd,
    BookmarkAdded,
    CheckCircle,
    RadioButtonUnchecked,
} from "@mui/icons-material";

const MovieDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<MovieDetails | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<string | null>(null);

    const { watchlist, setWatchlist, watched, setWatched } = useWatchlist();
    const movieId = data ? String(data.id) : "";

    const isInWatchlist = watchlist.includes(movieId);
    const isWatched = watched.includes(movieId);

    const handleWatchlistToggle = () => {
        setWatchlist((prev) =>
            isInWatchlist
                ? prev.filter((item) => item !== movieId)
                : [...prev, movieId],
        );
    };

    const handleWatchedToggle = () => {
        setWatched((prev) =>
            isWatched
                ? prev.filter((item) => item !== movieId)
                : [...prev, movieId],
        );
    };

    useEffect(() => {
        const fetchDetailsPage = async () => {
            if (!id) return;

            try {
                setIsError(null);
                setIsLoading(true);
                const movieDetails = await getMovieDetails(id);
                setData(movieDetails);
            } catch (e) {
                if (e instanceof Error) {
                    setIsError(e.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        void fetchDetailsPage();
    }, [id]);

    if (isLoading) return <CircularProgress />;
    if (isError) return <Alert severity="error">{isError}</Alert>;
    if (data === null) return <h2>Movie not found.</h2>;

    return (
        <Box
            sx={{
                position: "relative",
                minHeight: 420,
                borderRadius: 4,
                overflow: "hidden",
                backgroundColor: "#17191f",
                backgroundImage: data.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`
                    : "none",
                backgroundSize: "cover",
                backgroundPosition: "center 30%",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(90deg, rgba(15,17,22,0.98) 0%, rgba(15,17,22,0.85) 45%, rgba(15,17,22,0.35) 100%), linear-gradient(0deg, rgba(15,17,22,0.8), transparent)",
                }}
            />
            <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate("/discover")}
                sx={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    color: "#fff",
                    textTransform: "none",
                    zIndex: 2,
                }}
            >
                Back to Discover
            </Button>

            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 3, md: 5 },
                    p: { xs: 3, md: 6 },
                    minHeight: 420,
                    color: "#fff",
                    flexWrap: { xs: "wrap", md: "nowrap" },
                }}
            >
                {data.poster_path ? (
                    <Box
                        component="img"
                        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                        alt={data.title}
                        sx={{
                            width: { xs: 150, sm: 190, md: 250 },
                            aspectRatio: "2 / 3",
                            objectFit: "cover",
                            borderRadius: 3,
                            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                            flexShrink: 0,
                        }}
                    />
                ) : null}

                <Box sx={{ maxWidth: 700 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            fontSize: { xs: "2rem", md: "3.5rem" },
                            lineHeight: 1.1,
                            mb: 2,
                        }}
                    >
                        {data.title}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            flexWrap: "wrap",
                            mb: 3,
                            color: "rgba(255,255,255,0.8)",
                        }}
                    >
                        <Typography>
                            {data.release_date
                                ? data.release_date.slice(0, 4)
                                : "Unknown year"}
                        </Typography>

                        <Typography sx={{ color: "#f5c518", fontWeight: 700 }}>
                            ★ {data.vote_average.toFixed(1)} / 10
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            flexWrap: "wrap",
                            mb: 3,
                        }}
                    >
                        {data.genres.map((genre) => (
                            <Chip
                                key={genre.id}
                                label={genre.name}
                                variant="outlined"
                                sx={{
                                    color: "#fff",
                                    borderColor: "rgba(255,255,255,0.35)",
                                    backgroundColor: "rgba(255,255,255,0.06)",
                                }}
                            />
                        ))}
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
                        Overview
                    </Typography>

                    <Typography
                        sx={{
                            color: "rgba(255,255,255,0.78)",
                            lineHeight: 1.8,
                            fontSize: "1rem",
                        }}
                    >
                        {data.overview || "No overview available."}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            mt: 3,
                            flexWrap: "wrap",
                        }}
                    >
                        <Button
                            variant="contained"
                            startIcon={
                                isInWatchlist ? (
                                    <BookmarkAdded />
                                ) : (
                                    <BookmarkAdd />
                                )
                            }
                            onClick={handleWatchlistToggle}
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                backgroundColor: isInWatchlist
                                    ? "#2e7d32"
                                    : "#7c4dff",
                                "&:hover": {
                                    backgroundColor: isInWatchlist
                                        ? "#256428"
                                        : "#6939e8",
                                },
                            }}
                        >
                            {isInWatchlist
                                ? "In Watchlist"
                                : "Add to Watchlist"}
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={
                                isWatched ? (
                                    <CheckCircle />
                                ) : (
                                    <RadioButtonUnchecked />
                                )
                            }
                            onClick={handleWatchedToggle}
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                color: isWatched ? "#81c784" : "#fff",
                                borderColor: isWatched
                                    ? "#4caf50"
                                    : "rgba(255,255,255,0.35)",
                                "&:hover": {
                                    borderColor: "#81c784",
                                    backgroundColor: "rgba(76,175,80,0.08)",
                                },
                            }}
                        >
                            {isWatched ? "Watched" : "Mark as Watched"}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MovieDetailsPage;
