import EditMovieForm from "@/app/admin/_components/EditMovieForm";
import { handleGetMovieById } from "@/lib/actions/admin/movie-action";
import { notFound } from "next/navigation";

export default async function EditMoviePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const response = await handleGetMovieById(id);
    
    if (!response.success || !response.data) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-950 p-6">
            <EditMovieForm movie={response.data} />
        </div>
    );
}