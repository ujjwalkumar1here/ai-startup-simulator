import { BarChart3, Target, Wallet, TrendingUp, Sparkles, Activity } from "lucide-react";

const metrics = [
  {
    icon: Target,
    label: "Startup Score",
    value: "88 / 100",
    badge: "Strong Viability",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800"
  },
  {
    icon: BarChart3,
    label: "Market Potential",
    value: "High Demand",
    badge: "Analyzed",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800"
  },
  {
    icon: Wallet,
    label: "Cash Flow Outlook",
    value: "Positive ROI",
    badge: "Projected",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800"
  },
  {
    icon: TrendingUp,
    label: "Growth Prediction",
    value: "3.5x YoY",
    badge: "Forecasted",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800"
  }
];

export default function AISimulationSection() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50/80 px-3.5 py-1 text-xs font-semibold text-primary-700 dark:border-primary-800 dark:bg-primary-950/40 dark:text-primary-300 mb-4">
            <Sparkles size={14} />
            <span>AI Simulation Engine</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Comprehensive Analysis in Seconds
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
            Submit your startup idea and let our AI mentor act as an experienced venture capitalist — scoring your startup, predicting revenue and growth, and surfacing risks you might have missed.
          </p>
        </div>

        {/* Mock Dashboard Frame with Glassmorphic Effect */}
        <div className="relative rounded-3xl border border-slate-200/80 bg-white/80 p-5 sm:p-7 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          {/* Decorative ambient gradient backdrop glow */}
          <div className="absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-r from-primary-500/10 via-purple-500/10 to-blue-500/10 blur-xl dark:from-primary-500/20 dark:to-blue-500/20" />

          {/* Window / Dashboard Frame Top Bar */}
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-rose-400/80" />
              <div className="h-3 w-3 rounded-full bg-amber-400/80" />
              <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
              <span className="ml-2 text-xs font-medium text-slate-400 dark:text-slate-500">
                Simulation Engine v2.0 • Live Preview
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Activity size={12} className="animate-pulse" />
              <span>Active</span>
            </div>
          </div>

          {/* 4 Feature / Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metrics.map(({ icon: Icon, label, value, badge, badgeColor }) => (
              <div
                key={label}
                className="group rounded-2xl border border-slate-100 bg-white/90 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-800/80 dark:hover:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white dark:bg-slate-700 dark:text-primary-400">
                    <Icon size={20} />
                  </div>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${badgeColor}`}>
                    {badge}
                  </span>
                </div>
                <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
                <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
