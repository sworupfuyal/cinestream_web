"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/lib/constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import { handleGetListCounts } from "@/lib/actions/user-list-actions";
import LogoutModal from "./LogoutModal";
import { handleLogout } from "@/lib/actions/auth-action";
const USER_LINKS = [
  { href: "/user/dashboard", label: "Dashboard", icon: "home" },
  { href: "/user/favorites", label: "Favorites", icon: "heart" },
  { href: "/user/watchlater", label: "Watch Later", icon: "clock" },
  { href: "/user/profile", label: "Profile", icon: "user" },
];

export default function UserSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [counts, setCounts] = useState({ favorites: 0, watchLater: 0 });
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchCounts();
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Close sidebar on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const fetchCounts = async () => {
    try {
      const response = await handleGetListCounts();
      if (response.success) {
        setCounts(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch counts");
    }
  };

  const isActive = (href: string) => pathname?.startsWith(href);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "home":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case "heart":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case "clock":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "user":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getCountBadge = (label: string) => {
    if (label === "Favorites" && counts.favorites > 0) {
      return (
        <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
          {counts.favorites}
        </span>
      );
    }
    if (label === "Watch Later" && counts.watchLater > 0) {
      return (
        <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
          {counts.watchLater}
        </span>
      );
    }
    return null;
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-3 left-3 z-50 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 bg-slate-900 hover:bg-slate-800 transition"
        aria-label="Open sidebar"
      >
        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0
          h-screen w-64
          bg-slate-950
          border-r border-gray-800
          z-50
          overflow-y-auto
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:z-auto md:shrink-0
        `}
      >
     {/* Brand */}

{/* Brand */}
<div className="p-4 border-b border-gray-800 flex items-center justify-between">
  <Link href="/user/dashboard" className="flex items-center gap-3">
    <div className="h-9 w-9 rounded-lg overflow-hidden flex items-center justify-center">
      <Image 
        src="/images/logo.png" 
        alt="Cinestream Logo" 
        width={36}
        height={36}
        className="object-contain"
      />
    </div>
    <span className="font-semibold text-white tracking-wide">Cinestream</span>
  </Link>
  <button
    onClick={() => setSidebarOpen(false)}
    className="md:hidden text-gray-400 hover:text-white transition"
    aria-label="Close sidebar"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>

        {/* User Info */}
        {user && (
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              {user.imageUrl ? (
                <img
                  src={
                    user.imageUrl.startsWith("http")
                      ? user.imageUrl
                      : `${API_BASE_URL}${user.imageUrl}`
                  }
                  alt={user.fullname || user.username || "User"}
                  className="h-10 w-10 rounded-full object-cover border-2 border-gray-700"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  {user.fullname?.charAt(0)?.toUpperCase() || user.username?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.fullname || user.username}
                </p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {USER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive(link.href) ? "bg-blue-600 text-white shadow" : "text-gray-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              {getIcon(link.icon)}
              {link.label}
              {getCountBadge(link.label)}
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-3 border-t border-gray-800 space-y-1">
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-slate-900 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Admin Panel
            </Link>
          )}

          <Link
            href="/user/settings"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive("/user/settings") ? "bg-blue-600 text-white shadow" : "text-gray-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </Link>

          {/* Logout Button */}
          <button
            onClick={() => setIsLogoutOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-red-900/20 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Logout Modal */}
<LogoutModal
  isOpen={isLogoutOpen}
  onClose={() => setIsLogoutOpen(false)}
  onConfirm={async () => {
    try {
      await handleLogout(); // call your logout API
      // optionally redirect or reset auth state here
    } catch (err) {
      console.error(err);
      throw err; // re-throw so modal can show toast
    }
  }}
/>
    </>
  );
}
