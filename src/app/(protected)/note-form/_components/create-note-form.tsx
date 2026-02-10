"use client";

import { useAction } from "next-safe-action/hooks";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { notesTable } from "@/src/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { upsertNote } from "@/src/actions/upsert-note-action";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";

const wineTypes = [
  { value: "Branco", label: "Branco" },
  { value: "Tinto", label: "Tinto" },
  { value: "Espumante", label: "Espumante" },
  { value: "Rosé", label: "Rosé" },
  { value: "Fortificado", label: "Fortificado" },
  { value: "Doce", label: "Doce" },
];

const currencies = [
  { value: "R$", label: "R$" },
  { value: "$", label: "$" },
  { value: "€", label: "€" },
];

const formSchema = z.object({
  wineName: z.string().min(1, { message: "Nome do vinho é obrigatório" }),
  vintage: z.string().refine((val) => val === "N/S" || /^\d{4}$/.test(val), {
    message: "Digite um valor válido (YYYY | N/S)",
  }),
  grapes: z.string().default(""),
  wineType: z.string().default(""),
  country: z
    .string()
    .min(1, { message: "País/Região de produção é obrigatório" }),
  producer: z.string().min(1, { message: "Produtor é obrigatório" }),
  currency: z.string().default(""),
  priceInCents: z.coerce.number().default(0),
  alcohol: z.coerce
    .number()
    .max(40, { message: "Teor não pode ultrapassar 40%" })
    .default(0),
  tastingLocation: z.string().default(""),
  score: z.coerce
    .number()
    .max(100, { message: "A pontuação não pode ser maior do que 100" })
    .default(0),
  annotations: z.string().default(""),
});

type NoteFormProps = {
  note?: typeof notesTable.$inferInsert;
  onSuccess?: () => void;
  userId: string;
};

export default function NoteForm({ note, onSuccess, userId }: NoteFormProps) {
  const form = useForm({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      wineName: note?.wineName ?? "",
      vintage: note?.vintage ?? "N/S",
      alcohol: note?.alcohol ?? 0,
      country: note?.country ?? "",
      currency: note?.currency ?? "",
      grapes: note?.grapes ?? "",
      priceInCents: note?.priceInCents ? note.priceInCents / 100 : 0,
      producer: note?.producer ?? "",
      score: note?.score ?? 0,
      wineType: note?.wineType ?? "",
      tastingLocation: note?.tastingLocation ?? "",
      annotations: note?.annotations ?? "",
    },
  });

  const upsertNoteAction = useAction(upsertNote, {
    onSuccess: () => {
      toast.success("Nota salva com sucesso"), onSuccess?.();
      form.reset();
    },
    onError: (e) => {
      toast.error("Erro ao salvar a nota, tente novamente");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    upsertNoteAction.execute({
      ...values,
      noteId: note?.noteId,
      priceInCents: values.priceInCents ?? 0,
      alcohol: values.alcohol ?? 0,
      score: values.score ?? 0,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Vinho */}
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="wineName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Vinho <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Romanée Conti La Tache Grand Cru"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Safra + Álcool */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="vintage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Safra</FormLabel>
                  <FormControl>
                    <Input placeholder="N/S" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="alcohol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Álcool</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="13,5%"
                      {...field}
                      value={String(field.value ?? "")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Uva(s) + Tipo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="grapes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Uvas</FormLabel>
                  <FormControl>
                    <Input placeholder="Pinot Noir" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="wineType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                    >
                      <SelectTrigger id="wineType">
                        <SelectValue placeholder="—" />
                      </SelectTrigger>
                      <SelectContent>
                        {wineTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* País/Região + Produtor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pais / Região</FormLabel>
                  <FormControl>
                    <Input placeholder="Bourgogne / Côte de Nuits" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="producer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produtor</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Domaine de la Romanée-Conti"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Preço + Pontuação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-20 shrink-0">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="priceInCents"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="350,00"
                        {...field}
                        value={String(field.value ?? "")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pontuação</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="92/100"
                      {...field}
                      value={String(field.value ?? "")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Onde provei / Comprei */}
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="tastingLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Local de degustação / Compra</FormLabel>
                <FormControl>
                  <Input placeholder="Fasano / ABS SP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Anotações */}
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="annotations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {"Anotações (aromas, impressões, harmonização)"}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ex: Rubi profundo, frutas negras, grafite; taninos finos. acidez média+; 92 pts agora, potencial 3-5 anos;"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Botões */}
        <div className="flex gap-3 pt-2 w-full">
          <Button
            className="w-full"
            type="submit"
            disabled={upsertNoteAction.isPending}
          >
            {upsertNoteAction.isPending ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
