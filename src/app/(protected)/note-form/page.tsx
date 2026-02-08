import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CreateNoteForm from "./_components/create-note-form";

export default async function CreateNotePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }
  return (
    <>
      <CreateNoteForm userId={session?.user.id} />
    </>
  );
}
