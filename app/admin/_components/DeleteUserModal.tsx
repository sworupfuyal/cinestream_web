"use client";
import { useState } from "react";
import { handleDeleteUser } from "@/lib/actions/admin/user-action";
import { toast } from "react-toastify";

interface DeleteUserModalProps {
    userId: string;
    userName: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function DeleteUserModal({ 
    userId, 
    userName, 
    isOpen, 
    onClose, 
    onSuccess 
}: DeleteUserModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    if (!isOpen) return null;

    const handleDelete = async () => {
        setIsDeleting(true);
        
        try {
            const response = await handleDeleteUser(userId);
            
            if (response.success) {
                toast.success('User deleted successfully');
                onSuccess();
                onClose();
            } else {
                toast.error(response.message || 'Failed to delete user');
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete user');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Delete User</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition"
                        disabled={isDeleting}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Warning Icon */}
                <div className="flex justify-center mb-4">
                    <div className="bg-red-500/10 rounded-full p-4">
                        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                    <p className="text-gray-300 mb-2">
                        Are you sure you want to delete
                    </p>
                    <p className="text-white font-semibold text-lg">
                        {userName}?
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                        This action cannot be undone.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition disabled:opacity-50"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}