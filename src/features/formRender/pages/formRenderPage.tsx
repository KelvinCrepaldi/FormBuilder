import CheckboxTemplate from "@/components/formTemplates/checkboxTemplate";
import type { DatabaseProjectTypes } from "@/database/dexie";
import useDB from "@/hooks/useDB";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function FormRenderPage() {
  const { getProjectById } = useDB();
  const { projectId } = useParams();
  const [project, setProject] = useState<null | DatabaseProjectTypes>(null);

  useEffect(() => {
    if (projectId) {
      const getProject = async () => {
        const data = await getProjectById(projectId);
        data && setProject(data);
      };
      getProject();
    }
  }, [projectId]);

  return (
    <section className="flex flex-col gap-10 py-10  items-center bg-black/5 min-h-screen">
      <div className="flex items-center flex-col">
        <div className="typhography-h1">{project?.title}</div>
        <div className="typhography-h2 text-primary/60">{project?.description}</div>
      </div>
      {project?.forms.map((form) => (
        <CheckboxTemplate formData={form} />
      ))}
    </section>
  );
}
