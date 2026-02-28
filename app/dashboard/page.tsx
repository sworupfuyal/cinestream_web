import { Suspense } from "react";
import UserDashboard from "../user/_compoents/UserDashboard";

export default function DashboardPage() {
    return (
        <Suspense fallback={
            <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 mt-4">Loading...</p>
            </div>
        }>
            <UserDashboard />
        </Suspense>
    );
}

export const dynamic = "force-dynamic";