import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { StarRating } from '@/components/StarRating';
import { TagSelector } from '@/components/TagSelector';
import { ImageUpload } from '@/components/ImageUpload';
import { useAnimeStore } from '@/hooks/useAnimeStore';
import { AnimeTag } from '@/types/anime';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Save, ArrowLeft } from 'lucide-react';

const AddAnime = () => {
  const navigate = useNavigate();
  const { addAnime, totalCount } = useAnimeStore();

  const [name, setName] = useState('');
  const [episodes, setEpisodes] = useState('');
  const [rating, setRating] = useState(0);
  const [watchedDate, setWatchedDate] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState<AnimeTag[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Por favor, informe o nome do anime');
      return;
    }

    if (!episodes || parseInt(episodes) < 1) {
      toast.error('Por favor, informe a quantidade de episódios');
      return;
    }

    if (rating === 0) {
      toast.error('Por favor, dê uma nota ao anime');
      return;
    }

    if (!watchedDate) {
      toast.error('Por favor, informe quando você assistiu');
      return;
    }

    if (!coverImage) {
      toast.error('Por favor, faça upload da capa do anime');
      return;
    }

    if (tags.length === 0) {
      toast.error('Por favor, selecione pelo menos um gênero');
      return;
    }

    setIsSubmitting(true);

    try {
      addAnime({
        name: name.trim(),
        episodes: parseInt(episodes),
        rating,
        watchedDate,
        coverImage,
        tags,
      });

      toast.success('Anime adicionado com sucesso!');
      navigate('/');
    } catch (error) {
      toast.error('Erro ao adicionar anime');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header totalAnimes={totalCount} />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para coleção
        </Button>

        <div className="bg-card rounded-xl border border-border p-6 md:p-8">
          <h1 className="text-2xl font-bold gradient-text mb-8">
            Adicionar Novo Anime
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <Label className="text-sm font-medium text-foreground mb-3 block">
                  Capa do Anime
                </Label>
                <ImageUpload value={coverImage} onChange={setCoverImage} />
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    Nome do Anime
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Attack on Titan"
                    className="mt-2 bg-secondary border-border"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="episodes" className="text-sm font-medium text-foreground">
                      Episódios
                    </Label>
                    <Input
                      id="episodes"
                      type="number"
                      min="1"
                      value={episodes}
                      onChange={(e) => setEpisodes(e.target.value)}
                      placeholder="Ex: 25"
                      className="mt-2 bg-secondary border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="watchedDate" className="text-sm font-medium text-foreground">
                      Data que Assistiu
                    </Label>
                    <Input
                      id="watchedDate"
                      type="date"
                      value={watchedDate}
                      onChange={(e) => setWatchedDate(e.target.value)}
                      className="mt-2 bg-secondary border-border"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground mb-3 block">
                    Sua Nota
                  </Label>
                  <StarRating
                    rating={rating}
                    onRatingChange={setRating}
                    size="lg"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Gêneros
              </Label>
              <TagSelector selectedTags={tags} onTagsChange={setTags} />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/')}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                {isSubmitting ? 'Salvando...' : 'Salvar Anime'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddAnime;
