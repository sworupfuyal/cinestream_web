import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const UserSchema = z.object({
    email: z.string().email({ message: "Enter a valid email" }), // ← Add .string()
    password: z.string().min(6, { message: "Minimum 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Minimum 6 characters" }),
    fullname: z.string().optional(),
    image: z
        .instanceof(File)
        .optional()
        .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
            message: "Max file size is 5MB",
        })
        .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: "Only .jpg, .jpeg, .png and .webp formats are supported",
        }),
}).refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});

export type UserData = z.infer<typeof UserSchema>;


const UserEditSchema = z.object({
    fullname: z.string().min(2).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional().or(z.literal('')),
    image: z.any().optional(),
});
    ``
type EditUserData = z.infer<typeof UserEditSchema>;

interface EditUserFormProps {
    user: any;
    userId: string;
}

export type UserEditData = z.infer<typeof UserSchema>;
