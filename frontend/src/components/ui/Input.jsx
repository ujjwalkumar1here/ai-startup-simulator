import { useId } from "react";

export default function Input({ label, error, type = "text", registration, id, icon: Icon, helperText, ...rest }) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  return <div className="w-full">{label && <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-[#334155] dark:text-slate-200">{label}</label>}<div className="relative">{Icon && <Icon size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] dark:text-slate-400" />}<input id={inputId} type={type} aria-invalid={!!error} aria-describedby={error ? errorId : rest["aria-describedby"]} className={`w-full rounded-xl border bg-white ${Icon ? "pl-10" : "px-4"} py-2.5 text-sm text-[#111827] outline-none transition focus:ring-2 dark:bg-[#1E293B] dark:text-slate-100 ${error ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-950" : "border-[#CBD5E1] focus:border-primary-500 focus:ring-primary-100 dark:border-[#334155] dark:focus:ring-primary-950"}`} {...registration} {...rest} /></div>{error ? <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{error}</p> : helperText && <p className="mt-1.5 text-xs leading-5 text-[#64748B] dark:text-slate-400">{helperText}</p>}</div>;
}
