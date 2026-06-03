import { motion } from 'framer-motion';
import { FileText, ExternalLink, Shield, Car, Star, Gavel } from 'lucide-react';

const applications = [
  {
    icon: Shield,
    title: 'Staff Application',
    description: 'Apply to join the Sandy Hills RP staff team. We are looking for dedicated, mature members who want to help shape the community.',
    status: 'OPEN',
    statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    link: 'https://discord.gg/hd6VJUBBb',
    note: 'Link your application in Discord after joining.',
  },
  {
    icon: Car,
    title: 'EMS / Fire Application',
    description: 'Join the Emergency Medical Services or Fire Department. Respond to calls and keep citizens safe across Blaine County.',
    status: 'OPEN',
    statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    link: 'https://discord.gg/hd6VJUBBb',
    note: 'Submit in the applications channel.',
  },
  {
    icon: Gavel,
    title: 'LAPD Application',
    description: 'Apply to serve and protect as a member of the Sandy Hills PD or BCSO. Enforce the law and keep order in the county.',
    status: 'OPEN',
    statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSeNVc0Lz_ncuc1gLGutXj6U9IvmsClx42M3xMs6R08UR8kfSg/viewform?usp=publish-editor',
    note: 'Submit in the applications channel.',
  },
  {
    icon: Gavel,
    title: 'LASD Application',
    description: 'Apply to serve and protect as a member of the Sandy Hills PD or BCSO. Enforce the law and keep order in the county.',
    status: 'OPEN',
    statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSeNVc0Lz_ncuc1gLGutXj6U9IvmsClx42M3xMs6R08UR8kfSg/viewform?usp=publish-editor',
    note: 'Submit in the applications channel.',
  },
  {
    icon: Star,
    title: 'Whitelist Civilian Application',
    description: 'Apply for a whitelisted civilian role with access to exclusive jobs, vehicles, and storylines on the Sandy Hills RP server.',
    status: 'OPEN',
    statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    link: 'https://discord.gg/hd6VJUBBb',
    note: 'Submit in the applications channel.',
  },
];

export default function Applications() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-secondary to-background">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24">
          <div>
            <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase">Career Pathways</span>
            <h1 className="font-display font-black text-5xl md:text-6xl uppercase tracking-tighter mt-2">
              Apply <span className="text-primary">Now</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Applications */}
      <div className="px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground mb-10 max-w-lg"
          >
            Ready to take on a role in Sandy Hills RP? Choose an application below and follow the instructions in our Discord.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {applications.map((app, i) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group border border-border bg-card/50 backdrop-blur rounded-xl p-6 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl">
                    <app.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider border ${app.statusColor}`}>
                    {app.status}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl uppercase tracking-wide mb-2">{app.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{app.description}</p>
                <div className="border-t border-border pt-4 flex items-center justify-between">
                  <p className="font-mono text-[10px] text-muted-foreground/60">{app.note}</p>
                  <a
                    href={app.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary rounded-lg text-xs font-mono tracking-wider transition-all"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    APPLY
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 p-5 border border-border bg-secondary/20 rounded-xl flex items-start gap-4"
          >
            <FileText className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              All applications are reviewed by the command staff. Response times vary — please be patient. 
              Do not DM staff about your application status; use the ticket system instead.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}