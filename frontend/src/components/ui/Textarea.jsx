export default function Textarea({ label, error, rows = 4, registration, helperText, ...rest }) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`w-full resize-none rounded-xl border px-4 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 ${
          error
            ? "border-red-400 focus:ring-red-200"
            : "border-slate-300 focus:border-primary-500 focus:ring-primary-100"
        }`}
        {...registration}
        {...rest}
      />
      {error ? (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      ) : (
        helperText && <p className="mt-1.5 text-xs text-slate-400">{helperText}</p>
      )}
    </div>
  );
}
