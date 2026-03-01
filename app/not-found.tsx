import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
            <div className="text-center max-w-md">
                <div className="text-7xl font-bold text-blue-500 mb-4">404</div>
                <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
                <p className="text-gray-400 mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
