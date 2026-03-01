/** @type {import('jest').Config} */
const config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>'],
    testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    collectCoverageFrom: [
        'app/**/*.{ts,tsx}',
        'lib/**/*.ts',
        'context/**/*.{ts,tsx}',
        '!**/*.d.ts',
        '!**/__tests__/**',
    ],
    // Setup file for extending matchers (e.g., @testing-library/jest-dom)
    // setupFiles: ['<rootDir>/__tests__/setup.ts'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
        }],
    },
};

module.exports = config;
