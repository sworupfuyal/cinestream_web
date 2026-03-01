"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="
      sticky top-0 z-30
      bg-slate-950
      border-b border-gray-800
    ">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Left: Logo (with left padding on mobile for hamburger) */}
          <Link href="/admin" className="flex items-center gap-3 group pl-10 xl:pl-0">
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

          {/* Right: Theme toggle + User + Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="
                inline-flex h-9 w-9 items-center justify-center
                rounded-lg border border-gray-700
                hover:bg-slate-800 transition
              "
            >
              {theme === "dark" ? (
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.95 7.95l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <span className="hidden sm:inline text-sm text-gray-400 truncate max-w-[200px]">
              {user?.email || "Admin"}
            </span>

            <button
              onClick={logout}
              className="
                px-3 sm:px-4 py-2
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
