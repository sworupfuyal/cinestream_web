// /lib/api/public-movies.ts
import { getAuthToken } from "@/lib/cookie";
import { API_BASE_URL } from "@/lib/constants";

export const getPublicMovies = async (params?: {
    page?: number;
    limit?: number;
    genre?: string;
    search?: string;
}) => {
    try {
        const token = await getAuthToken();
        const query = new URLSearchParams();
        if (params?.page) query.set('page', String(params.page));
        if (params?.limit) query.set('limit', String(params.limit));
        if (params?.genre) query.set('genre', params.genre);
        if (params?.search) query.set('search', params.search);

        const response = await fetch(
            `${API_BASE_URL}/api/movies?${query.toString()}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
            }
        );

        if (!response.ok) throw new Error('Failed to fetch movies');
        return await response.json();
    } catch (error: any) {
        throw new Error(error.message || 'Failed to fetch movies');
    }
}

export const getPublicMovieById = async (id: string) => {
    try {
        const token = await getAuthToken();

        const response = await fetch(
            `${API_BASE_URL}/api/movies/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
            }
        );

        if (!response.ok) throw new Error('Failed to fetch movie');
        return await response.json();
    } catch (error: any) {
        throw new Error(error.message || 'Failed to fetch movie');
    }
}