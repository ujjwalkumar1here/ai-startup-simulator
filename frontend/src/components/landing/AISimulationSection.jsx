import { BarChart3, Target, Wallet, TrendingUp } from "lucide-react";

const metrics = [
  [Target, "Startup Score", "0-100"],
  [BarChart3, "Market Potential", "Analyzed"],
  [Wallet, "Cash Flow Outlook", "Projected"],
  [TrendingUp, "Growth Prediction", "Forecasted"],
];

export default function AISimulationSection() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            AI Simulation Engine
          </h2>
          <p className="mt-4 text-slate-600">
            Submit your startup idea and let our AI mentor act as an experienced venture
            capitalist — scoring your startup, predicting revenue and growth, and surfacing
            risks you might have missed.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map(([Icon, label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card"
            >
              <Icon size={20} className="text-primary-600" />
              <p className="mt-3 text-sm text-slate-500">{label}</p>
              <p className="font-bold">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
