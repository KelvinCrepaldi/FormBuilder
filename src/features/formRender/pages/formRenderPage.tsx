import { QUESTION_TEMPLATES } from "@/components/templates";
import type { DatabaseProjectTypes } from "@/database/dexie";
import useDB from "@/hooks/useDB";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function FormRenderPage() {
  const { getProjectById } = useDB();
  const { projectId } = useParams();
  
  const [project, setProject] = useState<null | DatabaseProjectTypes>(null);
  const [step, setStep] = useState(0);

  const [answers, setAnswers] = useState<Record<string, any>>({});

  useEffect(() => {
    if (projectId) {
      getProjectById(projectId).then((data) => {
        if (data) setProject(data);
      });
    }
  }, [projectId]);

  if (!project) return <div>Carregando...</div>;

  const { layout } = project;

  const totalSteps = project.questions.length;
  const progress = ((step + 1) / totalSteps) * 100;

  const currentQuestion =
    layout.layoutMode === "step_by_step"
      ? project.questions[step]
      : null;

  const layoutStyle: React.CSSProperties = {
    fontFamily: layout.font,
    fontSize: `${layout.fontSize}px`,
    backgroundColor: layout.backgroundColor,
    color: layout.primaryColor,
    minHeight: "100vh",
  };

  const handleNextStep = () => {
    setStep((s) => s + 1);
  };

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  // ---------- TELA DE OBRIGADO ----------
  if (layout.layoutMode === "step_by_step" && step >= totalSteps) {
    return (
      <section style={layoutStyle} className="py-20 flex flex-col items-center gap-10">
        <h1 className="text-3xl font-bold">Obrigado por participar!</h1>
        <p className="text-primary/70">Aqui estão suas respostas:</p>

        <div className="w-full max-w-xl flex flex-col gap-6 bg-white/10 p-6 rounded-lg shadow">
          {project.questions.map((q) => (
            <div key={q.id}>
              <div className="font-semibold">{q.text}</div>
              <div className="text-primary/80">
                {JSON.stringify(answers[q.id])}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ---------- RENDER NORMAL ----------
  return (
    <section style={layoutStyle} className="py-10 flex flex-col items-center gap-14">

      <header className="flex flex-col items-center gap-1">
        <h1 className="text-3xl font-semibold">{project.title}</h1>
        <p className="text-primary/60">{project.description}</p>
      </header>

      {layout.showProgressBar && (
        <div className="w-full max-w-xl">
          <div className="w-full h-2 rounded bg-primary/20 overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-primary/50 mt-1 text-center">
            {step + 1} / {totalSteps}
          </div>
        </div>
      )}

      <div className="w-full max-w-xl flex flex-col gap-10">
        {layout.layoutMode === "single_page" &&
          project.questions.map((q) => {
            const Template = QUESTION_TEMPLATES[q.type];
            if (!Template) {
              return (
                <div key={q.id} className="text-red-500">
                  Tipo não suportado: {q.type}
                </div>
              );
            }
            return (
              <Template
                key={q.id}
                formData={q}
                nextFn={handleNextStep}
                onAnswer={handleAnswer}
              />
            );
          })}

        {layout.layoutMode === "step_by_step" && currentQuestion && (() => {
          const Template = QUESTION_TEMPLATES[currentQuestion.type];
          if (!Template) {
            return (
              <div className="text-red-500">
                Tipo não suportado: {currentQuestion.type}
              </div>
            );
          }
          return (
            <Template
              formData={currentQuestion}
              nextFn={handleNextStep}
              onAnswer={handleAnswer}
            />
          );
        })()}
      </div>
    </section>
  );
}
