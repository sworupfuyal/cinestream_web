"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/lib/actions/auth-action";
import { useState, useTransition } from "react";
import z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginType = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginType) => {
    setError("");
    try {
      const result = await handleLogin(data);
      
      if (!result.success) {
        setError(result.message);
        return;
      }

      // Use startTransition for navigation
      startTransition(() => {
        router.push("/dashboard");
      });
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-950 p-8 rounded-2xl shadow-2xl space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            placeholder="••••••••"
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

        {/* Forgot Password */}
        <div className="text-right">
          <span 
            onClick={() => router.push("/forgot-password")}
            className="text-sm text-blue-400 hover:underline cursor-pointer"
          >
            Forgot password?
          </span>
        </div>

        {/* Button */}
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
          {isSubmitting || pending ? "Signing you in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}