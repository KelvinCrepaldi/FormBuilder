import { db } from "@/database/dexie";
import useConfiguration from "./useConfiguration";
import useQuestions from "./useQuestions";

export default function useBuilder() {
  const { configurationState } = useConfiguration();
  const { questionsState } = useQuestions();

  const saveProject = async () => {
    await db.DBproject.add({
      ...configurationState,
      questions: questionsState,
    });
  };

  return { saveProject };
}
