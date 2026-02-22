// app/user/movies/[id]/page.tsx
import { getAuthToken } from "@/lib/cookie";
import { API_BASE_URL } from "@/lib/constants";
import MovieDetailClient from "./MovieDetailClient";
import { redirect } from "next/navigation";

async function getMovie(id: string) {
    try {
        const token = await getAuthToken();
        if (!token) return null;

        const response = await fetch(`${API_BASE_URL}/api/movies/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) return null;
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        return null;
    }
}

export default async function MovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const movie = await getMovie(id);

    if (!movie) {
        redirect('/user/dashboard');
    }

    return <MovieDetailClient movie={movie} />;
}