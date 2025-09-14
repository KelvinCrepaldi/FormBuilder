import { X } from "lucide-react";
import useBuilder from "../context/useBuilder";
import type { optionTypes } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type BuildOptionProps = {
  option: optionTypes;
  formId: string;
  position: number;
};

export default function BuildOption({ option, formId, position }: BuildOptionProps) {
  const { deleteOption, updateOptionLabel } = useBuilder();

  return (
    <div className="flex items-center justify-between gap-2">
      {/* Label editável */}
      <Input
        value={option.label}
        onChange={(e) => updateOptionLabel(formId, option.id, e.target.value)}
        placeholder={ `Digite a ${position}ª opção...`}
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
