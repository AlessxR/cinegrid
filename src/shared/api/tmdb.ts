export const tmdbFetch = async (endpoint: string) => {
    const response = await fetch(`https://api.themoviedb.org/3/${endpoint}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        },
    });

    if (!response.ok) throw new Error("Failed to get information.");

    return response.json();
};

