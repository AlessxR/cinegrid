export const tmdbFetch = async <T>(
    endpoint: string,
    query?: Record<string, string | number>,
): Promise<T> => {
    const queryParams = new URLSearchParams(
        query as Record<string, string> | undefined,
    ).toString();
    const response = await fetch(
        `https://api.themoviedb.org/3/${endpoint}${queryParams ? `?${queryParams}` : ""}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
            },
        },
    );

    if (!response.ok) throw new Error("Failed to get information.");

    return response.json();
};
