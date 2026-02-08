"use client";

import { Button } from "@/src/components/ui/button";
import { notesTable } from "@/src/db/schema";
import { PenIcon } from "lucide-react";
import NoteForm from "../../note-form/_components/create-note-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

type EditNoteButtonProps = {
  note: typeof notesTable.$inferSelect;
  setIsOpen: (state: boolean) => void;
};

export function EditNoteButton({ note, setIsOpen }: EditNoteButtonProps) {
  function handleEditNoteClick() {
    setIsOpen(true);
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={handleEditNoteClick}
        >
          <PenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Editar Nota</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[75vh] pr-2">
          <NoteForm userId={note.userId} note={note} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
