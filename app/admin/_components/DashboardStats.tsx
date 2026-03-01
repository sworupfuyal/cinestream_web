"use client";
import { useEffect, useState } from "react";
import { getAllUsers } from "@/lib/api/admin/user";

export default function DashboardStats() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        newUsersToday: 0,
        activeUsers: 0,
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await getAllUsers();
            
            if (response.success && response.data) {
                const users = response.data;
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                const newToday = users.filter((user: any) => {
                    const userDate = new Date(user.createdAt);
                    userDate.setHours(0, 0, 0, 0);
                    return userDate.getTime() === today.getTime();
                }).length;

                setStats({
                    totalUsers: users.length,
                    newUsersToday: newToday,
                    activeUsers: users.length, // You can implement your own logic
                });
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Total Users */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-blue-100 text-sm font-medium">Total Users</p>
                        <p className="text-white text-3xl font-bold mt-2">{stats.totalUsers}</p>
                    </div>
                    <div className="bg-blue-500/30 rounded-full p-3">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* New Users Today */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-green-100 text-sm font-medium">New Today</p>
                        <p className="text-white text-3xl font-bold mt-2">{stats.newUsersToday}</p>
                    </div>
                    <div className="bg-green-500/30 rounded-full p-3">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Active Users */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-purple-100 text-sm font-medium">Active Users</p>
                        <p className="text-white text-3xl font-bold mt-2">{stats.activeUsers}</p>
                    </div>
                    <div className="bg-purple-500/30 rounded-full p-3">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}