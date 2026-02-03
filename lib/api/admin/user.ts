import { API } from "../endpoints";
import axios from "../axios";

export const createUser = async (userData: any) => {
    try {
        console.log('📤 Sending request to:', API.ADMIN.USER.CREATE);
        console.log('📦 FormData entries:', userData);
        
        const response = await axios.post(
            API.ADMIN.USER.CREATE,
            userData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        
        console.log('✅ Success response:', response.data);
        return response.data;
    } catch (error: Error | any) {
        console.error('❌ Full error object:', error);
        console.error('❌ Response data:', error.response?.data);
        console.error('❌ Response status:', error.response?.status);
        console.error('❌ Response headers:', error.response?.headers);
        
        throw new Error(error.response?.data?.message
            || error.message || 'Create user failed');
    }
}

export const getAllUsers = async () => {
    try {
        const response = await axios.get(API.ADMIN.USER.LIST);
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to fetch users');
    }
}

export const getUserById = async (userId: string) => {
    try {
        const response = await axios.get(`${API.ADMIN.USER.LIST}/${userId}`);
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to fetch user');
    }
}

export const deleteUser = async (userId: string) => {
    try {
        const response = await axios.delete(`${API.ADMIN.USER.DELETE}/${userId}`);
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to delete user');
    }
}

export const updateUser = async (userId: string, userData: any) => {
    try {
        const response = await axios.put(
            `${API.ADMIN.USER.UPDATE}/${userId}`,
            userData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to update user');
    }
}