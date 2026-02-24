import { AnimeTag, ANIME_TAGS, TAG_COLORS } from '@/types/anime';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface TagSelectorProps {
  selectedTags: AnimeTag[];
  onTagsChange: (tags: AnimeTag[]) => void;
}

export function TagSelector({ selectedTags, onTagsChange }: TagSelectorProps) {
  const toggleTag = (tag: AnimeTag) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {ANIME_TAGS.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200',
              isSelected
                ? TAG_COLORS[tag]
                : 'bg-secondary/50 text-muted-foreground border-border hover:border-primary/30'
            )}
          >
            <span className="flex items-center gap-1.5">
              {isSelected && <Check className="w-3 h-3" />}
              {tag}
            </span>
          </button>
        );
      })}
    </div>
  );
}
