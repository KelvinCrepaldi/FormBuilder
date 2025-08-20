import { Button } from "@/components/ui/button";
import useBuilder from "../context/useBuilder";
import BuildForm from "../components/buildForm";
export default function FormBuilderPage() {
  const { project, forms, createForm, active, handleActive } = useBuilder();

  return (
    <div className="flex ">
      <div className="w-[300px] bg-black/10 h-screen flex flex-col">
        <Button onClick={() => createForm("checkbox")}>Checkbox</Button>
        <Button onClick={() => createForm("radio")}>radio</Button>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 p-1">
        <div className="w-full p-2 flex justify-between gap-2">
          <div className="flex  items-end gap-5">
            <div className="text-2xl">{project.title}</div>
            <div>{project.description}</div>
          </div>{" "}
          <Button
            className="bg-green-800 rounded"
            onClick={() => console.log(forms)}
          >
            Play test
          </Button>
        </div>
        <div className="flex flex-1 w-full">
          <div className="flex-1 flex w-full justify-center">
            {forms
              .filter((form) => form.id === active)
              .map((form) => (
                <BuildForm form={form} />
              ))}
          </div>
        </div>

        <div className="bg-black/5 w-full p-2 flex gap-2 min-h-[120px]">
          {forms.map((item) => (
            <div
              onClick={() => handleActive(item.id)}
              className={`relative not-checked:flex flex-col items-center transition-all justify-center w-[100px] h-[100px] border rounded p-1 shadow-xl ${
                active === item.id && "border-primary bg-white/20 scale-105"
              }`}
            >
              <div className="absolute top-1 left-2 opacity-45">
                {item.position}
              </div>
              <div>{item.question}</div>
              <div className="absolute bottom-1 right-2 opacity-45 text-sm">
                {item.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
