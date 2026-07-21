import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-xs font-bold text-white">
            AI
          </div>
          <span className="text-sm font-semibold">AI Startup Simulator</span>
        </div>
        <div className="flex gap-6 text-sm text-slate-500">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Get Started</Link>
        </div>
      </div>
      <p className="pb-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} AI Startup Simulator. All rights reserved.
      </p>
    </footer>
  );
}
