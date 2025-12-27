"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginType } from "../schema";
import { useRouter } from "next/navigation";
import { Film } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginType) => {
    console.log("CineStream Login:", data);
    router.push("/dashboard");
  };

  return (
    <div className="bg-blue p-8 rounded-2xl shadow-2xl space-y-6">
      {/* Branding */}
      <div className="flex items-center gap-2">
        <Film className="text-blue-500" size={26} />
        <h1 className="text-2xl font-semibold text-white">
          Cine<span className="text-blue">Stream</span>
        </h1>
      </div>

      <p className="text-sm text-gray-400">
        Sign in to continue watching your favorite movies
      </p>

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
              bg-[#020617]
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
            <p className="text-xs text-blue-400 mt-1">
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
              bg-blue
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
            <p className="text-xs text-blue-400 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <span className="text-sm text-blue-400 hover:underline cursor-pointer">
            Forgot password?
          </span>
        </div>

        {/* Button */}
        <button
          disabled={isSubmitting}
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
          {isSubmitting ? "Signing you in..." : "Sign In"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-sm text-gray-400 text-center">
        New to CineStream?{" "}
        <span className="text-blue-400 hover:underline cursor-pointer">
          Create an account
        </span>
      </p>
    </div>
  );
}
