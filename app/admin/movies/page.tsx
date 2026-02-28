import MovieList from "../_components/MovieListComponent";

export default function MoviesPage() {
    return (
        <div className="min-h-screen bg-slate-950 p-6">
            <MovieList />
        </div>
    );
}
export const dynamic = "force-dynamic";