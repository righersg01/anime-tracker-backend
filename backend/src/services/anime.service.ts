import prisma from "../lib/prisma";

export class AnimeService {
  async create(
    userId: string,
    data: {
      title: string;
      episodes: number;
      rating?: number;
    },
  ) {
    return prisma.anime.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async listByUser(userId: string) {
    return prisma.anime.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.anime.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: {
      title?: string;
      episodes?: number;
      rating?: number;
    },
  ) {
    return prisma.anime.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.anime.delete({
      where: { id },
    });
  }

  async listByUserPaginated(
    userId: string,
    opts: { page: number; limit: number; sort: string; order: string },
  ) {
    const { page, limit, sort, order } = opts;

    const allowedSortFields = ["createdAt", "rating", "title"] as const;

    const sortField = allowedSortFields.includes(sort as any)
      ? sort
      : "createdAt";

    const sortOrder = order === "asc" ? "asc" : "desc";

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.anime.findMany({
        where: { userId },
        orderBy: { [sortField]: sortOrder },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          coverImage: true,
          episodes: true,
          watchedDate: true,
          rating: true,
          genres: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.anime.count({
        where: { userId },
      }),
    ]);

    const totalPages = Math.max(Math.ceil(total / limit), 1);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }
}
