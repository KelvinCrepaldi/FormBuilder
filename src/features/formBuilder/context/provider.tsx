import { createContext, useState, type ReactNode } from "react";
import type { formLayoutTypes, formTypes, projectTypes } from "../types";
import { useNavigate } from "react-router";
import { db } from "@/database/dexie";

type BuilderContextTypes = {
  forms: formTypes[];
  createForm: (type: formLayoutTypes) => void;
  deleteForm: (form: formTypes) => void;
  active: string | null;
  handleActive: (id: string) => void;
  project: projectTypes;
  createOption: (formId: string) => void;
  deleteOption: (formId: string, optionId: string) => void;
  updateFormQuestion: (formId: string, newQuestion: string) => void;
  updateOptionLabel: (
    formId: string,
    optionId: string,
    newLabel: string
  ) => void;
  getProject: () => { project: projectTypes; forms: formTypes[] };
  playProject: () => void;
  saveProject: () => void;
};

export const BuilderContext = createContext<BuilderContextTypes | null>(null);

export default function BuilderProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [forms, setForms] = useState<formTypes[]>([]);
  const [project] = useState<projectTypes>({
    ref: crypto.randomUUID(),
    description: "description of project",
    title: "Project title",
  });
  const [active, setActive] = useState<null | string>(null);

  const handleActive = (id: string) => {
    setActive(id);
  };

  const createForm = (type: formLayoutTypes) => {
    const newId = crypto.randomUUID();
    setForms((prev) => [
      ...prev,
      {
        id: newId,
        question: ``,
        options: [{ id: crypto.randomUUID(), label: "", value: "" }],
        position: prev.length,
        type,
      },
    ]);
    setActive(newId);
  };

  const deleteForm = (form: formTypes) => {
    setForms((prev) =>
      prev
        .filter((item) => item.id !== form.id)
        .map((f, index) => ({ ...f, position: index }))
    );
  };

  const createOption = (formId: string) => {
    setForms((prev) =>
      prev.map((form) =>
        form.id === formId
          ? {
              ...form,
              options: [
                ...(form.options || []),
                { id: crypto.randomUUID(), label: "", value: "" }
              ],
            }
          : form
      )
    );
  };

  const deleteOption = (formId: string, optionId: string) => {
    setForms((prev) =>
      prev.map((form) =>
        form.id === formId
          ? {
              ...form,
              options: form.options?.filter((opt) => opt.id !== optionId),
            }
          : form
      )
    );
  };

  const updateFormQuestion = (formId: string, newQuestion: string) => {
    setForms((prev) =>
      prev.map((form) =>
        form.id === formId ? { ...form, question: newQuestion } : form
      )
    );
  };

  const updateOptionLabel = (
    formId: string,
    optionId: string,
    newLabel: string
  ) => {
    setForms((prev) =>
      prev.map((form) =>
        form.id === formId
          ? {
              ...form,
              options: form.options?.map((opt) =>
                opt.id === optionId ? { ...opt, label: newLabel } : opt
              ),
            }
          : form
      )
    );
  };

  const playProject = () => {
    navigate("/form/demo");
  };

  const saveProject = async () => {
    await db.DBproject.add({ ...project, forms });
    navigate("/dashboard");
  };

  const getProject = (): { project: projectTypes; forms: formTypes[] } => {
    return { project, forms };
  };

  return (
    <BuilderContext.Provider
      value={{
        forms,
        createForm,
        active,
        handleActive,
        project,
        deleteForm,
        createOption,
        deleteOption,
        updateFormQuestion,
        updateOptionLabel,
        getProject,
        playProject,
        saveProject,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}
