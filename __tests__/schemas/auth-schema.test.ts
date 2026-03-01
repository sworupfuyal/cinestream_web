//  Unit tests for Auth Schemas (Login, Signup, Movie)
//  Tests validation rules defined in app/(auth)/schema.ts

import { loginSchema, signupSchema, MovieSchema } from '@/app/(auth)/schema';

describe('loginSchema', () => {
    // Test 1
    it('should accept valid login credentials', () => {
        const result = loginSchema.safeParse({
            email: 'user@example.com',
            password: 'password123',
        });
        expect(result.success).toBe(true);
    });

    // Test 2
    it('should reject invalid email format', () => {
        const result = loginSchema.safeParse({
            email: 'not-an-email',
            password: 'password123',
        });
        expect(result.success).toBe(false);
    });

    // Test 3
    it('should reject password shorter than 6 characters', () => {
        const result = loginSchema.safeParse({
            email: 'user@example.com',
            password: '12345',
        });
        expect(result.success).toBe(false);
    });

    // Test 4
    it('should reject empty email', () => {
        const result = loginSchema.safeParse({
            email: '',
            password: 'password123',
        });
        expect(result.success).toBe(false);
    });
});

describe('signupSchema', () => {
    const validSignup = {
        fullname: 'John Doe',
        email: 'john@example.com',
        password: 'securePass1',
        confirmPassword: 'securePass1',
    };

    // Test 5
    it('should accept valid signup data', () => {
        const result = signupSchema.safeParse(validSignup);
        expect(result.success).toBe(true);
    });

    // Test 6
    it('should reject mismatched passwords', () => {
        const result = signupSchema.safeParse({
            ...validSignup,
            confirmPassword: 'differentPass',
        });
        expect(result.success).toBe(false);
    });

    // Test 7
    it('should reject fullname shorter than 3 characters', () => {
        const result = signupSchema.safeParse({
            ...validSignup,
            fullname: 'Jo',
        });
        expect(result.success).toBe(false);
    });

    // Test 8
    it('should reject invalid email in signup', () => {
        const result = signupSchema.safeParse({
            ...validSignup,
            email: 'invalid-email',
        });
        expect(result.success).toBe(false);
    });
});

describe('MovieSchema', () => {
    const validMovie = {
        title: 'Inception',
        description: 'A mind-bending thriller about dream infiltration and subconscious manipulation.',
        duration: 148,
        releaseYear: 2010,
        genres: 'Sci-Fi, Thriller',
        cast: 'Leonardo DiCaprio, Tom Hardy',
        director: 'Christopher Nolan',
    };

    // Test 9
    it('should accept valid movie data', () => {
        const result = MovieSchema.safeParse(validMovie);
        expect(result.success).toBe(true);
    });

    // Test 10
    it('should reject empty title', () => {
        const result = MovieSchema.safeParse({
            ...validMovie,
            title: '',
        });
        expect(result.success).toBe(false);
    });

    // Test 11
    it('should reject description shorter than 10 characters', () => {
        const result = MovieSchema.safeParse({
            ...validMovie,
            description: 'Short',
        });
        expect(result.success).toBe(false);
    });

    // Test 12
    it('should reject release year before 1900', () => {
        const result = MovieSchema.safeParse({
            ...validMovie,
            releaseYear: 1800,
        });
        expect(result.success).toBe(false);
    });

    // Test 13
    it('should reject duration of 0', () => {
        const result = MovieSchema.safeParse({
            ...validMovie,
            duration: 0,
        });
        expect(result.success).toBe(false);
    });
});
