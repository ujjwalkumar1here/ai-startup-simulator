import { Link } from "react-router-dom";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import useAuth from "../../hooks/useAuth.js";

export default function CTA() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="px-4 my-16">
      <div className="relative overflow-hidden mx-auto max-w-4xl rounded-3xl bg-primary-600 px-6 py-14 text-center shadow-2xl dark:bg-primary-700">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-black/10 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {isAuthenticated ? "Ready to Continue Your Simulation?" : "Ready to Test Your Startup Idea?"}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-100 text-base sm:text-lg">
            Join founders using AI to validate ideas before investing months of time and money.
          </p>
          <Link
            to={isAuthenticated ? "/dashboard" : "/signup"}
            className="mt-8 inline-flex items-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-base font-bold text-slate-900 shadow-xl hover:bg-white hover:scale-105 active:scale-100 transition-all duration-200"
          >
            {isAuthenticated ? (
              <>
                <LayoutDashboard size={18} className="text-slate-900" /> Go to Dashboard <ArrowRight size={18} className="text-slate-900" />
              </>
            ) : (
              <>
                Get Started for Free <ArrowRight size={18} className="text-slate-900" />
              </>
            )}
          </Link>
        </div>
      </div>
    </section>
  );
}
