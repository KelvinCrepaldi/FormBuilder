import { Button } from "@/components/ui/button";
import useBuilder from "../context/useBuilder";

export default function BuildTools() {
  const { createForm } = useBuilder();
  return (
    <div className="w-full  flex flex-col gap-1 p-2 border-t">
      <div className="font-bold">Adicionar novo:</div>
      <div className="  flex gap-4">
        <Button onClick={() => createForm("checkbox")} className="w-[130px]" >+ Checkbox</Button>
        <Button onClick={() => createForm("radio")} className="w-[130px]">+ radio</Button>
      </div>
    </div>
  );
}
