import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, LayoutDashboard } from "lucide-react";
import useAuth from "../../hooks/useAuth.js";

export default function Hero() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="border-b border-slate-100 bg-white px-4 pb-24 pt-24 text-center dark:border-slate-800 dark:bg-slate-900 sm:pt-32">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-2 text-sm font-semibold text-[#1D4ED8] transition-colors duration-200 hover:bg-[#DBEAFE] dark:border-[rgba(96,165,250,0.35)] dark:bg-[rgba(37,99,235,0.15)] dark:text-[#DBEAFE] dark:hover:bg-[rgba(37,99,235,0.24)]">
          <Sparkles size={15} className="text-[#2563EB] dark:text-[#60A5FA]" />Powered by Google Gemini AI
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
          Validate your startup idea<span className="block text-primary-600">before you build it.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Simulate your startup with AI, get venture-capital grade analysis, and pitch to an AI investor panel — before you write a single line of code.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-primary-700"
            >
              <LayoutDashboard size={17} /> Go to Dashboard <ArrowRight size={16} />
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-primary-700"
              >
                Start simulating <ArrowRight size={16} />
              </Link>
              <Link
                to="/login"
                className="rounded-lg border border-[#CBD5E1] bg-white px-6 py-3 text-sm font-semibold text-[#334155] transition hover:bg-[#F8FAFC] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                I already have an account
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
