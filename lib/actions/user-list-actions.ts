"use server";
import { revalidatePath } from 'next/cache';
import * as userListApi from '@/lib/api/user-list-api';

export async function handleAddToList(movieId: string, listType: 'favorite' | 'watchlater') {
    try {
        const response = await userListApi.addToList(movieId, listType);
        revalidatePath('/user/dashboard');
        revalidatePath(`/user/${listType === 'favorite' ? 'favorites' : 'watchlater'}`);
        return {
            success: true,
            message: `Added to ${listType === 'favorite' ? 'favorites' : 'watch later'}`,
            data: response.data
        };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function handleRemoveFromList(movieId: string, listType: 'favorite' | 'watchlater') {
    try {
        const response = await userListApi.removeFromList(movieId, listType);
        revalidatePath('/user/dashboard');
        revalidatePath(`/user/${listType === 'favorite' ? 'favorites' : 'watchlater'}`);
        return {
            success: true,
            message: `Removed from ${listType === 'favorite' ? 'favorites' : 'watch later'}`
        };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function handleGetUserLists(listType?: 'favorite' | 'watchlater') {
    try {
        const response = await userListApi.getUserLists(listType);
        return {
            success: true,
            message: 'Lists fetched successfully',
            data: response.data
        };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function handleGetListStatus(movieIds: string[]) {
    try {
        const response = await userListApi.getListStatus(movieIds);
        return {
            success: true,
            data: response.data
        };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function handleGetListCounts() {
    try {
        const response = await userListApi.getListCounts();
        return {
            success: true,
            data: response.data
        };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function handleGetAllMovies(params?: {
    page?: number;
    limit?: number;
    genre?: string;
    search?: string;
}) {
    try {
        const response = await userListApi.getAllMoviesPublic(params);
        return {
            success: true,
            data: response.data,
            pagination: response.pagination
        };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}