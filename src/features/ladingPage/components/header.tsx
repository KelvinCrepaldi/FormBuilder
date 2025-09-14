import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="flex w-full items-center justify-center border-border-b p-5">
      <div className="flex justify-between w-full px-5 max-w-[1400px]">
        <div className="flex gap-10">
          <h1 className="font-bold">Form Builder Project</h1>
          <nav className="flex gap-5 text-primary/70">
            <button onClick={() => navigate("/form/demo")} className="cursor-pointer hover:text-primary">Demo</button>
            <button onClick={() => navigate("/form/builder/questions")} className="cursor-pointer hover:text-primary">
              Builder
            </button>
            <button onClick={() => navigate("/dashboard")} className="cursor-pointer hover:text-primary">Dashboard</button>
          </nav>
        </div>

        <div>x</div>
      </div>
    </header>
  );
}
