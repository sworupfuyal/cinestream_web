//AUTHENTICATION API CALL
import axios from "./axios"; //IMPORTANT
import {API} from "./endpoints";

//registrationData: any -> can be RegistrationType from schema

export const register = async (registrationData: any) => {
    try {
        // Backend validation expects confirmPassword even though it doesn't use it
        // So we send it to match backend schema
        const backendData = {
            fullname: registrationData.fullName,
            email: registrationData.email,
            password: registrationData.password,
            confirmPassword: registrationData.confirmPassword
        };
        
        const response = await axios.post(API.AUTH.REGISTER, backendData);
        // Return success response with consistent structure
        return {
            success: true,
            message: response.data.message || "Registration successful",
            data: response.data.data || response.data
        };
    } catch (err: any) {
        // Return error object instead of throwing
        return {
            success: false,
            message: err.response?.data?.message 
                || err.message 
                || 'Registration Failed'
        };
    }
}

export const login = async (loginData: any) => {
    try {
        const response = await axios.post(API.AUTH.LOGIN, loginData);
        // Return success response with consistent structure
        return {
            success: true,
            message: response.data.message || "Login successful",
            token: response.data.token,
            data: response.data.data || response.data.user || response.data
        };
    } catch (err: any) {
        // Return error object instead of throwing
        return {
            success: false,
            message: err.response?.data?.message 
                || err.message 
                || 'Login Failed'
        };
    }
}