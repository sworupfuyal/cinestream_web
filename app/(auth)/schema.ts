import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type LoginType = z.infer<typeof loginSchema>;

//Signup schema
export const signupSchema = z
  .object({
    fullname: z.string().min(3, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupType = z.infer<typeof signupSchema>;

export const MovieSchema = z.object({
    title: z.string().min(1, "Title is required").max(200, "Title is too long"),
    description: z.string().min(10, "Description must be at least 10 characters").max(2000, "Description is too long"),
    
    // Accept number directly (from valueAsNumber: true)
    duration: z.number().min(1, "Duration must be at least 1 minute"),
    releaseYear: z.number()
        .min(1900, "Release year must be 1900 or later")
        .max(new Date().getFullYear() + 5, "Release year cannot be more than 5 years in the future"),
    
    genres: z.string().min(1, "At least one genre is required"),
    cast: z.string().min(1, "At least one cast member is required"),
    director: z.string().min(1, "Director is required"),
    thumbnailUrl: z.string().url("Invalid URL").optional().or(z.literal('')),
    videoUrl: z.string().url("Invalid URL").optional().or(z.literal('')),
    thumbnail: z.instanceof(File).optional(),
    video: z.instanceof(File).optional(),
});

// For editing - all fields optional
export const MovieEditSchema = MovieSchema.partial();

export type MovieData = z.infer<typeof MovieSchema>;
export type MovieEditData = z.infer<typeof MovieEditSchema>;