import { NavLink, useNavigate } from "react-router-dom";
import { History, LayoutDashboard, ListChecks, LogOut, Sparkles, UserCircle, Users, X } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth.js";

const navItems = [
  ["Dashboard", "/dashboard", LayoutDashboard],
  ["New Simulation", "/simulations/new", Sparkles],
  ["My Simulations", "/simulations", ListChecks],
  ["Investor Room", "/investor-room", Users],
  ["Investor History", "/investor-history", History],
  ["Profile", "/profile", UserCircle],
];

export default function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Failed to logout");
    }
  };

  return <>
    {isOpen && <div onClick={onClose} className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden" />}
    <aside className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform dark:border-slate-700 dark:bg-slate-900 lg:sticky lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-700">
        <div className="flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-xs font-bold text-white">AI</div><span className="font-bold tracking-tight text-slate-900 dark:text-white">Simulator</span></div>
        <button onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"><X size={18} /></button>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-5">
        {navItems.map(([label, path, Icon]) => <NavLink key={path} to={path} end onClick={onClose} className={({ isActive }) => `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${isActive ? "bg-[#2563EB] font-semibold text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)]" : "bg-transparent text-[#475569] hover:bg-[#F1F5F9] hover:text-[#111827] dark:text-[#CBD5E1] dark:hover:bg-[rgba(59,130,246,0.12)] dark:hover:text-white"}`}>
          {({ isActive }) => <><Icon size={17} className={isActive ? "shrink-0 text-white" : "shrink-0 text-[#64748B] transition-colors duration-200 group-hover:text-[#111827] dark:text-[#94A3B8] dark:group-hover:text-white"} />{label}</>}
        </NavLink>)}
      </nav>
      <div className="border-t border-slate-200 p-3 dark:border-slate-700"><button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"><LogOut size={17} />Logout</button></div>
    </aside>
  </>;
}
