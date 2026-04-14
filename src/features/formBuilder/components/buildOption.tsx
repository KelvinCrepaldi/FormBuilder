import { X } from "lucide-react";
import type { optionTypes } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useQuestions from "../hooks/useQuestions";

type BuildOptionProps = {
  option: optionTypes;
  formId: string;
  position: number;
};

export default function BuildOption({
  option,
  formId,
  position,
}: BuildOptionProps) {
  const { deleteOption, updateOptionText } = useQuestions();

  return (
    <div className="flex items-center justify-between gap-1">
      <Input
        value={option.label}
        onChange={(e) => updateOptionText(formId, option.id, e.target.value)}
        placeholder={`${position}ª opção`}
        className="h-8 rounded-md text-sm"
      />

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 shrink-0 text-red-600"
        onClick={() => deleteOption(formId, option.id)}
      >
        <X className="size-3.5" />
      </Button>
    </div>
  );
}
