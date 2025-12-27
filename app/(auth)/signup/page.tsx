import SignupForm from "../_components/SignupForm";
import Image from "next/image";

export default function SignupPage() {
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

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-center text-white">
          Create your <span className="text-blue-500">CineStream</span> account
        </h1>

        <p className="text-sm text-center text-gray-400 mt-1 mb-6">
          Join CineStream and enjoy unlimited movies and shows
        </p>

        {/* Signup Form */}
        <SignupForm />

        {/* Footer */}
        <p className="text-center text-sm mt-6 text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-400 font-medium hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
