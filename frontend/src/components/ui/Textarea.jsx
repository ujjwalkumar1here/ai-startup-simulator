import { useId } from "react";

export default function Textarea({ label, error, rows = 4, registration, helperText, id, ...rest }) {
  const generatedId = useId();
  const textareaId = id || generatedId;
  const descriptionId = `${textareaId}-${error ? "error" : "help"}`;
  return <div>{label && <label htmlFor={textareaId} className="mb-1.5 block text-sm font-medium text-[#334155] dark:text-slate-200">{label}</label>}<textarea id={textareaId} rows={rows} aria-invalid={!!error} aria-describedby={error || helperText ? descriptionId : rest["aria-describedby"]} className={`w-full resize-y rounded-xl border bg-white px-4 py-2.5 text-sm text-[#111827] outline-none transition focus:ring-2 dark:bg-[#1E293B] dark:text-slate-100 ${error ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-950" : "border-[#CBD5E1] focus:border-primary-500 focus:ring-primary-100 dark:border-[#334155] dark:focus:ring-primary-950"}`} {...registration} {...rest} />{error ? <p id={descriptionId} role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{error}</p> : helperText && <p id={descriptionId} className="mt-1.5 text-xs text-[#64748B] dark:text-slate-400">{helperText}</p>}</div>;
}
