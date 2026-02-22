import { API } from "../endpoints";
import { getAuthToken } from "@/lib/cookie";
import { API_BASE_URL } from "@/lib/constants";

export const createUser = async (userData: any) => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('Not authenticated');
        }

        console.log('📤 Sending request to:', API.ADMIN.USER.CREATE);
        console.log('📦 FormData entries:', userData);
        
        const response = await fetch(`${API_BASE_URL}${API.ADMIN.USER.CREATE}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                // Don't set Content-Type for FormData - browser handles it
            },
            body: userData,
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('❌ Response data:', error);
            console.error('❌ Response status:', response.status);
            throw new Error(error.message || 'Create user failed');
        }

        const data = await response.json();
        console.log('✅ Success response:', data);
        return data;
    } catch (error: Error | any) {
        console.error('❌ Full error object:', error);
        throw new Error(error.message || 'Create user failed');
    }
}

export const getAllUsers = async () => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('Not authenticated');
        }

        const response = await fetch(`${API_BASE_URL}${API.ADMIN.USER.LIST}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch users');
        }

        const data = await response.json();
        return data;
    } catch (error: Error | any) {
        throw new Error(error.message || 'Failed to fetch users');
    }
}

export const getUserById = async (userId: string) => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('Not authenticated');
        }

        const response = await fetch(`${API_BASE_URL}${API.ADMIN.USER.LIST}/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch user');
        }

        const data = await response.json();
        return data;
    } catch (error: Error | any) {
        throw new Error(error.message || 'Failed to fetch user');
    }
}

export const deleteUser = async (userId: string) => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('Not authenticated');
        }

        const response = await fetch(`${API_BASE_URL}${API.ADMIN.USER.DELETE}/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete user');
        }

        const data = await response.json();
        return data;
    } catch (error: Error | any) {
        throw new Error(error.message || 'Failed to delete user');
    }
}

export const updateUser = async (userId: string, userData: any) => {
    try {
        const token = await getAuthToken();
        
        if (!token) {
            throw new Error('Not authenticated');
        }

        const response = await fetch(`${API_BASE_URL}${API.ADMIN.USER.UPDATE}/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                // Don't set Content-Type for FormData - browser handles it
            },
            body: userData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update user');
        }

        const data = await response.json();
        return data;
    } catch (error: Error | any) {
        throw new Error(error.message || 'Failed to update user');
    }
}