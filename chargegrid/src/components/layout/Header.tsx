import { Menu, Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeaderProps {
  onOpenMenu: () => void;
}

export function Header({ onOpenMenu }: HeaderProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeLabel = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateLabel = now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-base/90 px-4 py-3.5 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button onClick={onOpenMenu} className="text-text-muted lg:hidden" aria-label="Abrir menu">
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="font-mono text-xs text-text-muted">Sistema em operação</span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <div className="hidden items-center gap-1.5 font-mono text-xs text-text-faint md:flex">
          <Wifi className="h-3.5 w-3.5" />
          {dateLabel} · {timeLabel}
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-3 font-display text-xs font-semibold text-text">
          OP
        </div>
      </div>
    </header>
  );
}
