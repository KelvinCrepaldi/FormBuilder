import { createContext, useState, type ReactNode } from "react";
import type { formLayoutTypes, formTypes, projectTypes } from "../types";
import { useNavigate } from "react-router";
import { db } from "@/database/dexie";

type BuilderContextTypes = {
  forms: formTypes[];
  active: string | null;
  project: projectTypes;
  createForm: (type: formLayoutTypes) => void;
  deleteForm: (form: formTypes) => void;
  handleActive: (id: string) => void;
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
  cleanProject: () => void;
};

export const BuilderContext = createContext<BuilderContextTypes | null>(null);

const newProjectForms: formTypes[] = [];

export default function BuilderProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [forms, setForms] = useState<formTypes[]>(newProjectForms);
  const [project, setProject] = useState<projectTypes>({
    ref: crypto.randomUUID(),
    description: "Description...",
    title: "New project",
  });
  const [active, setActive] = useState<null | string>(null);

  const handleActive = (id: string) => {
    setActive(id);
  };

  const cleanProject = () => {
    setForms(newProjectForms);
    setProject({
      ref: crypto.randomUUID(),
      description: "Description...",
      title: "New project",
    });
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
                { id: crypto.randomUUID(), label: "", value: "" },
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
    cleanProject();
  };

  const getProject = (): { project: projectTypes; forms: formTypes[] } => {
    return { project, forms };
  };

  return (
    <BuilderContext.Provider
      value={{
        forms,
        active,
        project,
        createForm,
        handleActive,
        deleteForm,
        createOption,
        deleteOption,
        updateFormQuestion,
        updateOptionLabel,
        getProject,
        playProject,
        saveProject,
        cleanProject,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}
