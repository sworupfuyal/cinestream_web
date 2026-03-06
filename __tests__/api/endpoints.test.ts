//  Unit tests for API Endpoint Constants
// Tests the centralized endpoint definitions in lib/api/endpoints.ts

import { API } from '@/lib/api/endpoints';

describe('API Endpoints', () => {
    describe('AUTH endpoints', () => {
        it('should have correct login endpoint', () => {
            expect(API.AUTH.LOGIN).toBe('/api/auth/login');
        });

        it('should have correct register endpoint', () => {
            expect(API.AUTH.REGISTER).toBe('/api/auth/register');
        });

        it('should generate correct reset password URL with token', () => {
            const token = 'abc123';
            expect(API.AUTH.RESET_PASSWORD(token)).toBe(`/api/auth/reset-password/${token}`);
        });
    });

    describe('ADMIN MOVIES endpoints', () => {
        it('should generate correct movie GET URL with id', () => {
            const id = '64f1b2c3d4e5f6a7b8c9d0e1';
            expect(API.ADMIN.MOVIES.GET(id)).toBe(`/api/admin/movies/${id}`);
        });

        it('should have correct genres endpoint', () => {
            expect(API.ADMIN.MOVIES.GENRES).toBe('/api/admin/movies/genres/list');
        });
    });

    describe('USER LISTS endpoints', () => {
        it('should generate correct remove URL with movieId and listType', () => {
            const movieId = 'movie123';
            const listType = 'favorites';
            expect(API.USER.LISTS.REMOVE(movieId, listType)).toBe(`/api/user/lists/${movieId}/${listType}`);
        });
    });

    describe('PUBLIC MOVIES endpoints', () => {
        it('should have correct public movies list endpoint', () => {
            expect(API.PUBLIC.MOVIES.LIST).toBe('/api/movies');
        });

        it('should generate correct public movie GET URL', () => {
            const id = 'pub123';
            expect(API.PUBLIC.MOVIES.GET(id)).toBe(`/api/movies/${id}`);
        });
    });

    describe('AUTH additional endpoints', () => {
        // Test 26
        it('should have correct whoami endpoint', () => {
            expect(API.AUTH.WHOAMI).toBe('/api/auth/whoami');
        });

        // Test 27
        it('should have correct update profile endpoint', () => {
            expect(API.AUTH.UPDATEPROFILE).toBe('/api/auth/update-profile');
        });

        // Test 28
        it('should have correct request password reset endpoint', () => {
            expect(API.AUTH.REQUEST_PASSWORD_RESET).toBe('/api/auth/request-password-reset');
        });
    });

    describe('ADMIN USER endpoints', () => {
        // Test 29
        it('should have correct admin user create endpoint', () => {
            expect(API.ADMIN.USER.CREATE).toBe('/api/admin/users');
        });

        // Test 30
        it('should have correct admin user list endpoint', () => {
            expect(API.ADMIN.USER.LIST).toBe('/api/admin/users');
        });

        // Test 31
        it('should have correct admin user delete endpoint', () => {
            expect(API.ADMIN.USER.DELETE).toBe('/api/admin/users');
        });
    });

    describe('ADMIN MOVIES additional endpoints', () => {
        // Test 32
        it('should have correct admin movies create endpoint', () => {
            expect(API.ADMIN.MOVIES.CREATE).toBe('/api/admin/movies');
        });

        // Test 33
        it('should have correct admin movies list endpoint', () => {
            expect(API.ADMIN.MOVIES.LIST).toBe('/api/admin/movies');
        });

        // Test 34
        it('should generate correct admin movie UPDATE URL with id', () => {
            const id = 'update456';
            expect(API.ADMIN.MOVIES.UPDATE(id)).toBe('/api/admin/movies/update456');
        });

        // Test 35
        it('should generate correct admin movie DELETE URL with id', () => {
            const id = 'del789';
            expect(API.ADMIN.MOVIES.DELETE(id)).toBe('/api/admin/movies/del789');
        });
    });

    describe('USER LISTS additional endpoints', () => {
        // Test 36
        it('should have correct user lists add endpoint', () => {
            expect(API.USER.LISTS.ADD).toBe('/api/user/lists');
        });

        // Test 37
        it('should have correct user lists get endpoint', () => {
            expect(API.USER.LISTS.GET).toBe('/api/user/lists');
        });

        // Test 38
        it('should have correct user lists status endpoint', () => {
            expect(API.USER.LISTS.STATUS).toBe('/api/user/lists/status');
        });

        // Test 39
        it('should have correct user lists counts endpoint', () => {
            expect(API.USER.LISTS.COUNTS).toBe('/api/user/lists/counts');
        });

        // Test 40
        it('should generate correct remove URL with watchlater listType', () => {
            const movieId = 'movie999';
            const listType = 'watchlater';
            expect(API.USER.LISTS.REMOVE(movieId, listType)).toBe('/api/user/lists/movie999/watchlater');
        });
    });
});
