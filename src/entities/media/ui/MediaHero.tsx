import { Box, Button, Chip, Typography } from "@mui/material";
import type { MediaHeroData } from "../model/types";
import {
    ArrowBack,
    BookmarkAdd,
    BookmarkAdded,
    CheckCircle,
    RadioButtonUnchecked,
} from "@mui/icons-material";

type MediaHeroProps = {
    data: MediaHeroData;
    isInWatchlist: boolean;
    isWatched: boolean;
    onWatchlistToggle: () => void;
    onWatchedToggle: () => void;
    onBack: () => void;
};

const MediaHero = ({
    data,
    isInWatchlist,
    isWatched,
    onWatchlistToggle,
    onWatchedToggle,
    onBack,
}: MediaHeroProps) => {
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
                onClick={onBack}
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
                            {data.date ? data.date.slice(0, 4) : "Unknown year"}
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
                            onClick={onWatchlistToggle}
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
                            onClick={onWatchedToggle}
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

export default MediaHero;
