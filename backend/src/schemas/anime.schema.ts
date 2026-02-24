import { z } from "zod";

export const createAnimeSchema = z.object({
  title: z.string().min(1),
  episodes: z.number().int().positive(),
  rating: z.number().min(1).max(5),
  coverImage: z.string().url().optional(),
  watchedDate: z.string().optional(),
  genres: z.array(z.string()).optional(),
});

export type CreateAnimeDTO = z.infer<typeof createAnimeSchema>;
