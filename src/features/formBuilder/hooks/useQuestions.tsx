import { useContext } from "react";
import { BuilderContext } from "../context/builderProvider";
import type { formLayoutTypes } from "../types";

export default function useQuestions() {
  const { rootState, rootDispatch, setActive, active } = useContext(BuilderContext);

  const createQuestion = (type: formLayoutTypes) => {
    const questionId = crypto.randomUUID();
    rootDispatch({
      type: "create_question",
      formType: type,
      id: questionId,
    });
    setActive(questionId);
  };

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
    deleteQuestion,
    updateQuestionText,
    createOption,
    deleteOption,
    updateOptionText,
  };
}
