"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ ADD THIS
import { API_BASE_URL } from "@/lib/constants";
import { toast } from "react-toastify";

interface MovieCardProps {
    movie: {
        _id: string;
        title: string;
        director: string;
        releaseYear: number;
        duration: number;
        genres: string[];
        thumbnailUrl?: string;
        description?: string;
    };
    isFavorite?: boolean;
    isWatchLater?: boolean;
    onToggleFavorite?: (movieId: string) => Promise<void>;
    onToggleWatchLater?: (movieId: string) => Promise<void>;
    showActions?: boolean;
}

export default function MovieCard({
    movie,
    isFavorite = false,
    isWatchLater = false,
    onToggleFavorite,
    onToggleWatchLater,
    showActions = true,
}: MovieCardProps) {
    const router = useRouter(); // ✅ ADD THIS
    const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);
    const [isLoadingWatchLater, setIsLoadingWatchLater] = useState(false);

    // ✅ Navigate to movie detail page on card click
    const handleCardClick = () => {
        router.push(`/user/movies/${movie._id}`);
    };

    const handleFavoriteClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!onToggleFavorite) return;
        setIsLoadingFavorite(true);
        try {
            await onToggleFavorite(movie._id);
        } catch (error) {
            toast.error("Failed to update favorites");
        } finally {
            setIsLoadingFavorite(false);
        }
    };

    const handleWatchLaterClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!onToggleWatchLater) return;
        setIsLoadingWatchLater(true);
        try {
            await onToggleWatchLater(movie._id);
        } catch (error) {
            toast.error("Failed to update watch later");
        } finally {
            setIsLoadingWatchLater(false);
        }
    };

    const thumbnailSrc = movie.thumbnailUrl?.startsWith('http')
        ? movie.thumbnailUrl
        : movie.thumbnailUrl
        ? `${API_BASE_URL}${movie.thumbnailUrl}`
        : null;

    return (
        <div
            onClick={handleCardClick} // ✅ ADD THIS
            className="bg-slate-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition group cursor-pointer" // ✅ cursor-pointer
        >
            {/* Thumbnail */}
            <div className="relative h-56 sm:h-72 md:h-80 bg-slate-800">
                {thumbnailSrc ? (
                    <img
                        src={thumbnailSrc}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                        </svg>
                    </div>
                )}

                {/* Play icon overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>

                {/* Action Buttons Overlay */}
                {showActions && (
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* Favorite Button */}
                        <button
                            onClick={handleFavoriteClick}
                            disabled={isLoadingFavorite}
                            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                                isFavorite
                                    ? 'bg-red-500 text-white'
                                    : 'bg-black/50 text-white hover:bg-red-500'
                            } disabled:opacity-50`}
                            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                            {isLoadingFavorite ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <svg className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            )}
                        </button>

                        {/* Watch Later Button */}
                        <button
                            onClick={handleWatchLaterClick}
                            disabled={isLoadingWatchLater}
                            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                                isWatchLater
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-black/50 text-white hover:bg-blue-500'
                            } disabled:opacity-50`}
                            title={isWatchLater ? "Remove from watch later" : "Add to watch later"}
                        >
                            {isLoadingWatchLater ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <svg className="w-5 h-5" fill={isWatchLater ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-1 truncate">{movie.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{movie.director} • {movie.releaseYear}</p>

                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-500">{movie.duration} min</span>
                </div>

                <div className="flex flex-wrap gap-1">
                    {movie.genres.slice(0, 3).map((genre, index) => (
                        <span key={index} className="px-2 py-1 bg-slate-800 text-gray-400 text-xs rounded">
                            {genre}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}