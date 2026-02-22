import { API } from "../endpoints";
import axios from "../axios";

export const createMovie = async (formData: FormData) => {
    try {
        const response = await axios.post(
            API.ADMIN.MOVIES.CREATE,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to create movie');
    }
}

export const getAllMovies = async (params?: {
    page?: number;
    limit?: number;
    genre?: string;
    search?: string;
}) => {
    try {
        const response = await axios.get(API.ADMIN.MOVIES.LIST, { params });
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to fetch movies');
    }
}

export const getMovieById = async (id: string) => {
    try {
        const response = await axios.get(API.ADMIN.MOVIES.GET(id));
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to fetch movie');
    }
}

export const updateMovie = async (id: string, formData: FormData) => {
    try {
        const response = await axios.put(
            API.ADMIN.MOVIES.UPDATE(id),
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to update movie');
    }
}

export const deleteMovie = async (id: string) => {
    try {
        const response = await axios.delete(API.ADMIN.MOVIES.DELETE(id));
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to delete movie');
    }
}

export const getAllGenres = async () => {
    try {
        const response = await axios.get(API.ADMIN.MOVIES.GENRES);
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to fetch genres');
    }
}