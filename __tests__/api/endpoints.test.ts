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
});
