import { Button } from "@/components/ui/button";
import type { formTypes } from "../types";
import BuildOption from "./buildOption";
import useBuilder from "../context/useBuilder";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

export default function BuildForm({ form }: { form: formTypes }) {
  const { deleteForm, updateFormQuestion, createOption } = useBuilder();

  return (
    <Card className="w-[70%] m-10 p-10 flex flex-col gap-4">
      {/* Pergunta editável */}
      <input
        className="border-b border-gray-300 focus:outline-none focus:border-primary text-lg font-medium bg-transparent"
        value={form.question}
        onChange={(e) => updateFormQuestion(form.id, e.target.value)}
        placeholder="Digite a pergunta..."
      />

      {/* Lista de opções */}
      <div className="flex flex-col gap-2">
        {form.options.map((option) => (
          <BuildOption key={option.id} option={option} formId={form.id} />
        ))}
      </div>

      {/* Botões de ação */}
      <div className="flex flex-1 justify-center gap-2">
        <Button onClick={() => createOption(form.id)}>+</Button>
        
      </div>
      <div className="flex justify-end">
        <Button variant="destructive" onClick={() => deleteForm(form)}>
          <Trash2/>
        </Button>
      </div>
    </Card>
  );
}
