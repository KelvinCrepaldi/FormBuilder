import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="text-white w-full h-[40px] bg-black flex justify-between items-center px-10">
        <h1>Form Builder Project</h1>
        <nav className="flex gap-5">
          <button onClick={() => navigate("/form/demo")}>Demo</button>
          <button onClick={() => navigate("/form/builder")}>Builder</button>
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
              </nav>
              <div>
                  Login
              </div>
  
    </header>
  );
}
