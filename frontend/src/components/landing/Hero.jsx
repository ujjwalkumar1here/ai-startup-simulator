import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-primary-50 via-white to-white px-4 pb-20 pt-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
          <Sparkles size={14} />
          Powered by Google Gemini AI
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          Validate Your Startup Idea
          <span className="block text-primary-600">Before You Build It</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Simulate your startup with AI, get venture-capital grade analysis, and pitch to an
          AI investor panel — before you write a single line of code.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-primary-700"
          >
            Start Simulating Free <ArrowRight size={16} />
          </Link>
          <Link
            to="/login"
            className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            I Already Have an Account
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
