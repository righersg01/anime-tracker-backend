import { Link, useLocation } from 'react-router-dom';
import { Plus, Library, Search, Menu, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface HeaderProps {
  totalAnimes?: number;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function Header({ totalAnimes, searchQuery, onSearchChange }: HeaderProps) {
  const location = useLocation();
  const showSearch = location.pathname === '/' && onSearchChange;

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Library className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-text">AnimeTracker</h1>
              {totalAnimes !== undefined && (
                <p className="text-xs text-muted-foreground">
                  {totalAnimes} animes na coleção
                </p>
              )}
            </div>
          </Link>

          {showSearch && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar anime..."
                value={searchQuery || ''}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9 bg-secondary border-border h-9"
              />
            </div>
          )}

          <nav className="flex items-center gap-2 shrink-0">
            <Link to="/">
              <Button
                variant={location.pathname === '/' ? 'secondary' : 'ghost'}
                size="sm"
                className={cn(
                  'gap-2',
                  location.pathname === '/' && 'bg-secondary'
                )}
              >
                <Library className="w-4 h-4" />
                <span className="hidden sm:inline">Coleção</span>
              </Button>
            </Link>
            <Link to="/add">
              <Button
                variant={location.pathname === '/add' ? 'default' : 'ghost'}
                size="sm"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Adicionar</span>
              </Button>
            </Link>

            {/* Menu Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Menu className="w-4 h-4" />
                  <span className="hidden sm:inline">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="w-4 h-4" />
                    Administrar Animes
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
