export default function Loading() {
    return (
        <div className="bg-slate-900 rounded-xl p-8">
            <div className="animate-pulse space-y-4">
                <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                <div className="space-y-3">
                    <div className="h-4 bg-slate-700 rounded"></div>
                    <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                </div>
            </div>
        </div>
    );
}