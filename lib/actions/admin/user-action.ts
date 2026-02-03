"use server";
import { createUser, deleteUser, updateUser } from "@/lib/api/admin/user";
import { revalidatePath } from 'next/cache';

export const handleCreateUser = async (data: FormData) => {
    try {
        const response = await createUser(data)
        if (response.success) {
            revalidatePath('/admin/users');
            return {
                success: true,
                message: 'Registration successful',
                data: response.data
            }
        }
        return {
            success: false,
            message: response.message || 'Registration failed'
        }
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Registration action failed' }
    }
}
export const handleUpdateUser = async (userId: string, data: FormData) => {
    try {
        const response = await updateUser(userId, data);
        
        if (response.success) {
            revalidatePath('/admin');
            revalidatePath('/admin/users');
            revalidatePath(`/admin/users/${userId}/edit`);
            return {
                success: true,
                message: 'User updated successfully',
                data: response.data
            }
        }
        
        return {
            success: false,
            message: response.message || 'Update failed'
        }
    } catch (error: Error | any) {
        return { 
            success: false, 
            message: error.message || 'Update action failed' 
        }
    }
}

export const handleDeleteUser = async (userId: string) => {
    try {
        const response = await deleteUser(userId);
        
        if (response.success) {
            revalidatePath('/admin');
            revalidatePath('/admin/users');
            return {
                success: true,
                message: 'User deleted successfully'
            }
        }
        
        return {
            success: false,
            message: response.message || 'Delete failed'
        }
    } catch (error: Error | any) {
        return { 
            success: false, 
            message: error.message || 'Delete action failed' 
        }
    }
}

        