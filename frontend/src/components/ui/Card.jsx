import { motion } from "framer-motion";

export default function Card({ children, className = "", hover = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={hover ? { y: -4 } : {}}
      className={`rounded-2xl border border-slate-100 bg-white p-6 shadow-card ${className}`}
    >
      {children}
    </motion.div>
  );
}
