"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { handleUpdateProfile } from "@/lib/actions/auth-action";
import { UpdateUserData, updateUserSchema } from "../schema";
import { useAuth } from "@/context/AuthContext";

interface UpdateUserFormProps {
  user: {
    fullname?: string;
    email: string;
    username?: string;
    imageUrl?: string;
  };
}

export default function UpdateUserForm({ user }: UpdateUserFormProps) {
  const router = useRouter();
  const { checkAuth } = useAuth(); // To refresh auth context after update
  
  const { 
    register, 
    handleSubmit, 
    control, 
    formState: { errors, isSubmitting, isDirty } 
  } = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullname: user?.fullname || '',
      email: user.email,
      username: user?.username || '',
    }
  });

  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(user.imageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (file: File | undefined, onChange: (file: File | undefined) => void) => {
    if (file) {
      // Validate file before preview
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload a valid image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
      onChange(file);
    } else {
      setPreviewImage(user.imageUrl || null);
      onChange(undefined);
    }
  };

  const handleDismissImage = (onChange: (file: File | undefined) => void) => {
    setPreviewImage(null);
    onChange(undefined);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onSubmit = async (data: UpdateUserData) => {
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('fullname', data.fullname);
      formData.append('email', data.email);
      formData.append('username', data.username);
      
      if (data.profile_image) {
        formData.append('profile_image', data.profile_image);
      }

      const response = await handleUpdateProfile(formData);

      if (!response.success) {
        throw new Error(response.message || 'Update failed');
      }

      toast.success('Profile updated successfully! 🎉');
      
      // Refresh auth context to update user data everywhere
      await checkAuth();
      
      // Refresh the page to show updated data
      router.refresh();
      
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update profile';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white mb-4 inline-flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-white">Update Profile</h1>
          <p className="text-gray-400 mt-1">Keep your information up to date</p>
        </div>

        <div className="bg-slate-900 rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile Preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-slate-700 shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-slate-700 shadow-lg">
                    <span className="text-white text-4xl font-bold">
                      {user?.fullname?.charAt(0)?.toUpperCase() || user?.username?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                )}
                
                {/* Remove Image Button */}
                {previewImage && (
                  <Controller
                    name="profile_image"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <button
                        type="button"
                        onClick={() => handleDismissImage(onChange)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600 transition shadow-lg"
                        title="Remove image"
                      >
                        ✕
                      </button>
                    )}
                  />
                )}
              </div>

              {/* Upload Image Input */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Profile Image
                </label>
                <Controller
                  name="profile_image"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      className="
                        w-full text-sm text-gray-400
                        file:mr-4 file:py-2.5 file:px-5 file:rounded-lg
                        file:border-0 file:text-sm file:font-semibold
                        file:bg-blue-600 file:text-white
                        hover:file:bg-blue-700 file:cursor-pointer cursor-pointer
                        file:transition-colors
                      "
                    />
                  )}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: JPG, PNG, WEBP (Max 5MB)
                </p>
                {errors.profile_image && (
                  <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.profile_image.message}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-slate-800 pt-6 space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  {...register("fullname")}
                  id="fullname"
                  placeholder="John Doe"
                  className={`
                    w-full rounded-lg bg-slate-800 border
                    ${errors.fullname ? 'border-red-500' : 'border-gray-700'}
                    px-4 py-3 text-sm text-white placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition-all
                  `}
                />
                {errors.fullname && (
                  <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.fullname.message}
                  </p>
                )}
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username *
                </label>
                <input
                  {...register("username")}
                  id="username"
                  placeholder="johndoe"
                  className={`
                    w-full rounded-lg bg-slate-800 border
                    ${errors.username ? 'border-red-500' : 'border-gray-700'}
                    px-4 py-3 text-sm text-white placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition-all
                  `}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Letters, numbers, and underscores only
                </p>
                {errors.username && (
                  <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className={`
                    w-full rounded-lg bg-slate-800 border
                    ${errors.email ? 'border-red-500' : 'border-gray-700'}
                    px-4 py-3 text-sm text-white placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition-all
                  `}
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit / Cancel Buttons */}
            <div className="flex gap-3 pt-6 border-t border-slate-800">
              <button
                type="button"
                onClick={() => router.back()}
                disabled={isSubmitting}
                className="
                  flex-1 bg-slate-700 hover:bg-slate-600 text-white
                  py-3 rounded-xl font-semibold tracking-wide transition
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2
                "
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !isDirty}
                className="
                  flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50
                  text-white py-3 rounded-xl font-semibold tracking-wide transition
                  disabled:cursor-not-allowed
                  flex items-center justify-center gap-2
                "
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Update Profile
                  </>
                )}
              </button>
            </div>
            
            {!isDirty && !isSubmitting && (
              <p className="text-center text-xs text-gray-500">
                Make changes to enable the update button
              </p>
            )}
          </form>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Account Information
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-800">
              <span className="text-gray-400">Account Status</span>
              <span className="text-green-400 font-medium">Active</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Member Since</span>
              <span className="text-gray-300">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}