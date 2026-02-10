"use server";

import { actionClient } from "@/src/lib/next-safe-action";
import { upsertNoteSchema } from "./schema";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { notesTable } from "@/src/db/schema";
import { db } from "@/src/db";
import { revalidatePath } from "next/cache";

export const upsertNote = actionClient
  .schema(upsertNoteSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const alcohol = parsedInput.alcohol.toString();

    await db
      .insert(notesTable)
      .values({
        ...parsedInput,
        priceInCents: parsedInput.priceInCents,
        userId: session.user.id,
        alcohol: alcohol,
        createdAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [notesTable.noteId],
        set: {
          ...parsedInput,
          updatedAt: new Date(),
          alcohol: alcohol,
        },
      });

    revalidatePath("/notes");
    revalidatePath("/create-note");
  });
