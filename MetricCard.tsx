'use client';
import { motion } from 'framer-motion';

export function MetricCard({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card p-4"
    >
      <div className="opacity-80 text-sm">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      <div className="text-xs mt-2 opacity-70">التغير: {trend}</div>
    </motion.div>
  );
}
