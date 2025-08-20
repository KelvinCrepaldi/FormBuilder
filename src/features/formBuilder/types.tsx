export type projectTypes = {
  id: string;
  title: string;
  description: string;
};

export type formLayoutTypes = "radio" | "checkbox";

export type formTypes = {
  id: string;
  question: string;
  position: number;
  type: formLayoutTypes;
  options: optionTypes[];
};

export type optionTypes = {
  id: string;
  label: string;
  value: string;
};
