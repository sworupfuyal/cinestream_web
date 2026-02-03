"use client";
import { Controller, useForm } from "react-hook-form";
import { UserData, UserSchema } from "@/app/admin/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { handleCreateUser } from "@/lib/actions/admin/user-action";

export default function CreateUserForm() {
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<UserData>({
        resolver: zodResolver(UserSchema)
    });
    const [error, setError] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (file: File | undefined, onChange: (file: File | undefined) => void) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
            onChange(file);
        } else {
            setPreviewImage(null);
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

    const onSubmit = async (data: UserData) => {
        setError(null);
            console.log('Form data:', data); // ← Add this

        
        try {
            const formData = new FormData();
            
            if (data.fullname) {
                formData.append('fullname', data.fullname);
            }


            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('confirmPassword', data.confirmPassword);

            if (data.image) {
                formData.append('profile_image', data.image);
            }
                                console.log('Sending FormData:', Object.fromEntries(formData)); // ← Add this

            const response = await handleCreateUser(formData);
                    console.log('Response:', response); // ← Add this


            if (!response.success) {
                throw new Error(response.message || 'Create profile failed');
            }
            
            reset();
            setPreviewImage(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            toast.success('Profile Created successfully');

        } catch (error: Error | any) {
                    console.error('Full error:', error); // ← Add this

            const errorMessage = error.message || 'Create profile failed';
            toast.error(errorMessage);
            setError(errorMessage);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto bg-slate-950 rounded-2xl shadow-2xl p-8 space-y-6">
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
                        {...register("email")}
                        placeholder="you@cinestream.com"
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
                        id="password"
                        type="password"
                        autoComplete="new-password"
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
                        {...register("password")}
                        placeholder="Create a strong password"
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
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        autoComplete="new-password"
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
                        {...register("confirmPassword")}
                        placeholder="Re-enter your password"
                    />
                    {errors.confirmPassword && (
                        <p className="text-xs text-red-400 mt-1">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
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
                    {isSubmitting ? "Creating account..." : "Create Account"}
                </button>
            </form>
        </div>
    );
}