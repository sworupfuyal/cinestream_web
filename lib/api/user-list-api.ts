import axios from './axios';
import { API } from './endpoints';

export const addToList = async (movieId: string, listType: 'favorite' | 'watchlater') => {
    try {
        const response = await axios.post(
            API.USER.LISTS.ADD,
            { movieId, listType }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to add to list');
    }
}

export const removeFromList = async (movieId: string, listType: 'favorite' | 'watchlater') => {
    try {
        const response = await axios.delete(
            API.USER.LISTS.REMOVE(movieId, listType)
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to remove from list');
    }
}

export const getUserLists = async (listType?: 'favorite' | 'watchlater') => {
    try {
        const response = await axios.get(
            API.USER.LISTS.GET,
            { params: { listType } }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to fetch lists');
    }
}

export const getListStatus = async (movieIds: string[]) => {
    try {
        const response = await axios.post(
            API.USER.LISTS.STATUS,
            { movieIds }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to fetch list status');
    }
}

export const getListCounts = async () => {
    try {
        const response = await axios.get(API.USER.LISTS.COUNTS);
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to fetch list counts');
    }
}

export const getAllMoviesPublic = async (params?: {
    page?: number;
    limit?: number;
    genre?: string;
    search?: string;
}) => {
    try {
        const response = await axios.get(API.PUBLIC.MOVIES.LIST, { params });
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to fetch movies');
    }
}

export const getMovieById = async (id: string) => {
    try {
        const response = await axios.get(API.PUBLIC.MOVIES.GET(id));
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to fetch movie');
    }
}