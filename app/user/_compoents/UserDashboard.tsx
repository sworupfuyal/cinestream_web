"use client";
import { useEffect, useState } from "react";
import { handleGetAllMovies, handleAddToList, handleRemoveFromList, handleGetListStatus } from "@/lib/actions/user-list-actions";
import { toast } from "react-toastify";
import MovieCard from "../_compoents/MovieCard";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface Movie {
    _id: string;
    title: string;
    director: string;
    releaseYear: number;
    duration: number;
    genres: string[];
    thumbnailUrl?: string;
    description?: string;
}

interface ListStatus {
    [movieId: string]: {
        isFavorite: boolean;
        isWatchLater: boolean;
    };
}

export default function UserDashboard() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const page = Number(searchParams.get("page") || "1");
    const search = searchParams.get("search") || "";
    const [searchInput, setSearchInput] = useState(search);

    const [movies, setMovies] = useState<Movie[]>([]);
    const [listStatus, setListStatus] = useState<ListStatus>({});
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    const updateURL = (newPage: number, newSearch: string) => {
        const params = new URLSearchParams();
        if (newPage > 1) params.set("page", String(newPage));
        if (newSearch) params.set("search", newSearch);
        router.push(`${pathname}?${params.toString()}`);
    };

   const fetchMovies = async () => {
    setLoading(true);
    try {
        const response = await handleGetAllMovies({
            page,
            limit: 12,
            search: search || undefined,
        });

        if (response.success) {
            const total = response.pagination?.totalPages || 1;

            // Redirect to last valid page if out of range
            if (page > total) {
                updateURL(total, search);
                return;
            }

            setMovies(response.data);
            setTotalPages(total);

            const movieIds = response.data.map((m: Movie) => m._id);
            if (movieIds.length > 0) {
                const statusResponse = await handleGetListStatus(movieIds);
                if (statusResponse.success) {
                    setListStatus(statusResponse.data);
                }
            }
        } else {
            toast.error(response.message);
        }
    } catch (error: any) {
        toast.error("Failed to load movies");
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        setSearchInput(search); // keep input in sync on back/forward navigation
        fetchMovies();
    }, [page, search]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateURL(1, searchInput); // reset to page 1 on new search
    };

    const handleToggleFavorite = async (movieId: string) => {
        const currentStatus = listStatus[movieId]?.isFavorite || false;
        const response = currentStatus
            ? await handleRemoveFromList(movieId, 'favorite')
            : await handleAddToList(movieId, 'favorite');

        if (response.success) {
            toast.success(response.message);
            setListStatus(prev => ({
                ...prev,
                [movieId]: { ...prev[movieId], isFavorite: !currentStatus }
            }));
        } else {
            toast.error(response.message);
        }
    };

    const handleToggleWatchLater = async (movieId: string) => {
        const currentStatus = listStatus[movieId]?.isWatchLater || false;
        const response = currentStatus
            ? await handleRemoveFromList(movieId, 'watchlater')
            : await handleAddToList(movieId, 'watchlater');

        if (response.success) {
            toast.success(response.message);
            setListStatus(prev => ({
                ...prev,
                [movieId]: { ...prev[movieId], isWatchLater: !currentStatus }
            }));
        } else {
            toast.error(response.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Browse Movies</h1>
                    <p className="text-gray-400 mt-1">Discover and add movies to your lists</p>
                </div>

                {/* Search */}
                <div className="bg-slate-900 rounded-lg p-3 sm:p-4">
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search movies..."
                            className="flex-1 rounded-lg bg-slate-800 border border-gray-700 px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Movie Grid */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-400 mt-4">Loading movies...</p>
                    </div>
                ) : movies.length === 0 ? (
                    <div className="bg-slate-900 rounded-lg p-12 text-center">
                        <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                        </svg>
                        <p className="text-gray-400 text-lg">No movies found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie._id}
                                movie={movie}
                                isFavorite={listStatus[movie._id]?.isFavorite || false}
                                isWatchLater={listStatus[movie._id]?.isWatchLater || false}
                                onToggleFavorite={handleToggleFavorite}
                                onToggleWatchLater={handleToggleWatchLater}
                            />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2">
                        <button
                            onClick={() => updateURL(page - 1, search)}
                            disabled={page === 1}
                            className="px-4 py-2 bg-slate-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition"
                        >
                            Previous
                        </button>
                        <span className="text-gray-400">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => updateURL(page + 1, search)}
                            disabled={page === totalPages}
                            className="px-4 py-2 bg-slate-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}