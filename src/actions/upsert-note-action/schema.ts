import z from "zod";

export const upsertNoteSchema = z.object({
  noteId: z.string().optional(),
  wineName: z.string().min(1, { message: "Nome do vinho é obrigatório" }),
  vintage: z.string().min(1, { message: "Safra é obrigatório" }),
  grapes: z.string().min(1, { message: "Uva é obrigatória" }),
  wineType: z.string().min(3, { message: "Tipo do vinho é obrigatório" }),
  country: z
    .string()
    .min(1, { message: "País/Região de produção é obrigatório" }),
  producer: z.string().min(1, { message: "Produtor é obrigatório" }),
  currency: z.string().min(1, { message: "Campo de moeda é obrigatório!" }),
  priceInCents: z.number().min(1, { message: "Preço do vinho é obrigatório" }),
  alcohol: z
    .number()
    .min(1, { message: "Teor de álcool é obrigatório" })
    .max(40, { message: "Teor não pode ultrapassar 40%" }),
  tastingLocation: z
    .string()
    .min(1, { message: "Local de prova é obrigatório" }),
  score: z
    .number()
    .min(1, { message: "A pontuação deve ser maior que um" })
    .max(100, { message: "A pontuação não pode ser maior do que 100" }),
  annotations: z.string(),
});
