import { useContext } from "react";
import { BuilderContext } from "../context/builderProvider";
import type { formLayoutTypes } from "../types";

export default function useQuestions() {
  const {
    questionsDispatch,
    questionsState: questions,
    handleSetActive,
    active,
  } = useContext(BuilderContext);

  const createQuestion = (type: formLayoutTypes) => {
    const questionId = crypto.randomUUID();
    questionsDispatch({
      type: "create_question",
      formType: type,
      id: questionId,
    });
    handleSetActive(questionId);
  };

  const deleteQuestion = (questionId: string) => {
    questionsDispatch({ type: "delete_question", questionId });
  };

  const createOption = (questionId: string) => {
    questionsDispatch({ type: "create_option", questionId });
  };

  const deleteOption = (questionId: string, optionId: string) => {
    questionsDispatch({ type: "delete_option", questionId, optionId });
  };

  const updateQuestionText = (questionId: string, text: string) => {
    questionsDispatch({ type: "update_text", questionId, text });
  };

  const updateOptionText = (
    questionId: string,
    optionId: string,
    label: string
  ) => {
    questionsDispatch({
      type: "update_option_label",
      questionId,
      optionId,
      label,
    });
  };

  return {
    questions,
    active,
    handleSetActive,
    createQuestion,
    deleteQuestion,
    updateQuestionText,
    createOption,
    deleteOption,
    updateOptionText,
  };
}
