"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupType } from "../schema";
import { Film } from "lucide-react";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupType>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupType) => {
    console.log("CineStream Signup:", data);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-[#020617] rounded-2xl shadow-2xl p-8 space-y-6">
      {/* Header / Branding */}
      <div className="flex items-center gap-2">
        <Film className="text-blue-500" size={28} />
        <h1 className="text-2xl font-semibold text-white">
          Create your <span className="text-blue-500">CineStream</span> account
        </h1>
      </div>

      <p className="text-sm text-gray-400">
        Join CineStream and start watching unlimited movies and shows.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Full Name
          </label>
          <input
            {...register("fullName")}
            placeholder="John Doe"
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
          {errors.fullName && (
            <p className="text-xs text-blue-400 mt-1">
              {errors.fullName.message}
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
            placeholder="Create a strong password"
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
          {errors.password && (
            <p className="text-xs text-blue-400 mt-1">
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
          {errors.confirmPassword && (
            <p className="text-xs text-blue-400 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
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
          {isSubmitting ? "Creating your account..." : "Create Account"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-sm text-gray-400 text-center">
        Already have an account?{" "}
        <span className="text-blue-400 hover:underline cursor-pointer">
          Sign in
        </span>
      </p>
    </div>
  );
}
