import { Anime } from '@/types/anime';
import { StarRating } from './StarRating';
import { TagBadge } from './TagBadge';
import { Calendar, Film } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AnimeCardProps {
  anime: Anime;
  index: number;
}

export function AnimeCard({ anime, index }: AnimeCardProps) {
  return (
    <div 
      className="anime-card group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={anime.coverImage}
          alt={anime.name}
          className="anime-card-image group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-2 right-2 glass-effect rounded-lg px-2 py-1 border border-border">
          <StarRating rating={anime.rating} readonly size="sm" />
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">
          {anime.name}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Film className="w-4 h-4" />
            <span>{anime.episodes} eps</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(anime.watchedDate), 'MMM yyyy', { locale: ptBR })}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {anime.tags.slice(0, 3).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
          {anime.tags.length > 3 && (
            <span className="tag-pill bg-secondary text-muted-foreground">
              +{anime.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
