import { motion } from 'framer-motion';

export default function TicketButton({ icon: Icon, title, description, staff, delay = 0 }) {
  return (
    <motion.a
      href="https://discord.gg/hd6VJUBBb"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.02, borderColor: 'hsl(43, 100%, 50%)' }}
      className="group block border border-border bg-card/50 backdrop-blur rounded-xl p-8 transition-all hover:bg-card/80"
    >
      <div className="flex items-start gap-5">
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl group-hover:bg-primary/20 transition-colors">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-bold text-xl uppercase tracking-wide mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-mono text-[10px] text-muted-foreground/60 tracking-wider">
              ACTIVE COMMAND:
            </span>
            <div className="flex flex-wrap gap-2">
              {staff.map((name) => (
                <span key={name} className="px-2 py-0.5 bg-secondary rounded text-[11px] font-mono text-muted-foreground">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}