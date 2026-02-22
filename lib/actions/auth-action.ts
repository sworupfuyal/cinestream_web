"use server";
import { LoginType, SignupType } from "@/app/(auth)/schema"
import { redirect } from "next/navigation";
import { register, login, whoAmI, updateProfile, resetPassword, requestPasswordReset } from '@/lib/api/auth';
import { clearAuthCookies, setAuthToken, setUserData, getAuthToken } from '@/lib/cookie';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { API_BASE_URL } from "../constants";

export const handleRegister = async (data: SignupType) => {
    try {
        const response = await register(data)
        if (response.success) {
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

export const handleLogin = async (data: LoginType) => {
    try {
        const response = await login(data)
        if (response.success) {
            // Clear any old cookies first
            await clearAuthCookies();
            
            // Set new auth data
            await setAuthToken(response.token)
            await setUserData(response.data)
            
            // ✅ CRITICAL: Revalidate all paths to force re-fetch user data
            revalidatePath('/', 'layout');
            
            return {
                success: true,
                message: 'Login successful',
                data: response.data
            }
        }
        return {
            success: false,
            message: response.message || 'Login failed'
        }
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Login action failed' }
    }
}

export const handleLogout = async () => {
    await clearAuthCookies();
    revalidatePath('/', 'layout'); // Clear all cached data
    return redirect('/login');
}



export async function handleWhoAmI() {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { success: false };
    }

    const data = await res.json();
    return { success: true, data };

  } catch (error) {
    console.error("WHOAMI ERROR:", error);
    return { success: false };
  }
}

export async function handleUpdateProfile(profileData: FormData) {
    try {
        // Get the auth token from server cookies
        const token = await getAuthToken();
        
        if (!token) {
            return { success: false, message: 'Not authenticated' };
        }

        // Pass the token to updateProfile
        const result = await updateProfile(profileData, token);
        
        if (result.success) {
            await setUserData(result.data); 
            revalidatePath('/user/profile'); 
            return {
                success: true,
                message: 'Profile updated successfully',
                data: result.data
            };
        }
        return { success: false, message: result.message || 'Failed to update profile' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}



export const handleRequestPasswordReset = async (email: string) => {
    try {
        const response = await requestPasswordReset(email);
        if (response.success) {
            return {
                success: true,
                message: 'Password reset email sent successfully'
            }
        }
        return { success: false, message: response.message || 'Request password reset failed' }
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Request password reset action failed' }
    }
};

export const handleResetPassword = async (token: string, newPassword: string) => {
    try {
        const response = await resetPassword(token, newPassword);
        if (response.success) {
            return {
                success: true,
                message: 'Password has been reset successfully'
            }
        }
        return { success: false, message: response.message || 'Reset password failed' }
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Reset password action failed' }
    }
};