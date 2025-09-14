import { Button } from "@/components/ui/button";
import useBuilder from "../context/useBuilder";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function BuildHeader() {
  const { project, getProject, saveProject } = useBuilder();

  return (
    <header className="w-full flex  justify-between items-center border-b">
      <div className="flex gap-2">
        <SidebarTrigger />
        <div className="">
          <input className="typhography-h2" value={project.title} />
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          className="bg-green-800 rounded"
          onClick={() => console.log(getProject())}
        >
          Play test
        </Button>
        <Button className="bg-green-800 rounded" onClick={saveProject}>
          Save Project
        </Button>
      </div>
    </header>
  );
}
