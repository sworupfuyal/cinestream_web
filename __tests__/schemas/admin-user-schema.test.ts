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
});
