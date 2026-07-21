export default function Select({ label, error, options, registration, ...rest }) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <select
        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 ${
          error
            ? "border-red-400"
            : "border-slate-300 focus:border-primary-500 focus:ring-primary-100"
        }`}
        {...registration}
        {...rest}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
