export type projectTypes = {
  ref: string;
  title: string;
  description: string;
};

export type formLayoutTypes = "radio" | "checkbox" | "text" | "select";

export type questionTypes = {
  id: string;
  text: string;
  position: number;
  type: formLayoutTypes;
  options?: optionTypes[];
  placeholder?: string;
  description?: string;
};

export type optionTypes = {
  id: string;
  label: string;
  value: string;
};
