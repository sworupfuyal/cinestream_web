import EditUserForm from "@/app/admin/users/_components/EditUserForm";
import { getUserById } from "@/lib/api/admin/user";
import { notFound } from "next/navigation";

interface EditUserPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id: userId } = await params;

  let user;
  try {
    const response = await getUserById(userId);

    if (!response.success || !response.data) {
      notFound();
    }

    user = response.data;
  } catch {
    notFound();
  }

  return <EditUserForm user={user} />;
}
