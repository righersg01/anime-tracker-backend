import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// Criar usuário
router.post("/", async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });

    const { password: _pw, ...safeUser } = user;
    return res.status(201).json(safeUser);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

// Listar usuários
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
  });

  res.json(users);
});

export default router;
