import z from "zod";

export const upsertNoteSchema = z.object({
  noteId: z.string().optional(),
  wineName: z.string().min(1, { message: "Nome do vinho é obrigatório" }),
  vintage: z.string().default(""),
  grapes: z.string().default(""),
  wineType: z.string().default(""),
  country: z
    .string()
    .min(1, { message: "País/Região de produção é obrigatório" }),
  producer: z.string().min(1, { message: "Produtor é obrigatório" }),
  currency: z.string().default(""),
  priceInCents: z.number().default(0),
  alcohol: z
    .number()
    .max(40, { message: "Teor não pode ultrapassar 40%" })
    .default(0),
  tastingLocation: z.string().default(""),
  score: z
    .number()
    .max(100, { message: "A pontuação não pode ser maior do que 100" })
    .default(0),
  annotations: z.string().default(""),
});
