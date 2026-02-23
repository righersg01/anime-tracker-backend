import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response) {
    const { email, name, password } = req.body;

    try {
      const user = await userService.create({
        email,
        name,
        password,
      });

      return res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      });
    } catch {
      return res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const users = await userService.list();
      return res.json(users);
    } catch {
      return res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }
}
