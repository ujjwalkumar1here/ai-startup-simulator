export default function Input({ label, error, type = "text", registration, ...rest }) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:ring-2 ${
          error
            ? "border-red-400 focus:ring-red-200"
            : "border-slate-300 focus:border-primary-500 focus:ring-primary-100"
        }`}
        {...registration}
        {...rest}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
