import { Button } from "@/components/ui/button";
import type { formTypes } from "../types";
import BuildOption from "./buildOption";
import useBuilder from "../context/useBuilder";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BuildQuestion({ form }: { form: formTypes }) {
  const { updateFormQuestion, createOption } = useBuilder();

  return (
    <div className=" w-full h-full flex flex-col">
      {/* Pergunta editável */}
      <div className="typhography-h1 flex text-primary/50 mb-2">
        #{ form.position}
      </div>
      

      {/* Lista de opções */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="question"/>
        <Input
          id="question"
        className="border-b border-gray-300 focus:outline-none focus:border-primary text-lg font-medium bg-transparent mb-5"
        value={form.question}
        onChange={(e) => updateFormQuestion(form.id, e.target.value)}
        placeholder="Digite a pergunta..."
      />
        {form?.options?.map((option, index) => (
          <BuildOption key={option.id} option={option} formId={form.id} position={index+1}/>
        ))}
      </div>

      {/* Botões de ação */}
      <div className="flex flex-1 justify-center gap-2 py-5">
        <Button onClick={() => createOption(form.id)}>+</Button>
        
      </div>
    </div>
  );
}
