export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-slate-950 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white">Settings</h1>
                    <p className="text-gray-400 mt-1">Manage your account preferences</p>
                </div>

                {/* Settings Sections */}
                <div className="space-y-4">
                    {/* Account Settings */}
                    <div className="bg-slate-900 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Account Settings</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Notifications
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-slate-800 border-gray-700 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-400">
                                        Receive email notifications for new movies
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Privacy Settings */}
                    <div className="bg-slate-900 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Privacy</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Profile Visibility
                                </label>
                                <select className="w-full rounded-lg bg-slate-800 border border-gray-700 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Public</option>
                                    <option>Private</option>
                                    <option>Friends Only</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Display Preferences */}
                    <div className="bg-slate-900 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Display</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Theme
                                </label>
                                <select className="w-full rounded-lg bg-slate-800 border border-gray-700 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Dark</option>
                                    <option>Light</option>
                                    <option>Auto</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-slate-900 rounded-lg p-6 border border-red-900/50">
                        <h2 className="text-xl font-semibold text-red-500 mb-4">Danger Zone</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-400 mb-3">
                                    Once you delete your account, there is no going back. Please be certain.
                                </p>
                                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end gap-3">
                    <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-semibold transition">
                        Cancel
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}