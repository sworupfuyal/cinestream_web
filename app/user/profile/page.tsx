"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { handleUpdateProfile } from "@/lib/actions/auth-action";
import { UpdateUserData, updateUserSchema } from "../schema";
import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/lib/constants";

interface UpdateUserFormProps {
  initialUser?: {
    fullname?: string;
    email?: string;
    imageUrl?: string | null;
  } | null;
}

export default function UpdateUserForm({ initialUser }: UpdateUserFormProps) {
  const router = useRouter();
  const { user, loading: authLoading, checkAuth } = useAuth();
  const effectiveUser = user ?? initialUser ?? null;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [removeImageFlag, setRemoveImageFlag] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullname: "",
      email: "",
      profile_image: undefined,
    },
  });

  // Sync form with user data when it loads
  useEffect(() => {
    console.log("=== USER DATA DEBUG ===");
    console.log("effectiveUser:", effectiveUser);
    console.log("imageUrl:", effectiveUser?.imageUrl);
    
    if (effectiveUser) {
      reset({
        fullname: effectiveUser.fullname ?? "",
        email: effectiveUser.email ?? "",
        profile_image: undefined,
      });

      // ✅ FIX: Set preview image if exists
      if (effectiveUser.imageUrl) {
        const fullUrl = effectiveUser.imageUrl.startsWith("http")
          ? effectiveUser.imageUrl
          : `${API_BASE_URL}${effectiveUser.imageUrl}`;
        
        console.log("Setting preview to:", fullUrl);
        setPreviewSrc(fullUrl);
      } else {
        console.log("No imageUrl found");
        setPreviewSrc(null);
      }
    }
  }, [effectiveUser, reset, effectiveUser?.imageUrl]); // ✅ Added imageUrl to dependencies

  const handleFileSelect = (file: File | undefined, onChange: (f: File | undefined) => void) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error("File too large (>5MB)");
    
    const reader = new FileReader();
    reader.onload = () => setPreviewSrc(reader.result as string);
    reader.readAsDataURL(file);
    
    onChange(file);
    setRemoveImageFlag(false);
  };

  const onFormSubmit = async (values: UpdateUserData) => {
    setServerError(null);
    try {
      const fd = new FormData();
      
      // ✅ Backend expects "fullName" not "fullname"
      fd.append("fullName", values.fullname);
      fd.append("email", values.email);

      if (values.profile_image instanceof File) {
        fd.append("profile_image", values.profile_image);
      } else if (removeImageFlag) {
        fd.append("remove_profile_image", "true");
      }

      const result = await handleUpdateProfile(fd);
      if (!result.success) throw new Error(result.message || "Update failed");

      toast.success("Profile updated!");
      
      // Refresh auth context to get updated user data
      await checkAuth();
      
      // Navigate back after successful update
      router.back();
    } catch (err: any) {
      setServerError(err.message);
      toast.error(err.message);
    }
  };

  const onInvalid = (errors: any) => {
    console.error("Validation Errors:", errors);
    const firstError = Object.values(errors)[0] as any;
    toast.error(`Form Error: ${firstError?.message || "Invalid input"}`);
  };

  if (authLoading) return <div className="p-20 text-center text-white">Loading...</div>;
  if (!effectiveUser) return <div className="p-20 text-center text-white">No Session Found</div>;

  // Check if image is from localhost (use native img) or external (use Next Image)
  const isLocalhost = previewSrc?.includes('localhost') || previewSrc?.includes('127.0.0.1');
  const isBase64 = previewSrc?.startsWith('data:');

  console.log("=== RENDER DEBUG ===");
  console.log("previewSrc:", previewSrc);
  console.log("isLocalhost:", isLocalhost);
  console.log("isBase64:", isBase64);

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-8">
      <div className="mx-auto max-w-2xl">
        <button onClick={() => router.back()} className="text-slate-400 mb-6 hover:text-white">
          ← Back
        </button>

        <form 
          onSubmit={handleSubmit(onFormSubmit, onInvalid)} 
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-8"
        >
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>

          {serverError && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg">
              {serverError}
            </div>
          )}

          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              {previewSrc ? (
                isLocalhost || isBase64 ? (
                  <img
                    src={previewSrc}
                    alt="Preview"
                    className="rounded-full w-32 h-32 object-cover border-4 border-slate-800"
                  />
                ) : (
                  <Image
                    src={previewSrc}
                    alt="Preview"
                    width={128}
                    height={128}
                    className="rounded-full w-32 h-32 object-cover border-4 border-slate-800"
                  />
                )
              ) : (
                <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center text-3xl text-white font-bold">
                  {effectiveUser.fullname?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              
              <Controller
                name="profile_image"
                control={control}
                render={({ field: { onChange } }) => (
                  <>
                    {previewSrc && (
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewSrc(null);
                          setRemoveImageFlag(true);
                          onChange(undefined);
                        }}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700"
                      >
                        ×
                      </button>
                    )}
                    <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 shadow-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e.target.files?.[0], onChange)}
                      />
                    </label>
                  </>
                )}
              />
            </div>
            <p className="text-xs text-slate-500">Click the camera icon to upload</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
              <input
                {...register("fullname")}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
              {errors.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
              <input
                {...register("email")}
                type="email"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 px-6 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
            >
              {isSubmitting ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}