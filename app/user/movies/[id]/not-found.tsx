import Link from "next/link";

export default function MovieNotFound() {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
            <div className="bg-slate-900 rounded-xl p-8 max-w-md w-full text-center">
                <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-yellow-500/10 flex items-center justify-center">
                    <svg className="w-7 h-7 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Movie Not Found</h2>
                <p className="text-gray-400 text-sm mb-6">
                    The movie you&apos;re looking for doesn&apos;t exist or has been removed.
                </p>
                <Link
                    href="/user/dashboard"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition"
                >
                    Browse Movies
                </Link>
            </div>
        </div>
    );
}
