import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Target,
  TrendingUp,
  Wallet,
  ShieldAlert,
  Lightbulb,
  Gauge,
  CheckCircle2,
  XCircle,
  Landmark,
} from "lucide-react";
import Skeleton from "../components/ui/Skeleton.jsx";
import ErrorState from "../components/ui/ErrorState.jsx";
import Badge from "../components/ui/Badge.jsx";
import SectionCard from "../components/ui/SectionCard.jsx";
import simulationService from "../services/simulationService.js";

const scoreTone = (score) =>
  score >= 75 ? "green" : score >= 50 ? "yellow" : "red";

const recommendation = (score) =>
  score >= 80
    ? [
        "Strong Investment Candidate",
        "green",
        "This startup shows strong fundamentals and is well-positioned to attract investor interest.",
      ]
    : score >= 55
      ? [
          "Promising with Reservations",
          "yellow",
          "This startup has potential but should address key risks and weaknesses before pursuing funding.",
        ]
      : [
          "Needs Significant Refinement",
          "red",
          "This startup requires substantial validation and refinement before it is investment-ready.",
        ];

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 whitespace-pre-line text-sm text-slate-700">
        {value || "—"}
      </p>
    </div>
  );
}

function List({ items, emptyText }) {
  return Array.isArray(items) && items.length ? (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2 text-sm text-slate-600">
          <i className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-300" />
          {item}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-sm text-slate-400">{emptyText}</p>
  );
}

export default function SimulationDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSimulation = async () => {
    setLoading(true);
    setError(null);
    try {
      setSimulation((await simulationService.getSimulationById(id)).data);
    } catch (e) {
      setError(
        !e?.response ? "network" : e.response.status === 401 ? "unauthorized" : "default"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSimulation();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-52 w-full" />
      </div>
    );
  }

  if (error || !simulation) {
    return (
      <ErrorState
        type={error}
        title={error === "default" ? "Simulation Not Found" : undefined}
        onRetry={fetchSimulation}
      />
    );
  }

  const a = simulation.analysis || {};
  const [label, tone, text] = recommendation(a.startupScore || 0);

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/simulations")}
        className="flex items-center gap-1.5 text-sm text-slate-500"
      >
        <ArrowLeft size={16} />
        Back to My Simulations
      </button>

      {/* Header */}
      <div className="flex flex-col justify-between gap-6 rounded-2xl border bg-white p-6 shadow-card sm:flex-row sm:items-center">
        <div>
          <div className="flex gap-3">
            <h1 className="text-2xl font-bold">{simulation.startupName}</h1>
            <Badge tone="blue">{simulation.industry}</Badge>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Simulated on {new Date(simulation.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 px-6 py-4 text-center">
          <span className="flex items-center gap-2 text-xs text-slate-500">
            <Gauge size={16} />
            AI Score
          </span>
          <p className="text-3xl font-bold">{a.startupScore ?? 0}/100</p>
          <Badge tone={scoreTone(a.startupScore || 0)}>{label}</Badge>
        </div>
      </div>

      {/* Startup Overview */}
      <SectionCard icon={Building2} title="Startup Overview">
        <div className="grid gap-5 sm:grid-cols-2">
          <Info label="Problem Statement" value={simulation.problemStatement} />
          <Info label="Idea / Solution Details" value={simulation.idea} />
          <Info label="Target Audience" value={simulation.targetAudience} />
          <Info label="Business Model" value={simulation.businessModel} />
          <Info label="Funding Required" value={simulation.pricing} />
          <Info label="Unique Selling Proposition" value={simulation.uniqueSellingProposition} />
        </div>
      </SectionCard>

      {/* Market & Revenue */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard icon={Target} title="Market Potential">
          <p className="text-sm text-slate-600">{a.marketPotential}</p>
        </SectionCard>
        <SectionCard icon={Wallet} title="Revenue Prediction" tone="green">
          <div className="space-y-4">
            <Info label="Revenue Prediction" value={a.revenuePrediction} />
            <Info label="Growth Prediction" value={a.growthPrediction} />
            <Info label="Cash Flow Outlook" value={a.cashFlow} />
          </div>
        </SectionCard>
      </div>

      {/* Business Analysis */}
      <SectionCard icon={TrendingUp} title="Business Analysis" tone="purple">
        <div className="grid gap-5 sm:grid-cols-3">
          <Info label="Market Potential" value={a.marketPotential} />
          <Info label="Revenue Prediction" value={a.revenuePrediction} />
          <Info label="Growth Prediction" value={a.growthPrediction} />
        </div>
      </SectionCard>

      {/* SWOT Analysis */}
      <h2 className="text-lg font-semibold">SWOT Analysis</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <SectionCard icon={CheckCircle2} title="Strengths" tone="green">
          <List items={a.strengths} emptyText="No strengths identified." />
        </SectionCard>
        <SectionCard icon={XCircle} title="Weaknesses" tone="red">
          <List items={a.weaknesses} emptyText="No weaknesses identified." />
        </SectionCard>
        <SectionCard icon={Lightbulb} title="Opportunities">
          <List items={a.recommendations} emptyText="No opportunities identified." />
        </SectionCard>
        <SectionCard icon={ShieldAlert} title="Threats" tone="amber">
          <List items={a.risks} emptyText="No threats identified." />
        </SectionCard>
      </div>

      {/* Risk Analysis */}
      <SectionCard icon={ShieldAlert} title="Risk Analysis" tone="amber">
        <List items={a.risks} emptyText="No specific risks identified." />
      </SectionCard>

      {/* AI Suggestions */}
      <SectionCard icon={Lightbulb} title="AI Suggestions">
        <List items={a.recommendations} emptyText="No suggestions available." />
      </SectionCard>

      {/* Funding Recommendation */}
      <SectionCard icon={Landmark} title="Funding Recommendation" tone="purple">
        <Badge tone={tone}>{label}</Badge>
        <p className="mt-3 text-sm text-slate-600">{text}</p>
      </SectionCard>

      {/* Final Verdict */}
      <div className="rounded-2xl border border-primary-100 bg-primary-50 p-6">
        <h3 className="font-semibold">Final Verdict</h3>
        <p className="mt-2 text-sm text-slate-700">
          With an AI score of <b>{a.startupScore ?? 0}/100</b>, this startup falls into
          the "{label}" category. {text}
        </p>
        <Link
          to={`/investor-room?simulationId=${simulation._id}`}
          className="mt-5 inline-flex rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Pitch This Startup in the Investor Room
        </Link>
      </div>
    </div>
  );
}
