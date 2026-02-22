// Update your existing endpoints.ts file to include these:

export const API = {
   AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        WHOAMI: '/api/auth/whoami',
        UPDATEPROFILE: '/api/auth/update-profile',
        REQUEST_PASSWORD_RESET: '/api/auth/request-password-reset',
        RESET_PASSWORD: (token: string) => `/api/auth/reset-password/${token}`,
    },
    ADMIN: {
        USER: {
            CREATE: '/api/admin/users',
            LIST: '/api/admin/users',
            DELETE: '/api/admin/users',
            UPDATE: '/api/admin/users',
        },
        MOVIES: {
            CREATE: '/api/admin/movies',
            LIST: '/api/admin/movies',
            GET: (id: string) => `/api/admin/movies/${id}`,
            UPDATE: (id: string) => `/api/admin/movies/${id}`,
            DELETE: (id: string) => `/api/admin/movies/${id}`,
            GENRES: '/api/admin/movies/genres/list',
        },
    },
    USER: {
        LISTS: {
            ADD: '/api/user/lists',
            GET: '/api/user/lists',
            REMOVE: (movieId: string, listType: string) => `/api/user/lists/${movieId}/${listType}`,
            STATUS: '/api/user/lists/status',
            COUNTS: '/api/user/lists/counts',
        },
    },
    PUBLIC: {
        MOVIES: {
            LIST: '/api/movies',
            GET: (id: string) => `/api/movies/${id}`,
        },
    },
} as const;