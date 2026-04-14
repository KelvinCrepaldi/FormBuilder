import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function SiteHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const navigate = useNavigate();
  return (
    <header className="bg-surface sticky top-0 z-30 flex w-full items-center justify-between border-b border-outline-variant/10 px-6 py-4 md:px-8">
      <div>
        {subtitle && (
          <p className="font-label mb-1 text-xs font-semibold tracking-[0.2em] text-outline uppercase">
            {subtitle}
          </p>
        )}
        <h1 className="font-headline text-xl font-extrabold tracking-tight text-on-surface md:text-2xl">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <button
          type="button"
          className="material-symbols-outlined rounded-full p-2 text-slate-500 transition-colors hover:bg-surface-container-low"
          aria-label="Notificações"
        >
          notifications
        </button>
        <button
          type="button"
          className="material-symbols-outlined rounded-full p-2 text-slate-500 transition-colors hover:bg-surface-container-low"
          aria-label="Ajuda"
        >
          help_outline
        </button>
        <Button
          variant="signature"
          size="sm"
          className="hidden rounded-xl font-headline font-bold md:inline-flex"
          onClick={() => navigate("/builder?tab=questions")}
        >
          Criar formulário
        </Button>
      </div>
    </header>
  );
}
