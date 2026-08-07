import { useContext } from "react";
import { Moon, Sun } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext.jsx";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  return <button type="button" onClick={toggleTheme} aria-label={`Switch to ${isDark ? "light" : "dark"} mode`} className="inline-flex rounded-xl border border-[#CBD5E1] bg-white p-2.5 text-[#334155] shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-colors duration-200 hover:border-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:border-[#334155] dark:bg-[#1E293B] dark:text-[#E2E8F0] dark:hover:bg-[#334155] dark:hover:text-white dark:focus-visible:ring-offset-slate-900">{isDark ? <Sun size={18} /> : <Moon size={18} />}</button>;
}
