"use server";
import { createMovie, deleteMovie, getAllGenres, getAllMovies, getMovieById, updateMovie } from '@/lib/api/admin/movie-api';
import { revalidatePath } from 'next/cache';

export async function handleCreateMovie(formData: FormData) {
    try {
        const response = await createMovie(formData);
        if (response.success) {
            revalidatePath('/admin/movies');
            return {
                success: true,
                message: 'Movie created successfully',
                data: response.data
            };
        }
        return {
            success: false,
            message: response.message || 'Failed to create movie'
        };
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Create movie action failed' };
    }
}

export async function handleGetAllMovies(params?: {
    page?: number;
    limit?: number;
    status?: string;
    genre?: string;
    search?: string;
}) {
    try {
        const response = await getAllMovies(params);
        if (response.success) {
            return {
                success: true,
                message: 'Movies fetched successfully',
                data: response.data,
                pagination: response.pagination
            };
        }
        return {
            success: false,
            message: response.message || 'Failed to fetch movies'
        };
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Fetch movies action failed' };
    }
}

export async function handleGetMovieById(id: string) {
    try {
        const response = await getMovieById(id);
        if (response.success) {
            return {
                success: true,
                message: 'Movie fetched successfully',
                data: response.data
            };
        }
        return {
            success: false,
            message: response.message || 'Failed to fetch movie'
        };
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Fetch movie action failed' };
    }
}

export async function handleUpdateMovie(id: string, formData: FormData) {
    try {
        const response = await updateMovie(id, formData);
        if (response.success) {
            revalidatePath('/admin/movies');
            revalidatePath(`/admin/movies/${id}`);
            return {
                success: true,
                message: 'Movie updated successfully',
                data: response.data
            };
        }
        return {
            success: false,
            message: response.message || 'Failed to update movie'
        };
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Update movie action failed' };
    }
}

export async function handleDeleteMovie(id: string) {
    try {
        const response = await deleteMovie(id);
        if (response.success) {
            revalidatePath('/admin/movies');
            return {
                success: true,
                message: 'Movie deleted successfully'
            };
        }
        return {
            success: false,
            message: response.message || 'Failed to delete movie'
        };
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Delete movie action failed' };
    }
}

export async function handleGetAllGenres() {
    try {
        const response = await getAllGenres();
        if (response.success) {
            return {
                success: true,
                message: 'Genres fetched successfully',
                data: response.data
            };
        }
        return {
            success: false,
            message: response.message || 'Failed to fetch genres'
        };
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Fetch genres action failed' };
    }
}