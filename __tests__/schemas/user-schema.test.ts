//  Unit tests for User Schemas (updateUser, forgetPassword, resetPassword)
//   Tests validation rules defined in app/user/schema.ts

import { updateUserSchema, forgetPasswordSchema, resetPasswordSchema } from '@/app/user/schema';

describe('updateUserSchema', () => {
    // Test 14
    it('should accept valid profile update data', () => {
        const result = updateUserSchema.safeParse({
            fullname: 'Jane Doe',
            email: 'jane@example.com',
        });
        expect(result.success).toBe(true);
    });

    // Test 15
    it('should reject fullname shorter than 2 characters', () => {
        const result = updateUserSchema.safeParse({
            fullname: 'J',
            email: 'jane@example.com',
        });
        expect(result.success).toBe(false);
    });

    // Test 16
    it('should reject fullname exceeding 50 characters', () => {
        const result = updateUserSchema.safeParse({
            fullname: 'A'.repeat(51),
            email: 'jane@example.com',
        });
        expect(result.success).toBe(false);
    });

    // Test 17
    it('should reject invalid email in profile update', () => {
        const result = updateUserSchema.safeParse({
            fullname: 'Jane Doe',
            email: 'not-valid',
        });
        expect(result.success).toBe(false);
    });
});

describe('forgetPasswordSchema', () => {
    // Test 18
    it('should accept a valid email', () => {
        const result = forgetPasswordSchema.safeParse({ email: 'user@test.com' });
        expect(result.success).toBe(true);
    });

    // Test 19
    it('should reject invalid email', () => {
        const result = forgetPasswordSchema.safeParse({ email: 'bad-email' });
        expect(result.success).toBe(false);
    });
});

describe('resetPasswordSchema', () => {
    // Test 20
    it('should accept matching passwords', () => {
        const result = resetPasswordSchema.safeParse({
            newPassword: 'newPass123',
            confirmNewPassword: 'newPass123',
        });
        expect(result.success).toBe(true);
    });

    // Test 21
    it('should reject mismatched passwords', () => {
        const result = resetPasswordSchema.safeParse({
            newPassword: 'newPass123',
            confirmNewPassword: 'differentPass',
        });
        expect(result.success).toBe(false);
    });

    // Test 22
    it('should reject password shorter than 6 characters', () => {
        const result = resetPasswordSchema.safeParse({
            newPassword: '12345',
            confirmNewPassword: '12345',
        });
        expect(result.success).toBe(false);
    });
});
