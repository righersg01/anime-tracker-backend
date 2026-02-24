import { Request, Response } from "express";
import { AnimeService } from "../services/anime.service";
import { createAnimeSchema } from "../schemas/anime.schema";

const animeService = new AnimeService();

export class AnimeController {
  async create(req: Request, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ error: "Não autenticado" });
    }
    console.log("BODY:", req.body);
    const parsed = createAnimeSchema.safeParse(req.body);
    console.log(parsed);

    if (!parsed.success) {
      const formattedErrors = parsed.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      }));

      return res.status(400).json({
        error: "Validation failed",
        details: formattedErrors,
      });
    }

    const userId = req.userId;

    const anime = await animeService.create(userId, parsed.data);

    return res.status(201).json(anime);
  }

  async list(req: Request, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);

    const sort = String(req.query.sort || "createdAt");
    const order = String(req.query.order || "desc");
    const search = String(req.query.search || "");

    const result = await animeService.listByUserPaginated(req.userId, {
      page,
      limit,
      sort,
      order,
      search,
    });

    return res.json(result);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const anime = await animeService.findById(id);

    if (!anime) {
      return res.status(404).json({ error: "Anime não encontrado" });
    }

    return res.json(anime);
  }

  async update(req: Request, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    const idParam = req.params.id;

    if (!idParam || Array.isArray(idParam)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const id = idParam;
    const userId = req.userId;

    const anime = await animeService.findById(id);

    if (!anime || anime.userId !== userId) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const { title, episodes, rating } = req.body;

    const updated = await animeService.update(id, {
      ...(title !== undefined && { title }),
      ...(episodes !== undefined && { episodes }),
      ...(rating !== undefined && { rating }),
    });

    return res.json(updated);
  }

  async delete(req: Request, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    const idParam = req.params.id;

    if (!idParam || Array.isArray(idParam)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const id = idParam;
    const userId = req.userId;

    const anime = await animeService.findById(id);

    if (!anime || anime.userId !== userId) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    await animeService.delete(id);

    return res.status(204).send();
  }
}
