import { Button } from "@/components/ui/button";
import BuildOption from "./buildOption";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useQuestions from "../hooks/useQuestions";
import type { questionTypes } from "../types";
import { Layers2, Trash2 } from "lucide-react";

export default function BuildQuestion({ form }: { form: questionTypes }) {
  const { updateQuestionText, createOption, deleteQuestion, duplicateQuestion } = useQuestions();

  return (
    <div className=" w-full h-full flex flex-col">
      {/* Pergunta editável */}
      <div className="text-xl justify-end flex text-primary/50 items-center gap-1 mb-2">
        <span className="text-base text-primary/30">#</span>
        {form.position + 1}
        <Button
                variant="outline"
                size="sm"
                onClick={() => duplicateQuestion(form.id)}
              >
                <Layers2 />
              </Button>
        <Button
                variant="outline"
                size="sm"
                onClick={() => deleteQuestion(form.id)}
              >
                <Trash2 />
              </Button>
      </div>
      {/* Lista de opções */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="question" />
        <Input
          id="question"
          className="border-b border-gray-300 focus:outline-none focus:border-primary text-lg font-medium bg-transparent mb-5"
          value={form.text}
          onChange={(e) => updateQuestionText(form.id, e.target.value)}
          placeholder="Digite a pergunta..."
        />
        {form?.options?.map((option, index) => (
          <BuildOption
            key={option.id}
            option={option}
            formId={form.id}
            position={index + 1}
          />
        ))}
      </div>

      {/* Botões de ação */}
      <div className="flex flex-1 justify-center gap-2 py-5">
        <Button onClick={() => createOption(form.id)}>+</Button>
      </div>
    </div>
  );
}
