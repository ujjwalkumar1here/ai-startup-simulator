import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter.jsx";

const tones = {
  primary: "bg-primary-50 text-primary-600",
  green: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  purple: "bg-violet-50 text-violet-600",
};

export default function StatCard({ icon: Icon, label, value, suffix = "", decimals = 0, tone = "primary" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <div className={`rounded-xl p-2.5 ${tones[tone]}`}>
          <Icon size={18} />
        </div>
      </div>
      <p className="mt-3 text-2xl font-bold">
        <AnimatedCounter value={value} decimals={decimals} />
        {suffix}
      </p>
    </motion.div>
  );
}
