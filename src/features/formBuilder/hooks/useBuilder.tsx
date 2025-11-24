import { db } from "@/database/dexie";
import useConfiguration from "./useConfiguration";
import useQuestions from "./useQuestions";

export default function useBuilder() {
  const { configuration } = useConfiguration();
  const { questions } = useQuestions();

  const saveProject = async () => {
    await db.DBproject.add({
      ...configuration,
      questions,
    });
  };

  return { saveProject };
}
