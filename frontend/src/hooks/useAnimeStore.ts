import { useState, useEffect, useCallback } from "react";
import { Anime } from "@/types/anime";
import { api } from "@/lib/api";

export function useAnimeStore() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchAnimes = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);

    try {
      const data = await api.get("/animes", token);

      // Adaptando backend -> frontend
      const mapped: Anime[] = data.items.map((item: any) => ({
        id: item.id,
        name: item.title,
        episodes: item.episodes,
        rating: item.rating,
        watchedDate: item.watchedDate,
        coverImage: item.coverImage,
        tags: item.genres || [],
        createdAt: item.createdAt,
      }));

      setAnimes(mapped);
    } catch (error) {
      console.error("Erro ao buscar animes:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAnimes();
  }, [fetchAnimes]);

  const addAnime = async (anime: Omit<Anime, "id" | "createdAt">) => {
    if (!token) return;

    const created = await api.post(
      "/animes",
      {
        title: anime.name,
        episodes: anime.episodes,
        rating: anime.rating,
        coverImage: anime.coverImage,
        watchedDate: anime.watchedDate,
        genres: anime.tags,
      },
      token,
    );

    await fetchAnimes();
    return created;
  };

  const deleteAnime = async (id: string) => {
    if (!token) return;

    await fetch(`http://localhost:3001/animes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await fetchAnimes();
  };

  const updateAnime = async (id: string, updates: Partial<Anime>) => {
    if (!token) return;

    await fetch(`http://localhost:3001/animes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: updates.name,
        episodes: updates.episodes,
        rating: updates.rating,
        coverImage: updates.coverImage,
        watchedDate: updates.watchedDate,
        genres: updates.tags,
      }),
    });

    await fetchAnimes();
  };

  const getAnimesSorted = () => {
    return [...animes].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  };

  return {
    animes,
    isLoading,
    addAnime,
    updateAnime,
    deleteAnime,
    getAnimesSorted,
    totalCount: animes.length,
  };
}
