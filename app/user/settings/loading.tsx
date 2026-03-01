export default function SettingsLoading() {
    return (
        <div className="min-h-screen bg-slate-950 p-4 sm:p-6">
            <div className="max-w-2xl mx-auto space-y-6 animate-pulse">
                <div className="h-8 bg-slate-800 rounded w-28"></div>

                <div className="bg-slate-900 rounded-lg p-6 space-y-6">
                    {/* Theme toggle skeleton */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="h-5 bg-slate-800 rounded w-20"></div>
                            <div className="h-4 bg-slate-800 rounded w-48"></div>
                        </div>
                        <div className="h-8 bg-slate-800 rounded-full w-16"></div>
                    </div>

                    <div className="border-t border-slate-800"></div>

                    {/* Logout skeleton */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="h-5 bg-slate-800 rounded w-24"></div>
                            <div className="h-4 bg-slate-800 rounded w-40"></div>
                        </div>
                        <div className="h-10 bg-slate-800 rounded w-24"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
