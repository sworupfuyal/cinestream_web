import { Suspense } from "react";
import MovieList from "../_components/MovieListComponent";

export default function MoviesPage() {
    return (
        <div className="min-h-screen bg-slate-950 p-4 sm:p-6">
            <Suspense fallback={
                <div className="text-center py-12">
                    <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400 mt-4">Loading...</p>
                </div>
            }>
                <MovieList />
            </Suspense>
        </div>
    );
}

export const dynamic = "force-dynamic";