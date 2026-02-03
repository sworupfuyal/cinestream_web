"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { logout, user } = useAuth();

  return (
    <header className="
      sticky top-0 z-50
      bg-slate-950
      border-b border-gray-800
    ">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Left: Logo */}
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="
              h-8 w-8
              rounded-lg
              bg-blue-600
              text-white
              flex items-center justify-center
              font-bold
              shadow
            ">
              A
            </div>
            <span className="
              text-sm font-semibold
              text-white
              tracking-wide
              group-hover:opacity-80
              transition
            ">
              Admin Panel
            </span>
          </Link>

          {/* Right: User + Logout */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 truncate max-w-[200px]">
              {user?.email || "Admin"}
            </span>

            <button
              onClick={logout}
              className="
                px-4 py-2
                rounded-lg
                text-sm font-medium
                text-white
                bg-slate-900
                border border-gray-700
                hover:bg-slate-800
                transition
              "
            >
              Logout
            </button>
          </div>

        </div>
      </nav>
    </header>
  );
}
