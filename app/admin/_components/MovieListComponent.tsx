"use client";
import { useEffect, useState, useMemo } from "react";
import { handleGetAllMovies, handleDeleteMovie, handleGetAllGenres } from "@/lib/actions/admin/movie-action";
import { toast } from "react-toastify";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";

interface Movie {
    _id: string;
    title: string;
    director: string;
    releaseYear: number;
    duration: number;
    genres: string[];
    thumbnailUrl?: string;
}

type SortOption = "default" | "title-asc" | "title-desc" | "year-desc" | "year-asc" | "duration-asc" | "duration-desc";

export default function MovieList() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Read initial state from URL
    const [movies, setMovies] = useState<Movie[]>([]);
    const [genres, setGenres] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>("default");

    const page = Number(searchParams.get("page") || "1");
    const search = searchParams.get("search") || "";
    const genre = searchParams.get("genre") || "";
    const [searchInput, setSearchInput] = useState(search);

    // Helper to update URL params
    const updateURL = (newPage: number, newSearch: string, newGenre?: string) => {
        const params = new URLSearchParams();
        if (newPage > 1) params.set("page", String(newPage));
        if (newSearch) params.set("search", newSearch);
        const g = newGenre !== undefined ? newGenre : genre;
        if (g) params.set("genre", g);
        router.push(`${pathname}?${params.toString()}`);
    };

    /** Fetch genre list once */
    useEffect(() => {
        (async () => {
            try {
                const res = await handleGetAllGenres();
                if (res.success && Array.isArray(res.data)) {
                    setGenres(res.data);
                }
            } catch { /* ignore */ }
        })();
    }, []);

   const fetchMovies = async () => {
    setLoading(true);
    try {
        const response = await handleGetAllMovies({
            page,
            limit: 12,
            search: search || undefined,
            genre: genre || undefined,
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
        } else {
            toast.error(response.message);
        }
    } catch (error: any) {
        toast.error("Failed to load movies");
    } finally {
        setLoading(false);
    }
};

    /** Client-side sorted movies */
    const sortedMovies = useMemo(() => {
        if (sortBy === "default") return movies;
        const sorted = [...movies];
        switch (sortBy) {
            case "title-asc":
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "title-desc":
                sorted.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case "year-desc":
                sorted.sort((a, b) => b.releaseYear - a.releaseYear);
                break;
            case "year-asc":
                sorted.sort((a, b) => a.releaseYear - b.releaseYear);
                break;
            case "duration-asc":
                sorted.sort((a, b) => a.duration - b.duration);
                break;
            case "duration-desc":
                sorted.sort((a, b) => b.duration - a.duration);
                break;
        }
        return sorted;
    }, [movies, sortBy]);

    // Fetch whenever URL params change
    useEffect(() => {
        setSearchInput(search); // keep input in sync if user navigates back/forward
        fetchMovies();
    }, [page, search, genre]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateURL(1, searchInput); // reset to page 1 on new search
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await handleDeleteMovie(id);
            if (response.success) {
                toast.success("Movie deleted successfully");
                fetchMovies();
                setDeleteConfirm(null);
            } else {
                toast.error(response.message);
            }
        } catch (error: any) {
            toast.error("Failed to delete movie");
        }
    };
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Movies</h1>
                    <p className="text-gray-400 mt-1">Manage your movie collection</p>
                </div>
                <button
                    onClick={() => router.push('/admin/movies/create')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition flex items-center gap-2 self-start sm:self-auto"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Movie
                </button>
            </div>

                <div className="bg-slate-900 rounded-lg p-3 sm:p-4 space-y-3">
                {/* Search row */}
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

                {/* Filter / Sort row */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    {/* Genre filter */}
                    <select
                        value={genre}
                        onChange={(e) => updateURL(1, search, e.target.value)}
                        className="flex-1 rounded-lg bg-slate-800 border border-gray-700 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Genres</option>
                        {genres.map((g) => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="flex-1 rounded-lg bg-slate-800 border border-gray-700 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="default">Sort By: Default</option>
                        <option value="title-asc">Title (A → Z)</option>
                        <option value="title-desc">Title (Z → A)</option>
                        <option value="year-desc">Year (Newest)</option>
                        <option value="year-asc">Year (Oldest)</option>
                        <option value="duration-asc">Duration (Short → Long)</option>
                        <option value="duration-desc">Duration (Long → Short)</option>
                    </select>

                    {/* Clear filters */}
                    {(genre || search || sortBy !== "default") && (
                        <button
                            onClick={() => {
                                setSortBy("default");
                                setSearchInput("");
                                updateURL(1, "", "");
                            }}
                            className="px-4 py-2 rounded-lg border border-gray-700 text-sm text-gray-400 hover:text-white hover:bg-slate-800 transition"
                        >
                            Clear
                        </button>
                    )}
                </div>
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
                    <button
                        onClick={() => router.push('/admin/movies/create')}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                    >
                        Add Your First Movie
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {sortedMovies.map((movie) => (
                        <div key={movie._id} className="bg-slate-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition">
                            {/* Thumbnail */}
                            <div className="relative h-56 sm:h-72 md:h-80 bg-slate-800">
                                {movie.thumbnailUrl ? (

                                           <img
                src={movie.thumbnailUrl?.startsWith('http') 
                    ? movie.thumbnailUrl 
                    : `${API_BASE_URL}${movie.thumbnailUrl}`
                }
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
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-white mb-1 truncate">{movie.title}</h3>
                                <p className="text-sm text-gray-400 mb-2">{movie.director} • {movie.releaseYear}</p>
                                
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs text-gray-500">{movie.duration} min</span>
                                </div>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    {movie.genres.slice(0, 3).map((genre, index) => (
                                        <span key={index} className="px-2 py-1 bg-slate-800 text-gray-400 text-xs rounded">
                                            {genre}
                                        </span>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => router.push(`/admin/movies/${movie._id}/edit`)}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => setDeleteConfirm(movie._id)}
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
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
            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-slate-900 rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-xl font-bold text-white mb-2">Delete Movie?</h3>
                        <p className="text-gray-400 mb-6">
                            Are you sure you want to delete this movie? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-semibold transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}