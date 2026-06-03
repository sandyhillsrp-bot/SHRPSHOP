import { motion } from 'framer-motion';
import { Users, Bot } from 'lucide-react';

export default function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="flex gap-6"
    >
      <div className="flex items-center gap-3 px-5 py-3 bg-secondary/60 backdrop-blur border border-border rounded-lg">
        <Users className="w-4 h-4 text-primary" />
        <div>
          <p className="font-mono text-[10px] text-muted-foreground tracking-widest">MEMBERS</p>
          <p className="font-display text-2xl font-bold text-foreground">35</p>
        </div>
      </div>
      <div className="flex items-center gap-3 px-5 py-3 bg-secondary/60 backdrop-blur border border-border rounded-lg">
        <Bot className="w-4 h-4 text-primary" />
        <div>
          <p className="font-mono text-[10px] text-muted-foreground tracking-widest">BOTS</p>
          <p className="font-display text-2xl font-bold text-foreground">13</p>
        </div>
      </div>
    </motion.div>
  );
}