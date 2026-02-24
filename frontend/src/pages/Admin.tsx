import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { useAnimeStore } from '@/hooks/useAnimeStore';
import { AnimeTag, ANIME_TAGS } from '@/types/anime';
import { StarRating } from '@/components/StarRating';
import { TagSelector } from '@/components/TagSelector';
import { ImageUpload } from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { Search, Pencil, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Anime } from '@/types/anime';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Admin = () => {
  const navigate = useNavigate();
  const { animes, updateAnime, deleteAnime, totalCount } = useAnimeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingAnime, setEditingAnime] = useState<Anime | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Anime | null>(null);

  // Edit form state
  const [editName, setEditName] = useState('');
  const [editEpisodes, setEditEpisodes] = useState('');
  const [editRating, setEditRating] = useState(0);
  const [editWatchedDate, setEditWatchedDate] = useState('');
  const [editCoverImage, setEditCoverImage] = useState('');
  const [editTags, setEditTags] = useState<AnimeTag[]>([]);

  const filteredAnimes = useMemo(() => {
    if (!searchQuery.trim()) return animes;
    const query = searchQuery.toLowerCase();
    return animes.filter(
      (anime) =>
        anime.name.toLowerCase().includes(query) ||
        anime.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [animes, searchQuery]);

  const openEditDialog = (anime: Anime) => {
    setEditingAnime(anime);
    setEditName(anime.name);
    setEditEpisodes(anime.episodes.toString());
    setEditRating(anime.rating);
    setEditWatchedDate(anime.watchedDate);
    setEditCoverImage(anime.coverImage);
    setEditTags(anime.tags);
  };

  const closeEditDialog = () => {
    setEditingAnime(null);
    setEditName('');
    setEditEpisodes('');
    setEditRating(0);
    setEditWatchedDate('');
    setEditCoverImage('');
    setEditTags([]);
  };

  const handleSaveEdit = () => {
    if (!editingAnime) return;

    if (!editName.trim()) {
      toast.error('Nome é obrigatório');
      return;
    }

    if (!editEpisodes || parseInt(editEpisodes) < 1) {
      toast.error('Quantidade de episódios inválida');
      return;
    }

    if (editRating === 0) {
      toast.error('Nota é obrigatória');
      return;
    }

    if (!editWatchedDate) {
      toast.error('Data é obrigatória');
      return;
    }

    if (!editCoverImage) {
      toast.error('Capa é obrigatória');
      return;
    }

    if (editTags.length === 0) {
      toast.error('Selecione pelo menos um gênero');
      return;
    }

    updateAnime(editingAnime.id, {
      name: editName.trim(),
      episodes: parseInt(editEpisodes),
      rating: editRating,
      watchedDate: editWatchedDate,
      coverImage: editCoverImage,
      tags: editTags,
    });

    toast.success('Anime atualizado com sucesso!');
    closeEditDialog();
  };

  const handleDelete = () => {
    if (!deleteConfirm) return;
    deleteAnime(deleteConfirm.id);
    toast.success('Anime excluído com sucesso!');
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen">
      <Header totalAnimes={totalCount} />

      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para coleção
        </Button>

        <div className="bg-card rounded-xl border border-border p-6">
          <h1 className="text-2xl font-bold gradient-text mb-6">
            Administrar Animes
          </h1>

          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-secondary border-border"
            />
          </div>

          {filteredAnimes.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {animes.length === 0
                ? 'Nenhum anime cadastrado ainda'
                : 'Nenhum anime encontrado'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Capa</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead className="w-24">Episódios</TableHead>
                    <TableHead className="w-28">Nota</TableHead>
                    <TableHead className="w-32">Data</TableHead>
                    <TableHead>Gêneros</TableHead>
                    <TableHead className="w-24 text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAnimes.map((anime) => (
                    <TableRow key={anime.id}>
                      <TableCell>
                        <img
                          src={anime.coverImage}
                          alt={anime.name}
                          className="w-12 h-16 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{anime.name}</TableCell>
                      <TableCell>{anime.episodes}</TableCell>
                      <TableCell>
                        <StarRating rating={anime.rating} size="sm" readonly />
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {format(new Date(anime.watchedDate), 'dd/MM/yyyy', {
                          locale: ptBR,
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {anime.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                          {anime.tags.length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{anime.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(anime)}
                            className="h-8 w-8"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteConfirm(anime)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>

      {/* Edit Dialog */}
      <Dialog open={!!editingAnime} onOpenChange={() => closeEditDialog()}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Anime</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div>
                <Label className="text-sm font-medium mb-2 block">Capa</Label>
                <ImageUpload value={editCoverImage} onChange={setEditCoverImage} />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <Label htmlFor="editName">Nome do Anime</Label>
                  <Input
                    id="editName"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="mt-1 bg-secondary border-border"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editEpisodes">Episódios</Label>
                    <Input
                      id="editEpisodes"
                      type="number"
                      min="1"
                      value={editEpisodes}
                      onChange={(e) => setEditEpisodes(e.target.value)}
                      className="mt-1 bg-secondary border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="editWatchedDate">Data Assistido</Label>
                    <Input
                      id="editWatchedDate"
                      type="date"
                      value={editWatchedDate}
                      onChange={(e) => setEditWatchedDate(e.target.value)}
                      className="mt-1 bg-secondary border-border"
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Nota</Label>
                  <StarRating
                    rating={editRating}
                    onRatingChange={setEditRating}
                    size="lg"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Gêneros</Label>
              <TagSelector selectedTags={editTags} onTagsChange={setEditTags} />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" onClick={closeEditDialog}>
                Cancelar
              </Button>
              <Button onClick={handleSaveEdit}>Salvar Alterações</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir anime?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir "{deleteConfirm?.name}"? Esta ação não
              pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
