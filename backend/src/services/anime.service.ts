import prisma from "../lib/prisma";
import { CreateAnimeDTO } from "../schemas/anime.schema";

export class AnimeService {
  async create(userId: string, data: CreateAnimeDTO) {
    return prisma.anime.create({
      data: {
        userId,
        title: data.title,
        episodes: data.episodes,
        rating: data.rating,
        coverImage: data.coverImage ?? null,
        watchedDate: data.watchedDate ? new Date(data.watchedDate) : null,
        genres: data.genres ?? [],
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
    opts: {
      page: number;
      limit: number;
      sort: string;
      order: string;
      search: string;
    },
  ) {
    const { page, limit, sort, order, search } = opts;

    const allowedSortFields = ["createdAt", "rating", "title"] as const;

    const sortField = allowedSortFields.includes(sort as any)
      ? sort
      : "createdAt";

    const sortOrder = order === "asc" ? "asc" : "desc";
    const where = search
      ? {
          userId,
          title: {
            contains: search,
            mode: "insensitive" as const,
          },
        }
      : { userId };

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.anime.findMany({
        where,
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
        where,
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
