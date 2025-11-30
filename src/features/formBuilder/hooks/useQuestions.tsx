import { useContext } from "react";
import { BuilderContext } from "../context/builderProvider";
import type { formLayoutTypes } from "../types";

export default function useQuestions() {
  const ctx = useContext(BuilderContext);

    if (!ctx) {
    throw new Error("useQuestions deve ser usado dentro de <BuilderProvider>");
  }

  const { rootState, rootDispatch, active, setActive } = ctx;

  const createQuestion = (type: formLayoutTypes) => {
    const questionId = crypto.randomUUID();
    rootDispatch({
      type: "create_question",
      formType: type,
      id: questionId,
    });
    setActive(questionId);
  };

  const duplicateQuestion = (questionId: string) => {
    rootDispatch({ type: "duplicate_question", questionId });
  }

  const deleteQuestion = (questionId: string) => {
    rootDispatch({ type: "delete_question", questionId });
  };

  const createOption = (questionId: string) => {
    rootDispatch({ type: "create_option", questionId });
  };

  const deleteOption = (questionId: string, optionId: string) => {
    rootDispatch({ type: "delete_option", questionId, optionId });
  };

  const updateQuestionText = (questionId: string, text: string) => {
    rootDispatch({ type: "update_text", questionId, text });
  };

  const updateOptionText = (
    questionId: string,
    optionId: string,
    label: string
  ) => {
    rootDispatch({
      type: "update_option_label",
      questionId,
      optionId,
      label,
    });
  };

  return {
    questions: rootState.questions,
    active,
    setActive,
    createQuestion,
    duplicateQuestion,
    deleteQuestion,
    updateQuestionText,
    createOption,
    deleteOption,
    updateOptionText,
  };
}
