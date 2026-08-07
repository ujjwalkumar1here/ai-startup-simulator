const steps = [["01", "Submit Your Idea", "Fill in your startup name, industry, business model, and pricing details."], ["02", "Get AI Analysis", "Gemini evaluates your startup like a real VC — score, market potential, risks and more."], ["03", "Face the Investor Panel", "Enter the Investor Room and answer 10 tough investor questions in real time."], ["04", "Receive Your Verdict", "Get a final investment decision, funding probability, and actionable suggestions."]];
export default function HowItWorks() {
  return (
    <section className="bg-slate-50 px-4 py-20 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            How It Works
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            From idea to investor-ready in four simple steps.
          </p>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([number, title, text]) => (
            <div
              key={number}
              className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-card dark:border-slate-800 dark:bg-slate-800/80"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                {number}
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
