//  Unit tests for Admin User Schema
//  Tests validation rules defined in app/admin/users/schema.ts
import { UserSchema } from '@/app/admin/users/schema';

describe('Admin UserSchema', () => {
    const validUser = {
        email: 'admin@test.com',
        password: 'secure123',
        confirmPassword: 'secure123',
    };

    // Test 23
    it('should accept valid user data with required fields', () => {
        const result = UserSchema.safeParse(validUser);
        expect(result.success).toBe(true);
    });

    // Test 24
    it('should accept user data with optional fullname', () => {
        const result = UserSchema.safeParse({
            ...validUser,
            fullname: 'Admin User',
        });
        expect(result.success).toBe(true);
    });

    // Test 25
    it('should reject mismatched passwords', () => {
        const result = UserSchema.safeParse({
            ...validUser,
            confirmPassword: 'wrongPass',
        });
        expect(result.success).toBe(false);
    });

    // Test 51
    it('should reject invalid email format', () => {
        const result = UserSchema.safeParse({
            ...validUser,
            email: 'not-an-email',
        });
        expect(result.success).toBe(false);
    });

    // Test 52
    it('should reject password shorter than 6 characters', () => {
        const result = UserSchema.safeParse({
            ...validUser,
            password: '12345',
            confirmPassword: '12345',
        });
        expect(result.success).toBe(false);
    });

    // Test 53
    it('should accept user with empty optional fullname omitted', () => {
        const result = UserSchema.safeParse({
            email: 'user@cinestream.com',
            password: 'strongPass1',
            confirmPassword: 'strongPass1',
        });
        expect(result.success).toBe(true);
    });

    // Test 54
    it('should reject empty email', () => {
        const result = UserSchema.safeParse({
            ...validUser,
            email: '',
        });
        expect(result.success).toBe(false);
    });

    // Test 55
    it('should reject empty password', () => {
        const result = UserSchema.safeParse({
            ...validUser,
            password: '',
            confirmPassword: '',
        });
        expect(result.success).toBe(false);
    });
});
