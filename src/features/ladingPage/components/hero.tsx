import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="w-full flex flex-col md:flex-row md:px-10 gap-10  items-center xl:items-start justify-start md:justify-center min-h-[calc(90vh-80px)] py-10 xl:py-30">
      {/* Text content */}
      <div className="w-2/3 2xl:w-full flex flex-col items-center gap-4">
        <span className="px-3 py-1 text-xs font-medium rounded-full border text-primary">
          🚀 Versão <span className="font-bold">1.0 Demo</span> disponível
        </span>

        <h1 className="text-4xl lg:text-5xl text-center font-bold leading-tight bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent">
          Construa <span className="bg-gradient-to-r from-blue-800/80 to-indigo-900/80 bg-clip-text text-transparent animate-pulse">formulários inteligentes</span> em minutos
        </h1>

        <p className="text-lg text-muted-foreground max-w-3xl text-center">
          Crie, personalize e compartilhe formulários interativos sem complicação. 
          Aplique testes, colete dados e transforme respostas em insights valiosos.
        </p>

        <div className="flex gap-4 mt-4">
          <Button size="lg" onClick={()=> navigate("/dashboard")} className="cursor-pointer bg-gradient-to-r from-blue-800/80 to-indigo-900/80">Começar agora</Button>
        </div>
      </div>
    </section>
  );
}
