import { z } from "zod";

export const createAnimeSchema = z.object({
  title: z.string().min(1, "Title é obrigatório").max(100, "Title muito longo"),

  episodes: z
    .number()
    .int("Episodes deve ser inteiro")
    .positive("Episodes deve ser positivo"),

  rating: z.number().min(0, "Rating mínimo é 0").max(10, "Rating máximo é 10"),
});
