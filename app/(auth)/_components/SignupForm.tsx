"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleRegister } from "@/lib/actions/auth-action";
import z from "zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export const signupSchema = z.object({
  fullname: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm password is required" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export type SignupType = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupType>({
    resolver: zodResolver(signupSchema),
  });
  const [error, setError] = useState("");

  const onSubmit = async (data: SignupType) => {
    setError("");
    try {
      console.log("Form data being sent:", data);
      const result = await handleRegister(data);
      console.log("Server response:", result);

      if (!result || !result.success) {
        setError(result?.message || "Registration failed. Please try again.");
        return;
      }

      // Use startTransition for navigation
      startTransition(() => {
        router.push("/login");
      });
    } catch (e: any) {
      console.error("Registration error:", e);
      setError(e.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-950 rounded-2xl shadow-2xl p-8 space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Full Name
          </label>
          <input
            {...register("fullname")}
            placeholder="John Doe"
            className="
              w-full
              rounded-lg
              bg-slate-950
              border border-gray-700
              px-4 py-3
              text-sm
              text-white
              placeholder-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
            "
          />
          {errors.fullname && (
            <p className="text-xs text-red-400 mt-1">
              {errors.fullname.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="you@cinestream.com"
            className="
              w-full
              rounded-lg
              bg-slate-950
              border border-gray-700
              px-4 py-3
              text-sm
              text-white
              placeholder-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
            "
          />
          {errors.email && (
            <p className="text-xs text-red-400 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="Create a strong password"
            className="
              w-full
              rounded-lg
              bg-slate-950
              border border-gray-700
              px-4 py-3
              text-sm
              text-white
              placeholder-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
            "
          />
          {errors.password && (
            <p className="text-xs text-red-400 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Re-enter your password"
            className="
              w-full
              rounded-lg
              bg-slate-950
              border border-gray-700
              px-4 py-3
              text-sm
              text-white
              placeholder-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
            "
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-400 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={isSubmitting || pending}
          type="submit"
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            disabled:opacity-60
            text-white
            py-3
            rounded-xl
            font-semibold
            tracking-wide
            transition
          "
        >
          {isSubmitting || pending ? "Creating your account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}