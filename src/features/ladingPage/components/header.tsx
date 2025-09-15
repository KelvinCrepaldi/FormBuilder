import { Link, useNavigate } from "react-router";
import logo from "@/assets/logo.svg";
import { Github } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="flex w-full items-center justify-center p-5">
      <div className="flex justify-between w-full px-5 max-w-[1400px]">
        <div className="flex gap-10">
          <img src={logo} className="w-7" />
          <nav className="flex gap-5 text-primary/70">
            <button
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-primary"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="cursor-pointer hover:text-primary"
            >
              Demonstração
            </button>
            <button
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-primary"
            >
              Sobre
            </button>
            <button
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-primary"
            >
              Contato
            </button>
          </nav>
        </div>

        <div>
          <Link
            to={"https://github.com/KelvinCrepaldi/FormBuilder"}
            rel="noopener noreferrer"
            target="_blank"
            className="cursor-pointer hover:text-primary/80"
          >
            <Github />
          </Link>
        </div>
      </div>
    </header>
  );
}
