import { Link } from "react-router";

export function LandingFooter() {
  return (
    <footer className="flex w-full flex-col gap-6 border-t border-outline-variant/20 bg-surface px-8 py-8 md:flex-row md:items-center md:justify-between md:px-12">
      <div className="flex flex-col gap-1">
        <span className="font-headline text-lg font-black text-slate-900">
          The Editorial Form Architect
        </span>
        <p className="font-body text-xs text-slate-500">
          © {new Date().getFullYear()} Form Builder. Uso de demonstração.
        </p>
      </div>
      <div className="flex flex-wrap gap-6">
        <a
          href="https://github.com/KelvinCrepaldi/FormBuilder"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs text-slate-500 transition-colors hover:text-primary-container"
        >
          GitHub
        </a>
        <Link
          to="/dashboard"
          className="font-body text-xs text-slate-500 transition-colors hover:text-primary-container"
        >
          Dashboard
        </Link>
      </div>
    </footer>
  );
}
