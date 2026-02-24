import { AnimeTag, TAG_COLORS } from '@/types/anime';
import { cn } from '@/lib/utils';

interface TagBadgeProps {
  tag: AnimeTag;
  onRemove?: () => void;
  className?: string;
}

export function TagBadge({ tag, onRemove, className }: TagBadgeProps) {
  return (
    <span
      className={cn(
        'tag-pill border inline-flex items-center gap-1',
        TAG_COLORS[tag],
        className
      )}
    >
      {tag}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 hover:opacity-70 transition-opacity"
        >
          ×
        </button>
      )}
    </span>
  );
}
