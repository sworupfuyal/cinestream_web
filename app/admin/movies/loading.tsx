export default function AdminMoviesLoading() {
    return (
        <div className="min-h-screen bg-slate-950 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header skeleton */}
                <div className="animate-pulse flex justify-between items-center">
                    <div>
                        <div className="h-8 bg-slate-800 rounded w-40 mb-2"></div>
                        <div className="h-4 bg-slate-800 rounded w-56"></div>
                    </div>
                    <div className="h-10 bg-slate-800 rounded w-32"></div>
                </div>

                {/* Search bar skeleton */}
                <div className="bg-slate-900 rounded-lg p-4 animate-pulse">
                    <div className="h-10 bg-slate-800 rounded"></div>
                </div>

                {/* Grid skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="bg-slate-900 rounded-lg overflow-hidden animate-pulse">
                            <div className="h-56 sm:h-72 bg-slate-800"></div>
                            <div className="p-4 space-y-3">
                                <div className="h-5 bg-slate-800 rounded w-3/4"></div>
                                <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                                <div className="flex gap-2">
                                    <div className="h-6 bg-slate-800 rounded w-16"></div>
                                    <div className="h-6 bg-slate-800 rounded w-14"></div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="h-9 bg-slate-800 rounded flex-1"></div>
                                    <div className="h-9 bg-slate-800 rounded flex-1"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
