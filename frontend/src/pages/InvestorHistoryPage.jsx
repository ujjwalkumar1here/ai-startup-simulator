import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { History, Users, Calendar, Trophy, ArrowRight, Sparkles } from "lucide-react";
import Badge from "../components/ui/Badge.jsx";
import Skeleton from "../components/ui/Skeleton.jsx";
import ErrorState from "../components/ui/ErrorState.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import investorService from "../services/investorService.js";

const scoreTone = (s) => (s >= 75 ? "green" : s >= 50 ? "yellow" : "red");
const decisionTone = (d) =>
  d === "Fund" ? "green" : d === "Do Not Fund" ? "red" : "yellow";

export default function InvestorHistoryPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await investorService.getHistory();
      setSessions(res.data || []);
    } catch (e) {
      setError(
        !e?.response ? "network" : e.response.status === 401 ? "unauthorized" : "default"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <ErrorState type={error} onRetry={fetchHistory} />;

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
            <History size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Investor History</h1>
            <p className="text-sm text-slate-500">
              Review all your past investor sessions and verdicts.
            </p>
          </div>
        </div>
        <Link
          to="/investor-room"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          <Users size={16} />
          New Session
        </Link>
      </div>

      {sessions.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="No investor sessions yet"
          description="Enter the Investor Room to pitch your startup to an AI investor panel."
          action={
            <Link
              to="/investor-room"
              className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Enter Investor Room
            </Link>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session, idx) => {
            const startupName =
              session.simulation?.startupName || "Unknown Startup";
            const industry = session.simulation?.industry || "—";
            const isCompleted = session.status === "completed";
            const date = new Date(session.createdAt).toLocaleDateString(
              "en-US",
              { day: "numeric", month: "short", year: "numeric" }
            );

            return (
              <motion.div
                key={session._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{startupName}</h3>
                    <p className="mt-1 text-sm text-slate-500">{industry}</p>
                  </div>
                  <Badge tone={isCompleted ? "green" : "yellow"}>
                    {isCompleted ? "Completed" : "In Progress"}
                  </Badge>
                </div>

                {isCompleted && session.overallScore !== null && (
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <Trophy size={14} className="text-amber-500" />
                      <span className="text-sm font-semibold">
                        {session.overallScore}/100
                      </span>
                    </div>
                    {session.decision && (
                      <Badge tone={decisionTone(session.decision)}>
                        {session.decision}
                      </Badge>
                    )}
                  </div>
                )}

                <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar size={13} />
                  {date}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {session.answers?.length || 0}/{session.questions?.length || 10} questions answered
                </p>

                <div className="mt-4">
                  <Link
                    to={`/investor-session/${session._id}`}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-700"
                  >
                    View Details
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
