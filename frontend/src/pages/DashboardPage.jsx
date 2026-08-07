import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock3, Lightbulb, Plus, Sparkles, Target } from "lucide-react";
import StatCard from "../components/dashboard/StatCard.jsx";
import Skeleton from "../components/ui/Skeleton.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import ErrorState from "../components/ui/ErrorState.jsx";
import Badge from "../components/ui/Badge.jsx";
import useAuth from "../hooks/useAuth.js";
import simulationService from "../services/simulationService.js";

export default function DashboardPage() {
  const { user } = useAuth();
  const [simulations, setSimulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async () => { setLoading(true); setError(null); try { setSimulations((await simulationService.getSimulations()).data || []); } catch (e) { setError(!e?.response ? "network" : e.response.status === 401 ? "unauthorized" : "default"); } finally { setLoading(false); } };
  useEffect(() => { fetchData(); }, []);
  if (loading) return <div className="space-y-6"><Skeleton className="h-48 w-full" /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><Skeleton className="h-32" /><Skeleton className="h-32" /><Skeleton className="h-32" /><Skeleton className="h-32" /></div><Skeleton className="h-72 w-full" /></div>;
  if (error) return <ErrorState type={error} onRetry={fetchData} />;
  const scores = simulations.map((s) => s.analysis?.startupScore || 0);
  const average = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  const latest = simulations[0];
  return (
    <div className="space-y-7">
      {/* Welcome Banner */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-slate-200 bg-white px-6 py-7 shadow-card sm:px-8 sm:py-8 dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-primary-600">
              <Sparkles size={14} />Founder workspace
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
              Welcome back, {user?.name?.split(" ")[0] || "Founder"}.
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Review your startup intelligence, explore your latest score, or put your next idea through the simulator.
            </p>
          </div>
          <Link
            to="/simulations/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-primary-700"
          >
            <Plus size={17} />Create startup simulation
          </Link>
        </div>
      </motion.section>

      {/* Stat Cards */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Sparkles} label="Total simulations" value={simulations.length} />
        <StatCard icon={Target} label="Average AI score" value={average} decimals={1} suffix="/100" tone="green" />
        <StatCard icon={Lightbulb} label="Ideas evaluated" value={simulations.length} tone="primary" />
        <StatCard icon={Clock3} label="Latest simulation" value={latest ? 1 : 0} suffix={latest ? " active" : ""} tone="amber" />
      </section>

      {/* Recent Simulations */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-6 dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">Recent simulations</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your latest AI startup evaluations.</p>
          </div>
          <Link to="/simulations" className="hidden items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 sm:inline-flex">
            View all <ArrowUpRight size={15} />
          </Link>
        </div>
        {simulations.length ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {simulations.slice(0, 5).map((simulation) => (
              <Link
                key={simulation._id}
                to={`/simulations/${simulation._id}`}
                className="group flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{simulation.startupName}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar size={12} />{new Date(simulation.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone="blue">{simulation.analysis?.startupScore ?? 0}/100</Badge>
                  <ArrowUpRight size={17} className="text-slate-400 transition group-hover:text-primary-600" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Sparkles}
            title="Your workspace is ready"
            description="Run your first startup simulation to receive a structured AI evaluation."
            action={
              <Link to="/simulations/new" className="rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700">
                Create your first simulation
              </Link>
            }
          />
        )}
      </section>
    </div>
  );
}
