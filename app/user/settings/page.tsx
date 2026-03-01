"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { handleLogout } from "@/lib/actions/auth-action";
import LogoutModal from "@/app/user/_compoents/LogoutModal";
import { toast } from "react-toastify";

export default function SettingsPage() {
    const { theme, toggleTheme } = useTheme();
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);

    const onLogoutConfirm = async () => {
        await handleLogout();
    };

    return (
        <div className="min-h-screen bg-slate-950 p-4 sm:p-6">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Settings</h1>
                    <p className="text-gray-400 mt-1">Manage your preferences</p>
                </div>

                {/* ── Theme Toggle ─────────────────────────────── */}
                <div className="bg-slate-900 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-1">Appearance</h2>
                    <p className="text-gray-400 text-sm mb-5">
                        Choose between dark and light mode. This applies across the entire app.
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Sun / Moon icon */}
                            {theme === "dark" ? (
                                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.95 7.95l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            )}
                            <div>
                                <p className="text-white font-medium">
                                    {theme === "dark" ? "Dark Mode" : "Light Mode"}
                                </p>
                                <p className="text-gray-400 text-xs">
                                    {theme === "dark"
                                        ? "Easier on the eyes in low light"
                                        : "Better visibility in bright environments"}
                                </p>
                            </div>
                        </div>

                        {/* Toggle switch */}
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                                theme === "light" ? "bg-blue-600" : "bg-slate-700"
                            }`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                                    theme === "light" ? "translate-x-6" : "translate-x-1"
                                }`}
                            />
                        </button>
                    </div>
                </div>

                {/* ── Logout ──────────────────────────────────── */}
                <div className="bg-slate-900 rounded-xl p-6 border border-red-900/30">
                    <h2 className="text-lg font-semibold text-red-500 mb-1">Session</h2>
                    <p className="text-gray-400 text-sm mb-5">
                        Sign out of your CineStream account on this device.
                    </p>
                    <button
                        onClick={() => setIsLogoutOpen(true)}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Logout confirmation modal */}
            <LogoutModal
                isOpen={isLogoutOpen}
                onClose={() => setIsLogoutOpen(false)}
                onConfirm={onLogoutConfirm}
            />
        </div>
    );
}