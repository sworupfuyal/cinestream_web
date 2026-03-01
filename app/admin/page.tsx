import { Suspense } from "react";
import DashboardStats from "./_components/DashboardStats";
import Loading from "./Loading";
import UsersList from "./_components/UserList";

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6">

        {/* Page Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage users and view statistics
            </p>
          </div>
        </header>

        {/* Stats */}
        <Suspense
          fallback={
            <div className="
              rounded-2xl
              border border-gray-800
              bg-slate-900
              p-6
              text-gray-400
            ">
              Loading statistics…
            </div>
          }
        >
          <DashboardStats />
        </Suspense>

        {/* Users List */}
        <Suspense fallback={<Loading />}>
          <UsersList />
        </Suspense>

      </div>
    </main>
  );
}
