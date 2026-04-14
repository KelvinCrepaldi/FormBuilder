import { ChartPieDonutText } from "@/components/chatPieSample";
import { ChartBarInteractive } from "@/components/chatSample";
import { SiteHeader } from "@/components/siteHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useDB from "@/hooks/useDB";
import { Trash } from "lucide-react";
import ProjectList from "../components/projectList";

export default function DashboardPage() {
  const { clearProjects } = useDB();

  return (
    <section className="flex min-h-full flex-col">
      <SiteHeader title="Projetos recentes" subtitle="Visão geral do workspace" />

      <div className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 items-start gap-8">
          <div className="col-span-12 space-y-6 lg:col-span-8">
            <ProjectList />
          </div>

          <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
            <ChartPieDonutText />

            <Card className="editorial-shadow rounded-[1.5rem] border border-outline-variant/10 bg-tertiary-fixed p-6 text-on-tertiary-fixed">
              <div className="mb-4 flex items-center justify-between">
                <span className="material-symbols-outlined text-3xl">insights</span>
                <span className="rounded bg-white/40 px-2 py-1 text-[10px] font-black uppercase">
                  Demo
                </span>
              </div>
              <h4 className="mb-2 font-headline text-lg font-bold">
                Lógica dos formulários
              </h4>
              <p className="mb-4 text-sm opacity-80">
                Dados de exemplo para acompanhar o aspeto do dashboard Stitch.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-white/30 px-3 py-1 text-[10px] font-bold tracking-tight uppercase">
                  Ativo
                </span>
                <span className="rounded-full bg-white/30 px-3 py-1 text-[10px] font-bold tracking-tight uppercase">
                  Alta conversão
                </span>
              </div>
            </Card>
          </div>

          <div className="col-span-12">
            <ChartBarInteractive />
          </div>
        </div>

        <Card className="editorial-shadow flex flex-col gap-4 rounded-2xl border border-outline-variant/10 bg-surface-container-low p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-headline font-semibold text-on-surface">
              Ferramentas de demonstração
            </p>
            <p className="text-sm text-on-surface-variant">
              Limpa os projetos guardados localmente (IndexedDB).
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => void clearProjects()}
            >
              Limpar dados
              <Trash className="size-4" />
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
