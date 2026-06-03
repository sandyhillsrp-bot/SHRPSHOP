import { motion } from 'framer-motion';
import { AlertTriangle, Ban, LogOut, AlertCircle, ShieldAlert } from 'lucide-react';

const colorMap = {
  blue: 'border-blue-500/30 bg-blue-500/5',
  green: 'border-emerald-500/30 bg-emerald-500/5',
  yellow: 'border-amber-500/30 bg-amber-500/5',
  red: 'border-red-500/30 bg-red-500/5',
  purple: 'border-purple-500/30 bg-purple-500/5',
};

const severityConfig = {
  warning: {
    label: 'WARNING',
    icon: AlertCircle,
    style: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  },
  kick: {
    label: 'KICK',
    icon: LogOut,
    style: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  },
  ban: {
    label: 'BAN',
    icon: Ban,
    style: 'bg-red-500/10 text-red-400 border-red-500/30',
  },
  permban: {
    label: 'PERM BAN',
    icon: ShieldAlert,
    style: 'bg-rose-900/30 text-rose-400 border-rose-500/30',
  },
  escalating: {
    label: 'WARNING → BAN',
    icon: AlertTriangle,
    style: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  },
};

export default function RuleCard({ rule, index }) {
  const severity = severityConfig[rule.severity] || severityConfig.warning;
  const SeverityIcon = severity.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={`relative border rounded-xl p-6 overflow-hidden ${colorMap[rule.color]}`}
    >
      {/* Large background number */}
      <span className="absolute -right-2 -top-4 font-display font-black text-[120px] leading-none text-foreground/[0.03] select-none pointer-events-none">
        {rule.number}
      </span>

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="font-display font-bold text-lg uppercase tracking-wide leading-tight">
            {rule.title}
          </h3>
          <span className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider border ${severity.style}`}>
            <SeverityIcon className="w-3 h-3" />
            {severity.label}
          </span>
        </div>
        <ul className="space-y-2">
          {rule.items.map((item, i) => (
            <li key={i} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
              <span className="text-foreground/20 mt-0.5">›</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}