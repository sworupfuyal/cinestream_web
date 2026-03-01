export default function MovieDetailLoading() {
    return (
        <div className="min-h-screen bg-slate-950 p-4 sm:p-6">
            <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
                {/* Back button */}
                <div className="h-9 bg-slate-800 rounded w-24"></div>

                {/* Hero / poster + info */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-80 h-96 bg-slate-800 rounded-lg shrink-0"></div>
                    <div className="flex-1 space-y-4">
                        <div className="h-8 bg-slate-800 rounded w-3/4"></div>
                        <div className="h-5 bg-slate-800 rounded w-1/3"></div>
                        <div className="flex gap-2">
                            <div className="h-7 bg-slate-800 rounded-full w-20"></div>
                            <div className="h-7 bg-slate-800 rounded-full w-16"></div>
                            <div className="h-7 bg-slate-800 rounded-full w-24"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 bg-slate-800 rounded w-full"></div>
                            <div className="h-4 bg-slate-800 rounded w-full"></div>
                            <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <div className="h-10 bg-slate-800 rounded w-32"></div>
                            <div className="h-10 bg-slate-800 rounded w-32"></div>
                        </div>
                    </div>
                </div>

                {/* Reviews section */}
                <div className="space-y-4">
                    <div className="h-7 bg-slate-800 rounded w-28"></div>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-slate-900 rounded-lg p-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-slate-800 rounded-full"></div>
                                <div className="h-4 bg-slate-800 rounded w-32"></div>
                            </div>
                            <div className="h-4 bg-slate-800 rounded w-full"></div>
                            <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
