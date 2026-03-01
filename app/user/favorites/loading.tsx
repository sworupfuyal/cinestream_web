export default function FavoritesLoading() {
    return (
        <div className="min-h-screen bg-slate-950 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-slate-800 rounded w-40 mb-2"></div>
                    <div className="h-4 bg-slate-800 rounded w-52"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-slate-900 rounded-lg overflow-hidden animate-pulse">
                            <div className="h-56 sm:h-72 bg-slate-800"></div>
                            <div className="p-4 space-y-3">
                                <div className="h-5 bg-slate-800 rounded w-3/4"></div>
                                <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                                <div className="h-9 bg-slate-800 rounded w-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
