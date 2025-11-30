import CheckboxQuestion from "./CheckboxQuestion";
import RadioQuestion from "./RadioQuestion";
import TextQuestion from "./TextQuestion";
import SelectQuestion from "./SelectQuestion";

export const QUESTION_TEMPLATES = {
  checkbox: CheckboxQuestion,
  radio: RadioQuestion,
  text: TextQuestion,
  select: SelectQuestion,
} as const;
export type QuestionTemplateTypes = keyof typeof QUESTION_TEMPLATES;