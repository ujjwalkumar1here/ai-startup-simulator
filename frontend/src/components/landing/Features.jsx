import { Brain, TrendingUp, ShieldCheck, Users2 } from "lucide-react";
const data = [[Brain, "AI Startup Analysis", "Get a detailed evaluation of market potential, revenue outlook, and growth trajectory in seconds."], [Users2, "AI Investor Interviews", "Practice a realistic Shark Tank / YC-style pitch interview with an AI investor panel."], [TrendingUp, "Growth Predictions", "Understand cash flow, revenue, and scaling potential before committing real resources."], [ShieldCheck, "Risk Assessment", "Identify strengths, weaknesses, and risks that could make or break your startup."]];
export default function Features() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Everything You Need to Validate Your Idea
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Built for founders who want data-driven answers, not guesswork.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.map(([Icon, title, description]) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-800/80"
            >
              <div className="mb-4 w-fit rounded-xl bg-primary-50 p-3 text-primary-600 dark:bg-slate-700 dark:text-primary-400">
                <Icon size={22} />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
