import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { AnimeController } from "../controllers/anime.controller";

const router = Router();
router.use(authMiddleware);

const animeController = new AnimeController();

// Criar anime
router.post("/", (req, res) =>
    animeController.create(req, res)
);

// Listar animes do usuário
router.get("/", (req, res) =>
    animeController.list(req, res)
);

// Buscar por ID
router.get("/:id", (req, res) =>
    animeController.getById(req, res)
);

// Atualizar
router.patch("/:id", (req, res) =>
    animeController.update(req, res)
);

// Deletar
router.delete("/:id", (req, res) =>
    animeController.delete(req, res)
);

export default router;