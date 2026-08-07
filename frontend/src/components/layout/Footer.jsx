import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  if (isAuthPage) {
    return (
      <footer className="border-t border-slate-200 bg-white py-5 dark:border-slate-800 dark:bg-[#0F172A]">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} AI Startup Simulator. All rights reserved.</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0F172A]">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <Link to="/" className="transition-colors hover:text-primary-600 dark:hover:text-primary-400">
              Home
            </Link>
            <Link to="/login" className="transition-colors hover:text-primary-600 dark:hover:text-primary-400">
              Login
            </Link>
            <Link to="/signup" className="transition-colors hover:text-primary-600 dark:hover:text-primary-400">
              Get Started
            </Link>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} AI Startup Simulator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
