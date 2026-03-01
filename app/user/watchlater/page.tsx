"use client";
import { useEffect, useState } from "react";
import { handleGetUserLists, handleRemoveFromList } from "@/lib/actions/user-list-actions";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/lib/constants";
import Link from "next/link";

interface Movie {
    _id: string;
    title: string;
    director: string;
    releaseYear: number;
    duration: number;
    genres: string[];
    thumbnailUrl?: string;
}

interface WatchLaterItem {
    listId: string;
    listType: string;
    addedAt: string;
    movie: Movie;
}

export default function WatchLaterPage() {
    const [watchLater, setWatchLater] = useState<WatchLaterItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const fetchWatchLater = async () => {
        setLoading(true);
        try {
            const response = await handleGetUserLists('watchlater');
            if (response.success) {
                setWatchLater(response.data);
            } else {
                toast.error(response.message);
            }
        } catch (error: any) {
            toast.error("Failed to load watch later");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWatchLater();
    }, []);

    const handleRemove = async (movieId: string) => {
        try {
            const response = await handleRemoveFromList(movieId, 'watchlater');
            if (response.success) {
                toast.success(response.message);
                fetchWatchLater();
                setDeleteConfirm(null);
            } else {
                toast.error(response.message);
            }
        } catch (error: any) {
            toast.error("Failed to remove from watch later");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Watch Later</h1>
                    <p className="text-gray-400 mt-1">
                        {watchLater.length} {watchLater.length === 1 ? 'movie' : 'movies'} to watch
                    </p>
                </div>

                {/* Movie Grid */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-400 mt-4">Loading watch later...</p>
                    </div>
                ) : watchLater.length === 0 ? (
                    <div className="bg-slate-900 rounded-lg p-12 text-center">
                        <svg className="w-16 h-16 mx-auto text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-gray-400 text-lg mb-2">No movies in watch later</p>
                        <p className="text-gray-500 text-sm">Add movies you want to watch!</p>
                        <a
                            href="/user/dashboard"
                            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                        >
                            Browse Movies
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {watchLater.map((item) => (
                            <div key={item.listId} className="bg-slate-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition">
                                {/* Thumbnail */}
                                <Link href={`/user/movies/${item.movie._id}`} className="block">
                                <div className="relative h-56 sm:h-72 md:h-80 bg-slate-800">
                                    {item.movie.thumbnailUrl ? (
                                        <img
                                            src={item.movie.thumbnailUrl?.startsWith('http')
                                                ? item.movie.thumbnailUrl
                                                : `${API_BASE_URL}${item.movie.thumbnailUrl}`
                                            }
                                            alt={item.movie.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                                            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2">
                                        <div className="p-2 bg-blue-500 rounded-full">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                </Link>

                                {/* Content */}
                                <div className="p-4">
                                    <Link href={`/user/movies/${item.movie._id}`}>
                                        <h3 className="text-lg font-bold text-white mb-1 truncate hover:text-blue-400 transition cursor-pointer">{item.movie.title}</h3>
                                    </Link>
                                    <p className="text-sm text-gray-400 mb-2">{item.movie.director} • {item.movie.releaseYear}</p>

                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs text-gray-500">{item.movie.duration} min</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {item.movie.genres.slice(0, 3).map((genre, index) => (
                                            <span key={index} className="px-2 py-1 bg-slate-800 text-gray-400 text-xs rounded">
                                                {genre}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => setDeleteConfirm(item.movie._id)}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition"
                                    >
                                        Remove from Watch Later
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {deleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-slate-900 rounded-lg p-6 max-w-md w-full mx-4">
                            <h3 className="text-xl font-bold text-white mb-2">Remove from Watch Later?</h3>
                            <p className="text-gray-400 mb-6">
                                Are you sure you want to remove this movie from your watch later list?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-semibold transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleRemove(deleteConfirm)}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}