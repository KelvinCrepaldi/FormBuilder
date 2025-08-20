import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="w-full flex px-10 gap-10 items-center min-h-[calc(100vh-80px)]">
      <div className="w-1/2 flex flex-col items-start gap-2">
        <div className="bg-black rounded-full text-white px-4 py-1 text-sm">
          Lançado v1.0.0
        </div>

        <h1 className="text-2xl font-bold">
          Protótipo Criador de formulários <br />
          Crie seu próprio formulário customizado
        </h1>

        <p className="text-base font-light">
          Form Builder é um projeto criado com o intuito de usuários criarem
          seus próprios formulários gerando tabelas em um dashboard customizado
        </p>

        <div className="flex gap-5 mt-2">
          <Button>Veja Demonstração</Button>
          <Button>Criar um novo!</Button>
        </div>
      </div>
      <div className="w-1/2 bg-black/10 flex-1 h-full">img</div>
    </section>
  );
}
