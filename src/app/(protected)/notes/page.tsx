import { headers } from "next/headers";
import { auth } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { NoteList } from "./_components/note-list";
import { SearchInput } from "./_components/search-input";

type NotesPageProps = {
  searchParams: {
    q?: string;
  };
};

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }
  return (
    <>
      <NoteList userId={session?.user.id} search={searchParams.q} />
    </>
  );
}
