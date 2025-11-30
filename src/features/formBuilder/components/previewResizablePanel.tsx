import { ResizablePanel } from "@/components/ui/resizable";
import useQuestions from "../hooks/useQuestions";
import useConfiguration from "../hooks/useConfiguration";
import { QUESTION_TEMPLATES } from "@/components/templates";
import type { questionTypes } from "../types";

export default function PreviewResizablePanel() {
  const { active, questions } = useQuestions();
  const { configuration } = useConfiguration();

  const layout = configuration.layout;

  const activeQuestion = questions.find((q) => q.id === active);

  return (
    <ResizablePanel
      className="inset-shadow-sm p-5 flex items-center justify-center bg-sidebar relative"
      style={{
        fontFamily: layout.font,
        fontSize: layout.fontSize,
        backgroundColor: layout.backgroundColor,
        color: layout.primaryColor,
      }}
    >
      <div className="absolute top-1 left-0 p-4 text-primary/40">
        Pré-visualização
      </div>

      {/* BARRA DE PROGRESSO */}
      {layout.showProgressBar && (
        <div className="absolute top-0 left-0 w-full h-2 bg-gray-200">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: "40%" }}
          />
        </div>
      )}

      {/* COMPONENTE PRINCIPAL */}
      {activeQuestion ? (
        <QuestionRenderer form={activeQuestion} />
      ) : (
        <div className="text-primary/30">Nenhuma pergunta selecionada</div>
      )}
    </ResizablePanel>
  );
}

export function QuestionRenderer({ form }: { form: questionTypes }) {
  const Component = QUESTION_TEMPLATES[form.type];

  if (!Component) {
    return <div>Tipo desconhecido: {form.type}</div>;
  }

  return <Component formData={form} />;
}
