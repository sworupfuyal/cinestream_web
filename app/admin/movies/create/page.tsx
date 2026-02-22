import CreateMovieForm from "../../_components/CreateMovieForm";

export default function CreateMoviePage() {
    return (
        <div className="min-h-screen bg-slate-950 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white">Add New Movie</h1>
                    <p className="text-gray-400 mt-1">Fill in the details to add a new movie</p>
                </div>
                <CreateMovieForm />
            </div>
        </div>
    );
}