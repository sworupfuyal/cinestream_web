import CreateUserForm from "../_components/CreateUserForm";

export default function Page() {
    return (
        <div className="min-h-screen bg-slate-950 p-4 sm:p-6">
            <div className="max-w-lg mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Create User</h1>
                    <p className="text-gray-400 mt-1">Add a new user to the system</p>
                </div>
                <CreateUserForm/>
            </div>
        </div>
    );
}