import { Library, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
        <Library className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Nenhum anime cadastrado
      </h2>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        Comece a catalogar sua coleção de animes! Adicione o primeiro anime para
        ver ele aparecer aqui.
      </p>
      <Link to="/add">
        <Button size="lg" className="gap-2">
          <Plus className="w-5 h-5" />
          Adicionar primeiro anime
        </Button>
      </Link>
    </div>
  );
}
