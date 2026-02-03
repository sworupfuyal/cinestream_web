// ALL API ENDPOINTS
export const API = {
   AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        WHOAMI: '/api/auth/whoami',
        UPDATEPROFILE: '/api/auth/update-profile',
    },
    ADMIN: {
        USER: {
            CREATE: '/api/admin/users',
            LIST: '/api/admin/users',
            DELETE: '/api/admin/users',
            UPDATE: '/api/admin/users',
        },
    },
} as const;