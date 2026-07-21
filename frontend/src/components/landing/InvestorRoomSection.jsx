import { MessageSquareText, Gavel, PercentCircle } from "lucide-react";

const points = [
  [MessageSquareText, "10 Real Investor Questions", "Covering problem, market, revenue, competition, team, and more."],
  [Gavel, "Live AI Evaluation", "Every answer is scored with strengths, weaknesses, and improvements."],
  [PercentCircle, "Funding Probability", "Get a final investment decision and your probability of funding."],
];

export default function InvestorRoomSection() {
  return (
    <section className="bg-slate-50 px-4 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="space-y-4">
          {points.map(([Icon, title, text]) => (
            <div key={title} className="flex gap-4">
              <div className="h-fit rounded-xl bg-primary-50 p-3 text-primary-600">
                <Icon size={20} />
              </div>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-slate-600">{text}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Step Into the Investor Room
          </h2>
          <p className="mt-4 text-slate-600">
            Face an AI-powered investor panel modeled after Shark Tank and Y Combinator
            interviews. Sharpen your pitch before a real boardroom.
          </p>
        </div>
      </div>
    </section>
  );
}
