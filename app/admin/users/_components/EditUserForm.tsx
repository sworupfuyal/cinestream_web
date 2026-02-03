"use client";
import { Controller, useForm } from "react-hook-form";
import { UserEditData, UserSchema } from "@/app/admin/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { handleUpdateUser } from "@/lib/actions/admin/user-action";
import { useRouter } from "next/navigation";

interface EditUserFormProps {
    user: {
        _id: string;
        fullname?: string;
        email: string;
        profile_image?: string;
    };
}

export default function EditUserForm({ user }: EditUserFormProps) {
    const { register, handleSubmit, control, reset, setValue, formState: { errors, isSubmitting } } = useForm<UserEditData>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            fullname: user.fullname || '',
            email: user.email,
        }
    });
    const [error, setError] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(user.profile_image || null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleImageChange = (file: File | undefined, onChange: (file: File | undefined) => void) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
            onChange(file);
        } else {
            setPreviewImage(user.profile_image || null);
            onChange(undefined);
        }
    };

    const handleDismissImage = (onChange: (file: File | undefined) => void) => {
        setPreviewImage(null);
        onChange(undefined);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const onSubmit = async (data: UserEditData) => {
        setError(null);
        
        try {
            const formData = new FormData();
            
            if (data.fullname) {
                formData.append('fullname', data.fullname);
            }

            if (data.email) {
                formData.append('email', data.email);
            }

            if (data.password) {
                formData.append('password', data.password);
            }

            if (data.confirmPassword) {
                formData.append('confirmPassword', data.confirmPassword);
            }

            if (data.image) {
                formData.append('profile_image', data.image);
            }
            
            const response = await handleUpdateUser(user._id, formData);

            if (!response.success) {
                throw new Error(response.message || 'Update failed');
            }
            
            toast.success('User updated successfully');
            router.push('/admin');

        } catch (error: Error | any) {
            const errorMessage = error.message || 'Update failed';
            toast.error(errorMessage);
            setError(errorMessage);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 p-6">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={() => router.back()}
                        className="text-gray-400 hover:text-white mb-4 inline-flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </button>
                    <h1 className="text-3xl font-bold text-white">Edit User</h1>
                    <p className="text-gray-400 mt-1">Update user information</p>
                </div>

                <div className="bg-slate-900 rounded-2xl shadow-2xl p-8 space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Profile Image Section */}
                        <div className="flex flex-col items-center space-y-3">
                            {previewImage ? (
                                <div className="relative">
                                    <img
                                        src={previewImage}
                                        alt="Profile Image Preview"
                                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
                                    />
                                    <Controller
                                        name="image"
                                        control={control}
                                        render={({ field: { onChange } }) => (
                                            <button
                                                type="button"
                                                onClick={() => handleDismissImage(onChange)}
                                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    />
                                </div>
                            ) : (
                                <div className="w-24 h-24 bg-slate-800 border-2 border-gray-700 rounded-full flex items-center justify-center">
                                    <span className="text-gray-500 text-xs">No Image</span>
                                </div>
                            )}

                            {/* Profile Image Input */}
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Profile Image
                                </label>
                                <Controller
                                    name="image"
                                    control={control}
                                    render={({ field: { onChange } }) => (
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
                                            accept=".jpg,.jpeg,.png,.webp"
                                            className="
                                                w-full
                                                text-sm
                                                text-gray-400
                                                file:mr-4
                                                file:py-2
                                                file:px-4
                                                file:rounded-lg
                                                file:border-0
                                                file:text-sm
                                                file:font-semibold
                                                file:bg-blue-600
                                                file:text-white
                                                hover:file:bg-blue-700
                                                file:cursor-pointer
                                                cursor-pointer
                                            "
                                        />
                                    )}
                                />
                                {errors.image && (
                                    <p className="text-xs text-red-400 mt-1">{errors.image.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                autoComplete="name"
                                className="
                                    w-full
                                    rounded-lg
                                    bg-slate-800
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
                                {...register("fullname")}
                                placeholder="Jane Doe"
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
                                id="email"
                                type="email"
                                autoComplete="email"
                                className="
                                    w-full
                                    rounded-lg
                                    bg-slate-800
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
                                {...register("email")}
                                placeholder="you@cinestream.com"
                            />
                            {errors.email && (
                                <p className="text-xs text-red-400 mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Section */}
                        <div className="border-t border-slate-700 pt-5">
                            <h3 className="text-lg font-semibold text-white mb-4">Change Password (Optional)</h3>
                            <p className="text-sm text-gray-400 mb-4">Leave blank to keep current password</p>

                            {/* Password */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    New Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="new-password"
                                    className="
                                        w-full
                                        rounded-lg
                                        bg-slate-800
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
                                    {...register("password")}
                                    placeholder="New password (optional)"
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
                                    Confirm New Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    className="
                                        w-full
                                        rounded-lg
                                        bg-slate-800
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
                                    {...register("confirmPassword")}
                                    placeholder="Confirm new password"
                                />
                                {errors.confirmPassword && (
                                    <p className="text-xs text-red-400 mt-1">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="
                                    flex-1
                                    bg-slate-700
                                    hover:bg-slate-600
                                    text-white
                                    py-3
                                    rounded-xl
                                    font-semibold
                                    tracking-wide
                                    transition
                                "
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="
                                    flex-1
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
                                {isSubmitting ? "Updating..." : "Update User"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}