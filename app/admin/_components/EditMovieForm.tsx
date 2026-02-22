"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";
import { MovieData, MovieSchema } from "@/app/(auth)/schema";
import { getAuthToken } from "@/lib/cookie";

interface EditMovieFormProps {
    movie: {
        _id: string;
        title: string;
        description: string;
        duration: number;
        releaseYear: number;
        genres: string[];
        cast: string[];
        director: string;
        thumbnailUrl?: string;
        videoUrl?: string;
    };
}

export default function EditMovieForm({ movie }: EditMovieFormProps) {
    const router = useRouter();
    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<MovieData>({
        resolver: zodResolver(MovieSchema),
        defaultValues: {
            title: movie.title,
            description: movie.description,
            duration: movie.duration,
            releaseYear: movie.releaseYear,
            genres: movie.genres.join(', '),
            cast: movie.cast.join(', '),
            director: movie.director,
            thumbnailUrl: movie.thumbnailUrl || '',
            videoUrl: movie.videoUrl || '',
        }
    });

    const [error, setError] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(
        movie.thumbnailUrl?.startsWith('http')
            ? movie.thumbnailUrl
            : movie.thumbnailUrl
            ? `${API_BASE_URL}${movie.thumbnailUrl}`
            : null
    );
    const thumbnailInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (file: File | undefined, onChange: (file: File | undefined) => void) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewThumbnail(reader.result as string);
            reader.readAsDataURL(file);
            onChange(file);
        } else {
            setPreviewThumbnail(
                movie.thumbnailUrl?.startsWith('http')
                    ? movie.thumbnailUrl
                    : movie.thumbnailUrl
                    ? `${API_BASE_URL}${movie.thumbnailUrl}`
                    : null
            );
            onChange(undefined);
        }
    };

    const handleDismissImage = (onChange: (file: File | undefined) => void) => {
        setPreviewThumbnail(null);
        onChange(undefined);
        if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
    };

    const onSubmit = async (data: MovieData) => {
        setError(null);
        setUploadProgress(null);
        setIsConverting(false);

        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('duration', data.duration.toString());
            formData.append('releaseYear', data.releaseYear.toString());
            formData.append('genres', data.genres);
            formData.append('cast', data.cast);
            formData.append('director', data.director);
            if (data.thumbnailUrl) formData.append('thumbnailUrl', data.thumbnailUrl);
            if (data.videoUrl) formData.append('videoUrl', data.videoUrl);
            if (data.thumbnail) formData.append('thumbnail', data.thumbnail);
            if (data.video) formData.append('video', data.video);

            // ✅ CRITICAL FIX: Upload directly to Express backend using XHR
            // This bypasses Next.js Server Actions and their size/timeout limits
            const token = await getAuthToken();

            await new Promise<void>((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                // Track upload progress
                xhr.upload.addEventListener('progress', (e) => {
                    if (e.lengthComputable) {
                        const percent = Math.round((e.loaded / e.total) * 100);
                        setUploadProgress(percent);
                        if (percent === 100) {
                            setIsConverting(true); // File uploaded, now FFmpeg is converting
                        }
                    }
                });

                xhr.addEventListener('load', () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve();
                    } else {
                        try {
                            const res = JSON.parse(xhr.responseText);
                            reject(new Error(res.message || 'Update failed'));
                        } catch {
                            reject(new Error('Update failed'));
                        }
                    }
                });

                xhr.addEventListener('error', () => reject(new Error('Network error during upload')));
                xhr.addEventListener('abort', () => reject(new Error('Upload was aborted')));

                xhr.open('PUT', `${API_BASE_URL}/api/admin/movies/${movie._id}`);
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
                xhr.send(formData);
            });

            toast.success('Movie updated successfully!');
            router.push('/admin/movies');

        } catch (error: any) {
            const errorMessage = error.message || 'Update movie failed';
            toast.error(errorMessage);
            setError(errorMessage);
            setUploadProgress(null);
            setIsConverting(false);
        }
    };

    const isLoading = isSubmitting || uploadProgress !== null;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={() => router.back()}
                    disabled={isLoading}
                    className="text-gray-400 hover:text-white mb-4 inline-flex items-center gap-2 disabled:opacity-50"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back
                </button>
                <h1 className="text-3xl font-bold text-white">Edit Movie</h1>
                <p className="text-gray-400 mt-1">Update movie information</p>
            </div>

            <div className="bg-slate-950 rounded-2xl shadow-2xl p-8 space-y-6">
                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {/* Upload Progress */}
                {uploadProgress !== null && (
                    <div className="space-y-2">
                        {!isConverting ? (
                            <>
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>⬆️ Uploading video...</span>
                                    <span>{uploadProgress}%</span>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-3">
                                    <div
                                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin shrink-0" />
                                <div>
                                    <p className="text-yellow-400 font-medium text-sm">Converting to HLS stream...</p>
                                    <p className="text-yellow-400/60 text-xs">This may take a few minutes depending on file size. Please don't close this page.</p>
                                </div>
                            </div>
                        )}
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
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Title *</label>
                                <input type="text" className="w-full rounded-lg bg-slate-900 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("title")} placeholder="The Matrix" />
                                {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Director *</label>
                                <input type="text" className="w-full rounded-lg bg-slate-900 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("director")} placeholder="Christopher Nolan" />
                                {errors.director && <p className="text-xs text-red-400 mt-1">{errors.director.message}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Duration (min) *</label>
                                    <input type="number" className="w-full rounded-lg bg-slate-900 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("duration", { valueAsNumber: true })} placeholder="120" />
                                    {errors.duration && <p className="text-xs text-red-400 mt-1">{errors.duration.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Release Year *</label>
                                    <input type="number" className="w-full rounded-lg bg-slate-900 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("releaseYear", { valueAsNumber: true })} placeholder="2023" />
                                    {errors.releaseYear && <p className="text-xs text-red-400 mt-1">{errors.releaseYear.message}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Genres * <span className="text-gray-500 text-xs">(comma-separated)</span></label>
                                <input type="text" className="w-full rounded-lg bg-slate-900 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("genres")} placeholder="Action, Sci-Fi, Thriller" />
                                {errors.genres && <p className="text-xs text-red-400 mt-1">{errors.genres.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Cast * <span className="text-gray-500 text-xs">(comma-separated)</span></label>
                                <input type="text" className="w-full rounded-lg bg-slate-900 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("cast")} placeholder="Keanu Reeves, Laurence Fishburne" />
                                {errors.cast && <p className="text-xs text-red-400 mt-1">{errors.cast.message}</p>}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Description *</label>
                                <textarea rows={6} className="w-full rounded-lg bg-slate-900 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("description")} placeholder="A brief synopsis of the movie..." />
                                {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Update Thumbnail Image</label>
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
                                {errors.thumbnail && <p className="text-xs text-red-400 mt-1">{errors.thumbnail.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Or Thumbnail URL</label>
                                <input type="url" className="w-full rounded-lg bg-slate-900 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("thumbnailUrl")} placeholder="https://example.com/image.jpg" />
                                {errors.thumbnailUrl && <p className="text-xs text-red-400 mt-1">{errors.thumbnailUrl.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Update Video File
                                    <span className="text-gray-500 text-xs ml-2">(MP4 recommended)</span>
                                </label>
                                <Controller
                                    name="video"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <div className="space-y-2">
                                            <input
                                                type="file"
                                                onChange={(e) => onChange(e.target.files?.[0])}
                                                accept=".mp4,.avi,.mov,.mkv,.webm"
                                                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer"
                                            />
                                            {value && (
                                                <p className="text-xs text-green-400">
                                                    ✓ {(value as File).name} ({((value as File).size / 1024 / 1024).toFixed(1)} MB) - Will be converted to HLS
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                                {errors.video && <p className="text-xs text-red-400 mt-1">{errors.video.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Or Video URL / HLS Stream</label>
                                <input type="url" className="w-full rounded-lg bg-slate-900 border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("videoUrl")} placeholder="https://example.com/stream.m3u8" />
                                {errors.videoUrl && <p className="text-xs text-red-400 mt-1">{errors.videoUrl.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            disabled={isLoading}
                            className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white py-3 rounded-xl font-semibold tracking-wide transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-xl font-semibold tracking-wide transition"
                        >
                            {isConverting ? "Converting to HLS..." : uploadProgress !== null ? `Uploading ${uploadProgress}%...` : isSubmitting ? "Updating..." : "Update Movie"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}