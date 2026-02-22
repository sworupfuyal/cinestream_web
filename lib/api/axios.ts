import axios from 'axios';
import { getAuthToken } from '../cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:6050';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important: This sends cookies with requests
});

axiosInstance.interceptors.request.use(
    async (config) => {
        // Only try to get token on server-side
        if (typeof window === 'undefined') {
            try {
                const token = await getAuthToken();
                if (token) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
            } catch (error) {
                console.error('Failed to get auth token:', error);
            }
        }
        // On client-side, cookies are automatically sent via withCredentials
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;