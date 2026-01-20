"use server"

import { login, register } from "../api/auth"
import { setAuthToken, setUserData } from "../cookie"

export async function handleRegister(formData: any) {
    try {
        console.log("handleRegister called with:", formData);
        
        // Validate formData exists
        if (!formData) {
            return { 
                success: false, 
                message: "No data provided" 
            };
        }

        // Call the register API
        const result = await register(formData);
        console.log("Register API result:", result);
        
        // Check if result exists and has success property
        if (!result) {
            return { 
                success: false, 
                message: "No response from server" 
            };
        }

        if (result.success) {
            return {
                success: true,
                message: "Registration successful",
                data: result.data
            };
        }
        
        return { 
            success: false, 
            message: result.message || "Registration failed" 
        };
        
    } catch (err: any) {
        console.error("handleRegister error:", err);
        return { 
            success: false, 
            message: err.message || "An error occurred during registration" 
        };
    }
}

export async function handleLogin(formData: any) {
    try {
        console.log("handleLogin called with:", formData);
        
        // Validate formData exists
        if (!formData) {
            return { 
                success: false, 
                message: "No data provided" 
            };
        }

        // Call the login API
        const result = await login(formData);
        console.log("Login API result:", result);
        
        // Check if result exists
        if (!result) {
            return { 
                success: false, 
                message: "No response from server" 
            };
        }

        if (result.success) {
            // Set cookies only if we have the token and data
            if (result.token) {
                await setAuthToken(result.token);
            }
            if (result.data) {
                await setUserData(result.data);
            }
            
            return {
                success: true,
                message: "Login successful",
                data: result.data
            };
        }
        
        return { 
            success: false, 
            message: result.message || "Login failed" 
        };
        
    } catch (err: any) {
        console.error("handleLogin error:", err);
        return { 
            success: false, 
            message: err.message || "An error occurred during login" 
        };
    }
}