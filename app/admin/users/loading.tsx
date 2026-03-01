export default function AdminUsersLoading() {
    return (
        <div className="min-h-screen bg-slate-950 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header skeleton */}
                <div className="animate-pulse flex justify-between items-center">
                    <div>
                        <div className="h-8 bg-slate-800 rounded w-32 mb-2"></div>
                        <div className="h-4 bg-slate-800 rounded w-48"></div>
                    </div>
                    <div className="h-10 bg-slate-800 rounded w-28"></div>
                </div>

                {/* Table skeleton */}
                <div className="bg-slate-900 rounded-lg overflow-hidden animate-pulse">
                    <div className="h-12 bg-slate-800 border-b border-gray-800"></div>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 border-b border-gray-800">
                            <div className="h-10 w-10 bg-slate-800 rounded-full"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-slate-800 rounded w-1/3"></div>
                                <div className="h-3 bg-slate-800 rounded w-1/4"></div>
                            </div>
                            <div className="h-6 bg-slate-800 rounded w-16"></div>
                            <div className="h-8 bg-slate-800 rounded w-20"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}