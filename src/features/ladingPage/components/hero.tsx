import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="w-full flex flex-col md:flex-row px-10 gap-10 items-center min-h-[calc(90vh-80px)]">
      {/* Text content */}
      <div className="w-full md:w-2/3 flex flex-col items-start gap-4">
        <span className="px-3 py-1 text-xs font-medium rounded-full border text-primary">
          🚀 Versão 1.0 já disponível
        </span>

        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
          Construa <span className="text-primary">formulários inteligentes</span> em minutos
        </h1>

        <p className="text-lg text-muted-foreground max-w-3xl">
          Crie, personalize e compartilhe formulários interativos sem complicação. 
          Aplique testes, colete dados e transforme respostas em insights valiosos.
        </p>

        <div className="flex gap-4 mt-4">
          <Button size="lg" onClick={()=> navigate("/dashboard")}>Começar agora</Button>
          <Button size="lg" variant="outline">Ver exemplos</Button>
        </div>
      </div>


    </section>
  );
}
