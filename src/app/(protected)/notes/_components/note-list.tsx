import { db } from "@/src/db";
import { notesTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { SingleNote } from "./single-note";
import { redirect } from "next/navigation";

type NotesListProps = {
  userId: string;
  search?: string;
};

export async function NoteList({ userId, search }: NotesListProps) {
  const notes = await db.query.notesTable.findMany({
    where: eq(notesTable.userId, userId),
  });

  if (notes.length < 1) {
    redirect("note-form");
  }
  return (
    <>
      {notes.map((note) => (
        <div className="my-8">
          <SingleNote key={note.noteId} note={note} />
        </div>
      ))}
    </>
  );
}
