"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { handleCreateMovie } from "@/lib/actions/admin/movie-action";
import { useRouter } from "next/navigation";
import { MovieData, MovieSchema } from "@/app/(auth)/schema";

export default function CreateMovieForm() {
    const router = useRouter();
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<MovieData>({
        resolver: zodResolver(MovieSchema),
    });
    
    const [error, setError] = useState<string | null>(null);
    const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(null);
    const thumbnailInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (file: File | undefined, onChange: (file: File | undefined) => void) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewThumbnail(reader.result as string);
            };
            reader.readAsDataURL(file);
            onChange(file);
        } else {
            setPreviewThumbnail(null);
            onChange(undefined);
        }
    };

    const handleDismissImage = (onChange: (file: File | undefined) => void) => {
        setPreviewThumbnail(null);
        onChange(undefined);
        if (thumbnailInputRef.current) {
            thumbnailInputRef.current.value = '';
        }
    };

    const onSubmit = async (data: MovieData) => {
        setError(null);
        
        try {
            const formData = new FormData();
            
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('duration', data.duration.toString());
            formData.append('releaseYear', data.releaseYear.toString());
            formData.append('genres', data.genres);
            formData.append('cast', data.cast);
            formData.append('director', data.director);
            
            if (data.thumbnailUrl) {
                formData.append('thumbnailUrl', data.thumbnailUrl);
            }
            
            if (data.videoUrl) {
                formData.append('videoUrl', data.videoUrl);
            }
            
            if (data.thumbnail) {
                formData.append('thumbnail', data.thumbnail);
            }
            
            if (data.video) {
                formData.append('video', data.video);
            }

            const response = await handleCreateMovie(formData);

            if (!response.success) {
                throw new Error(response.message || 'Create movie failed');
            }
            
            reset();
            setPreviewThumbnail(null);
            if (thumbnailInputRef.current) {
                thumbnailInputRef.current.value = '';
            }
            toast.success('Movie created successfully');
            router.push('/admin/movies');

        } catch (error: Error | any) {
            const errorMessage = error.message || 'Create movie failed';
            toast.error(errorMessage);
            setError(errorMessage);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-slate-950 rounded-2xl shadow-2xl p-8 space-y-6">
            {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Thumbnail Preview */}
                <div className="flex flex-col items-center space-y-3">
                    {previewThumbnail ? (
                        <div className="relative">
                            <img
                                src={previewThumbnail}
                                alt="Thumbnail Preview"
                                className="w-48 h-72 object-cover rounded-lg border-2 border-gray-700"
                            />
                            <Controller
                                name="thumbnail"
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <button
                                        type="button"
                                        onClick={() => handleDismissImage(onChange)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600 transition"
                                    >
                                        ✕
                                    </button>
                                )}
                            />
                        </div>
                    ) : (
                        <div className="w-48 h-72 bg-slate-800 border-2 border-gray-700 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500 text-sm">No Thumbnail</span>
                        </div>
                    )}
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-5">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Title *
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-lg bg-slate-900 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("title")}
                                placeholder="The Matrix"
                            />
                            {errors.title && (
                                <p className="text-xs text-red-400 mt-1">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Director */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Director *
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-lg bg-slate-900 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("director")}
                                placeholder="Christopher Nolan"
                            />
                            {errors.director && (
                                <p className="text-xs text-red-400 mt-1">{errors.director.message}</p>
                            )}
                        </div>

                        {/* Duration & Release Year */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Duration (min) *
                                </label>
                                <input
                                    type="number"
                                    className="w-full rounded-lg bg-slate-900 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    {...register("duration", { valueAsNumber: true })}
                                    placeholder="120"
                                />
                                {errors.duration && (
                                    <p className="text-xs text-red-400 mt-1">{errors.duration.message}</p>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Release Year *
                                </label>
                                <input
                                    type="number"
                                    className="w-full rounded-lg bg-slate-900 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    {...register("releaseYear", { valueAsNumber: true })}
                                    placeholder="2023"
                                />
                                {errors.releaseYear && (
                                    <p className="text-xs text-red-400 mt-1">{errors.releaseYear.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Genres */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Genres * <span className="text-gray-500 text-xs">(comma-separated)</span>
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-lg bg-slate-900 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("genres")}
                                placeholder="Action, Sci-Fi, Thriller"
                            />
                            {errors.genres && (
                                <p className="text-xs text-red-400 mt-1">{errors.genres.message}</p>
                            )}
                        </div>

                        {/* Cast */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Cast * <span className="text-gray-500 text-xs">(comma-separated)</span>
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-lg bg-slate-900 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("cast")}
                                placeholder="Keanu Reeves, Laurence Fishburne"
                            />
                            {errors.cast && (
                                <p className="text-xs text-red-400 mt-1">{errors.cast.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5">
                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Description *
                            </label>
                            <textarea
                                rows={6}
                                className="w-full rounded-lg bg-slate-900 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("description")}
                                placeholder="A brief synopsis of the movie..."
                            />
                            {errors.description && (
                                <p className="text-xs text-red-400 mt-1">{errors.description.message}</p>
                            )}
                        </div>

                        {/* Thumbnail Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Thumbnail Image
                            </label>
                            <Controller
                                name="thumbnail"
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <input
                                        ref={thumbnailInputRef}
                                        type="file"
                                        onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
                                        accept=".jpg,.jpeg,.png,.webp"
                                        className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer"
                                    />
                                )}
                            />
                            {errors.thumbnail && (
                                <p className="text-xs text-red-400 mt-1">{errors.thumbnail.message}</p>
                            )}
                        </div>

                        {/* Thumbnail URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Or Thumbnail URL
                            </label>
                            <input
                                type="url"
                                className="w-full rounded-lg bg-slate-900 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("thumbnailUrl")}
                                placeholder="https://example.com/image.jpg"
                            />
                            {errors.thumbnailUrl && (
                                <p className="text-xs text-red-400 mt-1">{errors.thumbnailUrl.message}</p>
                            )}
                        </div>

                        {/* Video Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Video File
                            </label>
                            <Controller
                                name="video"
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <input
                                        type="file"
                                        onChange={(e) => onChange(e.target.files?.[0])}
                                        accept=".mp4,.avi,.mov,.mkv,.webm"
                                        className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer"
                                    />
                                )}
                            />
                            {errors.video && (
                                <p className="text-xs text-red-400 mt-1">{errors.video.message}</p>
                            )}
                        </div>

                        {/* Video URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Or Video URL
                            </label>
                            <input
                                type="url"
                                className="w-full rounded-lg bg-slate-900 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("videoUrl")}
                                placeholder="https://example.com/video.mp4"
                            />
                            {errors.videoUrl && (
                                <p className="text-xs text-red-400 mt-1">{errors.videoUrl.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-semibold tracking-wide transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-xl font-semibold tracking-wide transition"
                    >
                        {isSubmitting ? "Creating..." : "Create Movie"}
                    </button>
                </div>
            </form>
        </div>
    );
}