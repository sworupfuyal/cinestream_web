//   Unit tests for constants
//   Tests the constants defined in lib/constants.ts

describe('API_BASE_URL constant', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...originalEnv };
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    it('should default to http://localhost:6050 when env is not set', () => {
        delete process.env.NEXT_PUBLIC_API_BASE_URL;
        const { API_BASE_URL } = require('@/lib/constants');
        expect(API_BASE_URL).toBe('http://localhost:6050');
    });

    it('should use environment variable when set', () => {
        process.env.NEXT_PUBLIC_API_BASE_URL = 'https://api.cinestream.com';
        const { API_BASE_URL } = require('@/lib/constants');
        expect(API_BASE_URL).toBe('https://api.cinestream.com');
    });
});
