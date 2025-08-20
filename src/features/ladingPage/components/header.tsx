import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="flex bg-black w-full h-[40px] text-accent items-center justify-center">
      <div className="flex justify-between max-w-[1080px] w-full">
        <h1>Form Builder Project</h1>
        <nav className="flex gap-5">
          <button onClick={() => navigate("/form/demo")}>Demo</button>
          <button onClick={() => navigate("/form/builder")}>Builder</button>
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        </nav>
        <div>Login</div>
      </div>
    </header>
  );
}
