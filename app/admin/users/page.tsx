import Link from "next/link";

export default function Page() {
    return (
        <div className="min-h-screen bg-slate-950">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">Users</h1>
                        <p className="text-gray-400 mt-1">Manage your users</p>
                    </div>
                    <Link
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition inline-flex items-center gap-2 self-start sm:self-auto"
                        href="/admin/users/create"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Create User
                    </Link>
                </div>
            </div>
        </div>
    );
}