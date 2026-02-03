"use client";

import { handleLogout } from "@/lib/actions/auth-action";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
    { href: "/user/profile", label: "Profile" },
    { href: "/about", label: "About" },
];

export default function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const { user } = useAuth();

    const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

    return (
        <header className="sticky top-0 z-50 bg-slate-950 border-b border-gray-800">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
                <div className="flex h-16 items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] w-full">

                    {/* Left: Logo */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 group">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                                M
                            </span>
                            <span className="text-sm font-semibold text-white tracking-wide group-hover:opacity-80 transition-opacity">
                                MyApp
                            </span>
                        </Link>
                    </div>

                    {/* Center: Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6 justify-self-center">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition ${
                                    isActive(link.href) ? "text-white" : "text-gray-400 hover:text-white"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        
                        {/* Show Admin link only for admin users */}
                        {user?.role === 'admin' && (
                            <Link
                                href="/admin"
                                className={`text-sm font-medium transition ${
                                    isActive('/admin') ? "text-white" : "text-gray-400 hover:text-white"
                                }`}
                            >
                                Admin
                            </Link>
                        )}
                    </div>

                    {/* Right: Auth + Mobile Toggle */}
                    <div className="flex items-center gap-2 md:justify-self-end">
                        <div className="hidden sm:flex items-center gap-3">
                            {/* User avatar/name */}
                            {user && (
                                <Link 
                                    href="/user/profile"
                                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                                >
                                    {user.imageUrl ? (
                                        <img 
                                            src={user.imageUrl} 
                                            alt={user.fullname || user.username} 
                                            className="h-8 w-8 rounded-full object-cover border border-gray-700"
                                        />
                                    ) : (
                                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                                            {user.fullname?.charAt(0)?.toUpperCase() || user.username?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                    )}
                                    <span className="hidden lg:inline">{user.fullname || user.username}</span>
                                </Link>
                            )}
                            
                            <button
                                onClick={handleLogout}
                                className="h-9 px-3 inline-flex items-center justify-center rounded-lg border border-gray-700 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
                            >
                                Logout
                            </button>
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            type="button"
                            onClick={() => setOpen((v) => !v)}
                            aria-label="Toggle menu"
                            aria-expanded={open}
                            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 hover:bg-slate-800 transition-colors"
                        >
                            {open ? (
                                // Close icon
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white">
                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                // Hamburger icon
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white">
                                    <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile panel */}
                <div className={"md:hidden overflow-hidden transition-[max-height] duration-300 " + (open ? "max-h-96" : "max-h-0")}>
                    <div className="pb-4 pt-2 border-t border-gray-800">
                        <div className="flex flex-col gap-2">
                            {/* Mobile nav links */}
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className={`px-3 py-2 text-sm font-medium rounded-lg transition ${
                                        isActive(link.href) 
                                            ? "text-white bg-slate-800" 
                                            : "text-gray-400 hover:text-white hover:bg-slate-800"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            
                            {/* Admin link for mobile */}
                            {user?.role === 'admin' && (
                                <Link
                                    href="/admin"
                                    onClick={() => setOpen(false)}
                                    className={`px-3 py-2 text-sm font-medium rounded-lg transition ${
                                        isActive('/admin') 
                                            ? "text-white bg-slate-800" 
                                            : "text-gray-400 hover:text-white hover:bg-slate-800"
                                    }`}
                                >
                                    Admin
                                </Link>
                            )}
                            
                            {/* User info for mobile */}
                            {user && (
                                <div className="px-3 py-2 flex items-center gap-2 text-sm text-gray-400 border-t border-gray-800 mt-2 pt-4">
                                    {user.imageUrl ? (
                                        <img 
                                            src={user.imageUrl} 
                                            alt={user.fullname || user.username} 
                                            className="h-8 w-8 rounded-full object-cover border border-gray-700"
                                        />
                                    ) : (
                                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                                            {user.fullname?.charAt(0)?.toUpperCase() || user.username?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                    )}
                                    <span>{user.fullname || user.username}</span>
                                </div>
                            )}
                            
                            <button
                                onClick={handleLogout}
                                className="h-9 px-3 inline-flex items-center justify-center rounded-lg border border-gray-700 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

            </nav>
        </header>
    );
}