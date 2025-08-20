import { X } from "lucide-react";
import useBuilder from "../context/useBuilder";
import type { optionTypes } from "../types";
import { Button } from "@/components/ui/button";

type BuildOptionProps = {
  option: optionTypes;
  formId: string;
};

export default function BuildOption({ option, formId }: BuildOptionProps) {
  const { deleteOption, updateOptionLabel } = useBuilder();

  return (
    <div className="flex items-center justify-between border p-2 rounded bg-gray-50">
      {/* Label editável */}
      <input
        className="flex-1 bg-transparent border-none focus:outline-none"
        value={option.label}
        onChange={(e) => updateOptionLabel(formId, option.id, e.target.value)}
        placeholder="Digite a opção..."
      />

      {/* Botão remover */}
      <Button
      variant={"outline"}
        className="text-red-600"
        onClick={() => deleteOption(formId, option.id)}
      >
        <X/>
      </Button>
    </div>
  );
}
