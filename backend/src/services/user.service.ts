import prisma from "../lib/prisma";
import bcrypt from "bcrypt";

export class UserService {
  async create(data: { email: string; name?: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name ?? null,
        password: hashedPassword,
      },
    });
  }

  async list() {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}
