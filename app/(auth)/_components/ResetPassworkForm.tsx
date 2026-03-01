"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { handleResetPassword } from "@/lib/actions/auth-action";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Link from "next/link";
import { ResetPasswordData, resetPasswordSchema } from "@/app/user/schema";
const ResetPasswordForm = (
    { token }: { token: string }
) => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetPasswordData>({
        mode: "onSubmit",
        resolver: zodResolver(resetPasswordSchema),
    });
    const [error, setError] = useState<string | null>(null);
    const [pending, setTransition] = useTransition();
    const submit = (values: ResetPasswordData) => {
        setError(null);
        setTransition(async () => {
            try {
                const result = await handleResetPassword(token, values.newPassword);
                if (result.success) {
                    toast.success("Password has been reset successfully.");
                    return router.push('/login');
                }
                else {
                    throw new Error(result.message || 'Failed to reset password');
                }
            } catch (err: Error | any) {
                toast.error(err.message || 'Failed to reset password');
            }
        })
    }
    return (

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
            {error && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500 px-4 py-3 rounded-lg">{error}</p>
            )}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">New Password</label>
                <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    className="w-full rounded-lg bg-slate-950 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register("newPassword")}
                    placeholder="••••••"
                />
                {errors.newPassword?.message && (
                    <p className="text-xs text-red-400 mt-1">{errors.newPassword.message}</p>
                )}
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="confirmPassword">Confirm Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    className="w-full rounded-lg bg-slate-950 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register("confirmNewPassword")}
                    placeholder="••••••"
                />
                {errors.confirmNewPassword?.message && (
                    <p className="text-xs text-red-400 mt-1">{errors.confirmNewPassword.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting || pending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition disabled:opacity-60"
            >
                {isSubmitting || pending ? "Resetting password..." : "Reset Password"}
            </button>

            <div className="mt-1 text-center text-sm text-gray-400">
                Want to log in? <Link href="/login" className="text-blue-400 font-medium hover:underline">Log in</Link>
            </div>
        </form>
    );
}

export default ResetPasswordForm;