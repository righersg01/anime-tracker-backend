export type AnimeTag = 
  | 'Comédia' 
  | 'Romance' 
  | 'Ação' 
  | 'Fantasia' 
  | 'Drama' 
  | 'Terror' 
  | 'Sci-Fi' 
  | 'Slice of Life'
  | 'Aventura'
  | 'Mistério'
  | 'Esportes'
  | 'Mecha'
  | 'Sobrenatural'
  | 'Psicológico'
  | 'Isekai';

export interface Anime {
  id: string;
  name: string;
  episodes: number;
  rating: number;
  watchedDate: string;
  coverImage: string;
  tags: AnimeTag[];
  createdAt: string;
}

export const ANIME_TAGS: AnimeTag[] = [
  'Comédia',
  'Romance',
  'Ação',
  'Fantasia',
  'Drama',
  'Terror',
  'Sci-Fi',
  'Slice of Life',
  'Aventura',
  'Mistério',
  'Esportes',
  'Mecha',
  'Sobrenatural',
  'Psicológico',
  'Isekai',
];

export const TAG_COLORS: Record<AnimeTag, string> = {
  'Comédia': 'bg-tag-comedy/20 text-tag-comedy border-tag-comedy/30',
  'Romance': 'bg-tag-romance/20 text-tag-romance border-tag-romance/30',
  'Ação': 'bg-tag-action/20 text-tag-action border-tag-action/30',
  'Fantasia': 'bg-tag-fantasy/20 text-tag-fantasy border-tag-fantasy/30',
  'Drama': 'bg-tag-drama/20 text-tag-drama border-tag-drama/30',
  'Terror': 'bg-tag-horror/20 text-foreground border-tag-horror/30',
  'Sci-Fi': 'bg-tag-scifi/20 text-tag-scifi border-tag-scifi/30',
  'Slice of Life': 'bg-tag-slice/20 text-tag-slice border-tag-slice/30',
  'Aventura': 'bg-primary/20 text-primary border-primary/30',
  'Mistério': 'bg-accent/20 text-accent border-accent/30',
  'Esportes': 'bg-tag-comedy/20 text-tag-comedy border-tag-comedy/30',
  'Mecha': 'bg-tag-scifi/20 text-tag-scifi border-tag-scifi/30',
  'Sobrenatural': 'bg-accent/20 text-accent border-accent/30',
  'Psicológico': 'bg-tag-drama/20 text-tag-drama border-tag-drama/30',
  'Isekai': 'bg-tag-fantasy/20 text-tag-fantasy border-tag-fantasy/30',
};
