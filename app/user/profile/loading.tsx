export default function ProfileLoading() {
    return (
        <div className="min-h-screen bg-slate-950 p-4 sm:p-6">
            <div className="max-w-2xl mx-auto space-y-6 animate-pulse">
                <div className="h-8 bg-slate-800 rounded w-32"></div>

                {/* Avatar */}
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-slate-800 rounded-full"></div>
                    <div className="space-y-2">
                        <div className="h-5 bg-slate-800 rounded w-40"></div>
                        <div className="h-4 bg-slate-800 rounded w-52"></div>
                    </div>
                </div>

                {/* Form fields */}
                <div className="bg-slate-900 rounded-lg p-6 space-y-5">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-4 bg-slate-800 rounded w-24"></div>
                            <div className="h-10 bg-slate-800 rounded w-full"></div>
                        </div>
                    ))}
                    <div className="h-10 bg-slate-800 rounded w-28"></div>
                </div>
            </div>
        </div>
    );
}
