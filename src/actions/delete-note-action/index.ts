"use server";
import { db } from "@/src/db";
import { notesTable } from "@/src/db/schema";
import { auth } from "@/src/lib/auth";
import { actionClient } from "@/src/lib/next-safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";

export const deleteNote = actionClient
  .schema(
    z.object({
      id: z.string().uuid(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const note = db.query.notesTable.findFirst({
      where: eq(notesTable.noteId, parsedInput.id),
    });

    if (!note) {
      throw new Error("Nota não encontrada");
    }

    await db.delete(notesTable).where(eq(notesTable.noteId, parsedInput.id));

    revalidatePath("/notes");
  });
