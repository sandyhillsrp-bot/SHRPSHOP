import { motion } from 'framer-motion';
import { MessageSquare, Shield, Crown, Star, ChevronRight, Code } from 'lucide-react';

const rankConfig = {
  Founder: {
    style: 'text-primary border-primary/40 bg-primary/10',
    glow: 'group-hover:shadow-[0_0_30px_rgba(255,184,0,0.12)]',
    stripe: 'from-primary/0 via-primary/40 to-primary/0',
    icon: Crown,
  },
  'Development Director': {
    style: 'text-purple-400 border-purple-400/40 bg-purple-400/10',
    glow: 'group-hover:shadow-[0_0_30px_rgba(192,132,252,0.1)]',
    stripe: 'from-purple-500/0 via-purple-500/40 to-purple-500/0',
    icon: Code,
  },
  Developer: {
    style: 'text-purple-400 border-purple-400/40 bg-purple-400/10',
    glow: 'group-hover:shadow-[0_0_30px_rgba(192,132,252,0.1)]',
    stripe: 'from-purple-500/0 via-purple-500/40 to-purple-500/0',
    icon: Code,
  },
  'Staff Director': {
    style: 'text-red-400 border-red-400/40 bg-red-400/10',
    glow: 'group-hover:shadow-[0_0_30px_rgba(96,165,250,0.1)]',
    stripe: 'from-red-500/0 via-red-500/40 to-red-500/0',
    icon: Shield,
  },
  Management: {
    style: 'text-sky-400 border-sky-400/40 bg-sky-400/10',
    glow: 'group-hover:shadow-[0_0_30px_rgba(192,132,252,0.1)]',
    stripe: 'from-sky-500/0 via-sky-500/40 to-sky-500/0',
    icon: Star,
  },
  'Senior Management': {
    style: 'text-blue-400 border-blue-400/40 bg-blue-400/10',
    glow: 'group-hover:shadow-[0_0_30px_rgba(167,139,250,0.1)]',
    stripe: 'from-blue-500/0 via-blue-500/40 to-blue-500/0',
    icon: Star,
  },
  'Head Admin': {
    style: 'text-red-800 border-red-800/40 bg-red-800/10',
    glow: 'group-hover:shadow-[0_0_30px_rgba(52,211,153,0.1)]',
    stripe: 'from-red-800/0 via-red-800/40 to-red-800/0',
    icon: Shield,
  },
};

export default function StaffCard({ member, index }) {
  const config = rankConfig[member.rank] || rankConfig.Moderator;
  const RankIcon = config.icon;
  const subConfig = member.tag ? rankConfig[member.tag] : null;
  const SubIcon = subConfig?.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className={`group relative border border-border bg-card/60 backdrop-blur rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10 ${config.glow}`}
    >
      {/* Top rank stripe */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${config.stripe} transition-all`} />

      {/* Photo area */}
      <div className="relative h-52 overflow-hidden">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 saturate-[0.85] group-hover:saturate-100"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-secondary to-background flex items-center justify-center">
            <span className="font-display font-black text-6xl text-foreground/10">
              {member.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        {/* Photo gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

{/* Rank badge floating on photo */}
<div className="absolute top-3 right-3">
  <div className="flex gap-2 items-center">

    {/* MAIN RANK */}
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider border backdrop-blur-md ${config.style}`}>
      <RankIcon className="w-3 h-3" />
      {member.rank.toUpperCase()}
    </span>

    {/* SECOND RANK (TAG USING SAME CONFIG SYSTEM) */}
    {subConfig && (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider border backdrop-blur-md ${subConfig.style}`}>
        {SubIcon && <SubIcon className="w-3 h-3" />}
        {member.tag.toUpperCase()}
      </span>
    )}

  </div>
</div>
      </div>

      {/* Info section */}
      <div className="p-5 pt-3">
        <h3 className="font-display font-bold text-lg leading-tight mb-0.5">{member.name}</h3>
        <p className="font-mono text-[11px] text-muted-foreground mb-3">{member.title}</p>

        {member.bio && (
          <p className="text-xs text-muted-foreground/80 leading-relaxed mb-4 line-clamp-3">{member.bio}</p>
        )}

        {/* Responsibilities */}
        {member.duties && (
          <div className="space-y-1 mb-4">
            {member.duties.map((duty, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px] text-muted-foreground/60">
                <ChevronRight className="w-3 h-3 text-primary/40 shrink-0" />
                {duty}
              </div>
            ))}
          </div>
        )}

        {/* Contact button */}
        <a
          href="https://discord.gg/hd6VJUBBb"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-border bg-secondary/40 hover:bg-primary/10 hover:border-primary/30 hover:text-primary text-muted-foreground text-xs font-mono tracking-wider transition-all group/btn"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          MESSAGE ON DISCORD
        </a>
      </div>
    </motion.div>
  );
}