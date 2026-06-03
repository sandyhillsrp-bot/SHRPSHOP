import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function HeroCTA() {
  return (
    <motion.a
      href="https://discord.gg/hd6VJUBBb"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 184, 0, 0.3)' }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-sm tracking-widest uppercase rounded-lg transition-all"
    >
      <Zap className="w-5 h-5" />
      JOIN TODAY!!
    </motion.a>
  );
}