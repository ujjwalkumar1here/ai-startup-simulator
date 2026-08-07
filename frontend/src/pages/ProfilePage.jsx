import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Mail,
  Calendar,
  Sparkles,
  Target,
  Trophy,
  Users,
  Clock,
  ArrowRight,
  Trash2,
  AlertTriangle,
  X,
} from "lucide-react";
import Badge from "../components/ui/Badge.jsx";
import StatCard from "../components/dashboard/StatCard.jsx";
import Skeleton from "../components/ui/Skeleton.jsx";
import ErrorState from "../components/ui/ErrorState.jsx";
import useAuth from "../hooks/useAuth.js";
import simulationService from "../services/simulationService.js";
import investorService from "../services/investorService.js";

export default function ProfilePage() {
  const { user, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [simulations, setSimulations] = useState([]);
  const [investorSessions, setInvestorSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Delete account modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [simsRes, invRes] = await Promise.all([
        simulationService.getSimulations(),
        investorService.getHistory(),
      ]);
      setSimulations(simsRes.data || []);
      setInvestorSessions(invRes.data || []);
    } catch (e) {
      setError(
        !e?.response ? "network" : e.response.status === 401 ? "unauthorized" : "default"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteAccount = async () => {
    if (deleteInput !== "DELETE") return;
    setDeleting(true);
    try {
      await deleteAccount();
      toast.success("Your account has been deleted successfully.");
      navigate("/");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to delete account. Please try again."
      );
      setDeleting(false);
    }
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setDeleteInput("");
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-48 w-full" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) return <ErrorState type={error} onRetry={fetchData} />;

  const simScores = simulations.map((s) => s.analysis?.startupScore || 0);
  const avgSimScore = simScores.length
    ? simScores.reduce((a, b) => a + b, 0) / simScores.length
    : 0;
  const completedSessions = investorSessions.filter(
    (s) => s.status === "completed"
  );
  const invScores = completedSessions
    .map((s) => s.overallScore)
    .filter((s) => s != null);
  const avgInvScore = invScores.length
    ? invScores.reduce((a, b) => a + b, 0) / invScores.length
    : 0;

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <>
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-3xl font-bold text-white shadow-lg">
              {initial}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.name || "Founder"}</h1>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                <span className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                  <Mail size={14} />
                  {user?.email}
                </span>
                <span className="hidden text-slate-300 sm:inline dark:text-slate-600">•</span>
                <span className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                  <Calendar size={14} />
                  Joined {joinDate}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                <Badge tone="blue">{user?.role || "user"}</Badge>
                {simulations.length >= 5 && (
                  <Badge tone="green">Active Founder</Badge>
                )}
                {completedSessions.length >= 3 && (
                  <Badge tone="yellow">Pitch Veteran</Badge>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Sparkles} label="Total Simulations" value={simulations.length} />
          <StatCard icon={Target} label="Avg Simulation Score" value={avgSimScore} decimals={1} suffix="/100" tone="green" />
          <StatCard icon={Users} label="Investor Sessions" value={investorSessions.length} tone="purple" />
          <StatCard icon={Trophy} label="Avg Investor Score" value={avgInvScore} decimals={1} suffix="/100" tone="amber" />
        </div>

        {/* Recent Simulations */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 dark:text-white">Recent Simulations</h2>
            <Link to="/simulations" className="text-sm text-primary-600 hover:underline dark:text-primary-400">
              View all
            </Link>
          </div>
          {simulations.length ? (
            <div className="space-y-3">
              {simulations.slice(0, 5).map((s) => (
                <Link
                  key={s._id}
                  to={`/simulations/${s._id}`}
                  className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:bg-slate-800 transition-colors"
                >
                  <div>
                    <p className="font-medium text-slate-800 group-hover:text-slate-900 dark:text-slate-200 dark:group-hover:text-white transition-colors">{s.startupName}</p>
                    <p className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                      <Clock size={12} />
                      {new Date(s.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge tone="blue">{s.analysis?.startupScore ?? 0}/100</Badge>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No simulations yet.{" "}
              <Link to="/simulations/new" className="text-primary-600 hover:underline dark:text-primary-400">
                Create your first one
              </Link>
            </p>
          )}
        </motion.div>

        {/* Recent Investor Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 dark:text-white">Recent Investor Sessions</h2>
            <Link to="/investor-history" className="text-sm text-primary-600 hover:underline dark:text-primary-400">
              View all
            </Link>
          </div>
          {investorSessions.length ? (
            <div className="space-y-3">
              {investorSessions.slice(0, 5).map((ses) => {
                const isCompleted = ses.status === "completed";
                return (
                  <Link
                    key={ses._id}
                    to={`/investor-session/${ses._id}`}
                    className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-slate-800 group-hover:text-slate-900 dark:text-slate-200 dark:group-hover:text-white transition-colors">
                        {ses.simulation?.startupName || "Session"}
                      </p>
                      <p className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                        <Clock size={12} />
                        {new Date(ses.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge tone={isCompleted ? "green" : "yellow"}>
                        {isCompleted ? "Completed" : "In Progress"}
                      </Badge>
                      {isCompleted && ses.overallScore != null && (
                        <Badge tone="blue">{ses.overallScore}/100</Badge>
                      )}
                      <ArrowRight size={14} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No investor sessions yet.{" "}
              <Link to="/investor-room" className="text-primary-600 hover:underline dark:text-primary-400">
                Enter the Investor Room
              </Link>
            </p>
          )}
        </motion.div>

        {/* Disclaimer */}
        <div className="rounded-xl bg-slate-100 p-4 text-center dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            All simulations and investor evaluations are AI-generated and illustrative.
            They are not financial advice or a guarantee of real-world performance.
          </p>
        </div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 dark:border-red-500/30 dark:bg-red-500/10"
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
              <AlertTriangle size={18} />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-red-700 dark:text-red-400">Danger Zone</h2>
              <h3 className="mt-0.5 text-sm font-medium text-slate-800 dark:text-slate-200">Delete Account</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Permanently delete your account, simulations, and saved investor history.
                <span className="font-medium text-red-600 dark:text-red-400"> This action cannot be undone.</span>
              </p>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="shrink-0 flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              <Trash2 size={15} />
              Delete Account
            </button>
          </div>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
                    <Trash2 size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Are you absolutely sure?
                    </h2>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Warning message */}
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900/40 dark:bg-red-900/20">
                <p className="text-sm text-red-700 dark:text-red-300">
                  This will permanently delete your account, all simulations, and investor session history. <strong>There is no going back.</strong>
                </p>
              </div>

              {/* Input confirmation */}
              <div className="mt-5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Please type{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-red-600 dark:bg-slate-800 dark:text-red-400">
                    DELETE
                  </code>{" "}
                  to confirm.
                </label>
                <input
                  type="text"
                  value={deleteInput}
                  onChange={(e) => setDeleteInput(e.target.value)}
                  placeholder="Type DELETE here"
                  autoFocus
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-400/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-red-500"
                />
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={closeModal}
                  disabled={deleting}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteInput !== "DELETE" || deleting}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                  {deleting ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Deleting…
                    </>
                  ) : (
                    <>
                      <Trash2 size={15} />
                      Permanently Delete Account
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

