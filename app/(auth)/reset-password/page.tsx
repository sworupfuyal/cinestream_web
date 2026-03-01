import ResetPasswordForm from "../_components/ResetPassworkForm";
import Image from "next/image";

export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const query = await searchParams;
    const token = query.token as string | undefined;
    if(!token){
        throw new Error('Invalid or missing token');
    }

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
                    Reset your <span className="text-blue-500">password</span>
                </h1>
                <p className="text-sm text-center text-gray-400 mt-1 mb-6">
                    Enter your new password below
                </p>

                <ResetPasswordForm token={token} />
            </div>
        </div>
    );
}