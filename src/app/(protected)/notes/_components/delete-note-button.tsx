"use client";

import { deleteNote } from "@/src/actions/delete-note-action";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { Button } from "@/src/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

type DeleteNoteButtonProps = {
  noteId?: string;
  setIsOpen: (state: boolean) => void;
};

export function DeleteNoteButton({ noteId, setIsOpen }: DeleteNoteButtonProps) {
  const deleteNoteAction = useAction(deleteNote, {
    onSuccess: () => {
      toast.info("Nota excluída com sucesso.");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Erro ao excluir nota, tente novamente mais tarde.");
    },
  });

  function handleDeleteNoteClick() {
    if (!noteId) return;
    deleteNoteAction.execute({ id: noteId });
  }
  return (
    <>
      <AlertDialogTrigger asChild>
        <Button className="cursor-pointer">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir essa nota?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita e irá deletar a nota
            permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteNoteClick}>
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
}
