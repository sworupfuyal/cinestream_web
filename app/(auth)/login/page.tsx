import LoginForm from "../_components/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#020617] to-black px-4">
      <div className="w-full max-w-md bg-[#020617] rounded-2xl p-8 shadow-2xl border border-gray-800">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/images/logo.png"
            alt="CineStream Logo"
            width={90}
            height={90}
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-white">
          Welcome back to <span className="text-blue-500">CineStream</span>
        </h1>

        <p className="text-sm text-center text-gray-400 mt-1 mb-6">
          Sign in to continue watching your favorite movies
        </p>

        {/* Login Form */}
        <LoginForm />

        {/* Signup */}
        <p className="text-center text-sm mt-6 text-gray-400">
          New to CineStream?{" "}
          <span className="text-blue-400 font-medium cursor-pointer hover:underline">
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}
