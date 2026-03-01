"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { handleRequestPasswordReset } from "@/lib/actions/auth-action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ForgetPasswordData, forgetPasswordSchema } from "@/app/user/schema";

const ForgetPasswordForm = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgetPasswordData>({
        mode: "onSubmit",
        resolver: zodResolver(forgetPasswordSchema),
    });
    const [error, setError] = useState<string | null>(null);
    const [pending, setTransition] = useTransition();
    const submit = (values: ForgetPasswordData) => {
        setError(null);
        setTransition(async () => {
            try {
                const result = await handleRequestPasswordReset(values.email);
                if (result.success) {
                    toast.success("If the email is registered, a reset link has been sent.");
                    return router.push('/login');
                }else{
                    throw new Error(result.message || 'Failed to send reset link');
                }
            } catch (err: Error | any) {
                toast.error(err.message || 'Failed to send reset link');
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
            {error && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500 px-4 py-3 rounded-lg">{error}</p>
            )}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="w-full rounded-lg bg-slate-950 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register("email")}
                    placeholder="you@example.com"
                />
                {errors.email?.message && (
                    <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting || pending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition disabled:opacity-60"
            >
                {isSubmitting || pending ? "Sending..." : "Send Reset Link"}
            </button>

            <div className="mt-1 text-center text-sm text-gray-400">
                Already have an account? <Link href="/login" className="text-blue-400 font-medium hover:underline">Log in</Link>
            </div>
        </form>
    );
}

export default ForgetPasswordForm;