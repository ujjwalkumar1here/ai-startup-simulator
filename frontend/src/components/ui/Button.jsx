import { motion } from "framer-motion";
import ButtonLoader from "./ButtonLoader.jsx";

const styles = {
  primary: "bg-primary-600 text-white hover:bg-primary-700",
  outline: "border border-slate-300 text-slate-700 hover:bg-slate-50",
  ghost: "text-slate-600 hover:bg-slate-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  ...rest
}) {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: disabled || loading ? 1 : 1.015 }}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
        styles[variant]
      } ${fullWidth ? "w-full" : ""} ${className}`}
      {...rest}
    >
      {loading ? <ButtonLoader /> : children}
    </motion.button>
  );
}
