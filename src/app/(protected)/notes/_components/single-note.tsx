"use client";

import { notesTable } from "@/src/db/schema";
import { formatDateTime } from "@/src/utils/format-datetime";
import clsx from "clsx";
import { DeleteNoteButton } from "./delete-note-button";
import { AlertDialog } from "@/src/components/ui/alert-dialog";
import { useState } from "react";
import { Dialog } from "@/src/components/ui/dialog";
import { EditNoteButton } from "./edit-note-button";
import { formatCurrencyInCents } from "@/src/utils/format-currency";

type SingleNoteProps = {
  note: typeof notesTable.$inferSelect;
};

export function SingleNote({ note }: SingleNoteProps) {
  const priceInCents = note.priceInCents ?? 0;
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const titleClasses = clsx("text-xl font-bold");
  const subTitleClasses = clsx("flex gap-2 my-2");
  const annotationClasses = clsx(
    "p-4 border-2 border-rose-950 rounded-lg text-rose-950",
  );
  const footerClasses = clsx("my-2 text-muted-foreground");
  return (
    <>
      <div className="border-2 border-zinc-300 rounded-sm p-8">
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={titleClasses}>
            {`${note.wineName} (${note.vintage})`}
          </div>
          <div className="gap-2 flex justify-end">
            <Dialog>
              <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <DeleteNoteButton setIsOpen={setIsOpen} noteId={note.noteId} />
              </AlertDialog>
            </Dialog>
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <EditNoteButton setIsOpen={setIsEditOpen} note={note} />
            </Dialog>
          </div>
        </div>
        <div className={subTitleClasses}>
          {`${note.wineType} | ${note.tastingLocation} | ${note.country}`}
        </div>
        <div className={annotationClasses}>{note.annotations}</div>
        <div className={footerClasses}>
          {`Nota: ${note.score}/100 | Álcool: ${note.alcohol}% | ${note.currency} ${formatCurrencyInCents(priceInCents)} | ${note.producer} | ${formatDateTime(note.createdAt.toISOString())}`}
        </div>
      </div>
    </>
  );
}
