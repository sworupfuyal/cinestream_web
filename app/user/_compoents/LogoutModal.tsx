"use client";
import { useState } from "react";
import { toast } from "react-toastify";

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>; // required now
}

export default function LogoutModal({
    isOpen,
    onClose,
    onConfirm,
}: LogoutModalProps) {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    if (!isOpen) return null;

    const handleUserLogout = async () => {
        setIsLoggingOut(true);

        try {
            await onConfirm();
            toast.success("Logged out successfully");
            onClose();
        } catch (error: any) {
            toast.error(error?.message || "Failed to logout");
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">
                        Logout
                    </h3>
                    <button
                        onClick={onClose}
                        disabled={isLoggingOut}
                        className="text-gray-400 hover:text-white transition"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="bg-orange-500/10 rounded-full p-4">
                        <svg
                            className="w-12 h-12 text-orange-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"
                            />
                        </svg>
                    </div>
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                    <p className="text-gray-300 mb-2">
                        Are you sure you want to logout?
                    </p>
                    <p className="text-gray-400 text-sm">
                        You will need to log in again to access your account.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoggingOut}
                        className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUserLogout}
                        disabled={isLoggingOut}
                        className="flex-1 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition disabled:opacity-50"
                    >
                        {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>
                </div>
            </div>
        </div>
    );
}
