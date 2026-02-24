import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { AnimeCard } from '@/components/AnimeCard';
import { Pagination } from '@/components/Pagination';
import { EmptyState } from '@/components/EmptyState';
import { FilterPanel } from '@/components/FilterPanel';
import { useAnimeStore } from '@/hooks/useAnimeStore';
import { AnimeTag } from '@/types/anime';

const Index = () => {
  const { getAnimesSorted, totalCount, isLoading } = useAnimeStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<AnimeTag[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const sortedAnimes = useMemo(() => getAnimesSorted(), [getAnimesSorted]);

  const filteredAnimes = useMemo(() => {
    return sortedAnimes.filter((anime) => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          anime.name.toLowerCase().includes(query) ||
          anime.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Genre filter (multi-select)
      if (selectedTags.length > 0) {
        const hasMatchingTag = selectedTags.some((tag) => anime.tags.includes(tag));
        if (!hasMatchingTag) return false;
      }

      // Date range filter
      if (startDate || endDate) {
        const animeDate = new Date(anime.watchedDate);
        if (startDate && animeDate < new Date(startDate)) return false;
        if (endDate && animeDate > new Date(endDate)) return false;
      }

      return true;
    });
  }, [sortedAnimes, searchQuery, selectedTags, startDate, endDate]);

  const totalPages = Math.ceil(filteredAnimes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAnimes = filteredAnimes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="anime-card">
                <div className="aspect-[3/4] animate-shimmer" />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-3/4 animate-shimmer rounded" />
                  <div className="h-3 w-1/2 animate-shimmer rounded" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header
        totalAnimes={totalCount}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <main className="container mx-auto px-4 py-8">
        {totalCount === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="mb-6">
              <FilterPanel
                selectedTags={selectedTags}
                onTagsChange={(tags) => {
                  setSelectedTags(tags);
                  setCurrentPage(1);
                }}
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={(date) => {
                  setStartDate(date);
                  setCurrentPage(1);
                }}
                onEndDateChange={(date) => {
                  setEndDate(date);
                  setCurrentPage(1);
                }}
                onClearFilters={handleClearFilters}
              />
            </div>

            {filteredAnimes.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">
                  Nenhum anime encontrado com os filtros aplicados
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {paginatedAnimes.map((anime, index) => (
                    <AnimeCard key={anime.id} anime={anime} index={index} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredAnimes.length}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                  />
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
