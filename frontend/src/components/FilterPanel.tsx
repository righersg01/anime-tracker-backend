import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ANIME_TAGS, AnimeTag } from '@/types/anime';

interface FilterPanelProps {
  selectedTags: AnimeTag[];
  onTagsChange: (tags: AnimeTag[]) => void;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onClearFilters: () => void;
}

export function FilterPanel({
  selectedTags,
  onTagsChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClearFilters,
}: FilterPanelProps) {
  const [isGenreOpen, setIsGenreOpen] = useState(false);

  const toggleTag = (tag: AnimeTag) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const hasActiveFilters = selectedTags.length > 0 || startDate || endDate;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">Filtros:</span>
      </div>

      {/* Genre Filter */}
      <Popover open={isGenreOpen} onOpenChange={setIsGenreOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-secondary border-border hover:bg-secondary/80"
          >
            Gênero
            {selectedTags.length > 0 && (
              <Badge variant="secondary" className="ml-1 bg-primary/20 text-primary">
                {selectedTags.length}
              </Badge>
            )}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-4" align="start">
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Selecione os gêneros</h4>
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
              {ANIME_TAGS.map((tag) => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={`filter-${tag}`}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => toggleTag(tag)}
                  />
                  <Label
                    htmlFor={`filter-${tag}`}
                    className="text-sm cursor-pointer"
                  >
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground"
                onClick={() => onTagsChange([])}
              >
                Limpar gêneros
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Date Range Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-secondary border-border hover:bg-secondary/80"
          >
            Data
            {(startDate || endDate) && (
              <Badge variant="secondary" className="ml-1 bg-primary/20 text-primary">
                •
              </Badge>
            )}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4" align="start">
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Período assistido</h4>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="startDate" className="text-xs text-muted-foreground">
                  De
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => onStartDateChange(e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="endDate" className="text-xs text-muted-foreground">
                  Até
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => onEndDateChange(e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>
            </div>
            {(startDate || endDate) && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground"
                onClick={() => {
                  onStartDateChange('');
                  onEndDateChange('');
                }}
              >
                Limpar datas
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Active Filters Display */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="gap-1 bg-primary/10 text-primary border border-primary/20 cursor-pointer hover:bg-primary/20"
              onClick={() => toggleTag(tag)}
            >
              {tag}
              <X className="w-3 h-3" />
            </Badge>
          ))}
        </div>
      )}

      {/* Clear All Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
          onClick={onClearFilters}
        >
          <X className="w-4 h-4 mr-1" />
          Limpar tudo
        </Button>
      )}
    </div>
  );
}
