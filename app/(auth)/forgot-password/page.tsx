import ForgetPasswordForm from "../_components/ForgetPasswordForm";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#020617] to-black px-4">
            <div className="w-full max-w-md bg-[#020617] rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-800">
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

                <h1 className="text-2xl font-semibold text-center text-white">
                    Forgot your <span className="text-blue-500">password?</span>
                </h1>
                <p className="text-sm text-center text-gray-400 mt-1 mb-6">
                    Enter your email and we&apos;ll send you a reset link
                </p>

                <ForgetPasswordForm />

                <p className="text-center text-sm mt-6 text-gray-400">
                    Remember your password?{" "}
                    <Link href="/login">
                        <span className="text-blue-400 font-medium cursor-pointer hover:underline">
                            Sign in
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    );
}