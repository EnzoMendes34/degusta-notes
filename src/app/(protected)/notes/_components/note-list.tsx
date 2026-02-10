import { db } from "@/src/db";
import { notesTable } from "@/src/db/schema";
import { eq, desc } from "drizzle-orm";
import { SingleNote } from "./single-note";
import { redirect } from "next/navigation";

type NotesListProps = {
  userId: string;
  search?: string;
};

export async function NoteList({ userId }: NotesListProps) {
  const notes = await db.query.notesTable.findMany({
    where: eq(notesTable.userId, userId),
    orderBy: desc(notesTable.createdAt),
  });

  if (notes.length < 1) {
    redirect("note-form");
  }
  return (
    <>
      {notes.map((note) => (
        <div key={note.noteId} className="my-8">
          <SingleNote note={note} />
        </div>
      ))}
    </>
  );
}
