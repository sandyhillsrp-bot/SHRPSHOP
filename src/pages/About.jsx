import { motion } from 'framer-motion';
import { Zap, Users, Shield, Map, Star, ChevronRight, ExternalLink } from 'lucide-react';

const ABOUT_BG = 'https://media.base44.com/images/public/6a1ed6e92e3655b397c10ee8/eaee08980_generated_image.png';
const HERO_BG = 'https://media.base44.com/images/public/6a1ed6e92e3655b397c10ee8/b2375d68d_generated_6ae8be3e.png';

const values = [
  {
    icon: Shield,
    title: 'Serious RP',
    description: 'We hold ourselves to a high standard of roleplay. Every interaction is an opportunity to craft a memorable story.',
    color: 'text-primary bg-primary/10 border-primary/20',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'Sandy Hills RP was built by players, for players. Our community\'s voice shapes every decision we make.',
    color: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  },
  {
    icon: Map,
    title: 'Blaine County Immersion',
    description: 'Set in the vast landscapes of Blaine County — from Sandy Shores to the Alamo Sea — our world is alive with opportunity.',
    color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  },
  {
    icon: Star,
    title: 'Fair & Transparent',
    description: 'Our staff team operates with integrity. Rules are enforced consistently, and every member has a voice through our ticket system.',
    color: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  },
];

const milestones = [
  { year: '2025', event: 'Sandy Hills RP founded by TGELITEGAMER138 & Xm6z' },
  { year: '2025', event: 'TGELITEGAMER138 & Xm6z Brought on J2 as a Founder' },
  { year: '2025', event: 'Discord community reaches 35 members' },
  { year: '2026', event: 'Staff team expanded to 7 members' },
  { year: '2026', event: 'Major server update & community website launched' },
];

const features = [
  'Custom FiveM scripts & jobs',
  'Whitelist civilian roles',
  'Law enforcement (LAPD & LASD)',
  'EMS & Fire Department',
  'Player-driven economy',
  'Active staff moderation',
  '13 automated Discord bots',
  'Regular community events',
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-96 overflow-hidden">
        <img src={ABOUT_BG} alt="Desert canyon" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        <div className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-xs text-primary tracking-[0.3em] uppercase"
            >
              Our Story
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-5xl md:text-6xl uppercase tracking-tighter mt-2 mb-4"
            >
              About <span className="text-primary">Sandy Hills</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-base leading-relaxed"
            >
              A FiveM roleplay community carved from the dust of Blaine County — 
              built with passion, governed with integrity, and alive with stories.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="px-8 md:px-16 lg:px-24 py-16 space-y-20">
        <div className="max-w-5xl mx-auto">

          {/* Origin story */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <span className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase">Origin</span>
              <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight mt-2 mb-6">
                Where It All<br /><span className="text-primary">Began</span>
              </h2>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Sandy Hills RP was born from a shared vision between three friends — TGELITEGAMER138, Xm6z, and J — 
                  who wanted to build something different. Not just another FiveM server, but a genuine community 
                  where every player's story matters.
                </p>
                <p>
                  Set in the sun-bleached landscapes of Blaine County, Sandy Hills RP captures the raw energy 
                  of rural life in San Andreas. From high-speed pursuits across the Alamo Sea to quiet nights 
                  at the Sandy Shores airfield — every moment is crafted for immersion.
                </p>
                <p>
                  Today, with a dedicated staff team of 9, a growing roster of 35 members, and 13 bots 
                  keeping things running like clockwork, Sandy Hills RP is just getting started.
                </p>
              </div>
              <div className="mt-8 flex gap-3">
                <a
                  href="https://discord.gg/hd6VJUBBb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-mono text-xs tracking-widest uppercase rounded-lg hover:shadow-[0_0_20px_rgba(255,184,0,0.2)] transition-all"
                >
                  <Zap className="w-3.5 h-3.5" />
                  JOIN NOW
                </a>
                <a
                  href="/staff"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-border bg-secondary/40 hover:border-primary/30 hover:text-primary text-muted-foreground font-mono text-xs tracking-widest uppercase rounded-lg transition-all"
                >
                  <Users className="w-3.5 h-3.5" />
                  MEET THE TEAM
                </a>
              </div>
            </div>

            {/* Photo + stats */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden scanline-overlay aspect-[4/3]">
                <img src={HERO_BG} alt="Desert highway" className="w-full h-full object-cover transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
              {/* Floating stat cards */}
              <div className="absolute -bottom-4 -left-4 px-4 py-3 bg-card border border-border rounded-xl backdrop-blur">
                <p className="font-mono text-[10px] text-muted-foreground tracking-wider">MEMBERS</p>
                <p className="font-display font-black text-2xl text-primary">35</p>
              </div>
              <div className="absolute -top-4 -right-4 px-4 py-3 bg-card border border-border rounded-xl backdrop-blur">
                <p className="font-mono text-[10px] text-muted-foreground tracking-wider">STAFF</p>
                <p className="font-display font-black text-2xl text-foreground">9</p>
              </div>
            </div>
          </motion.section>

          {/* Values */}
          <section>
            <div className="text-center mb-10">
              <span className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase">What We Stand For</span>
              <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight mt-2">
                Our <span className="text-primary">Values</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-4 p-6 border border-border bg-card/40 rounded-xl hover:border-white/10 transition-all"
                >
                  <div className={`p-3 rounded-xl border shrink-0 ${v.color}`}>
                    <v.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base uppercase tracking-wide mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Features */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          >
            <div>
              <span className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase">What We Offer</span>
              <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight mt-2 mb-6">
                Server <span className="text-primary">Features</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground py-2 border-b border-border/40">
                    <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <span className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase">History</span>
              <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight mt-2 mb-6">
                Our <span className="text-primary">Timeline</span>
              </h2>
              <div className="relative pl-6 border-l border-border space-y-6">
                {milestones.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative"
                  >
                    <div className="absolute -left-[25px] w-3 h-3 rounded-full border-2 border-primary bg-background" />
                    <span className="font-mono text-[10px] text-primary tracking-widest">{m.year}</span>
                    <p className="text-sm text-muted-foreground mt-1">{m.event}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* CTA banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-10 text-center"
          >
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, hsl(43,100%,50%) 0%, transparent 70%)'
            }} />
            <span className="font-mono text-[10px] text-primary tracking-[0.3em] uppercase">Ready?</span>
            <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight mt-2 mb-3">
              Write Your Story in <span className="text-primary">Sandy Hills</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
              Join our Discord, read the rules, pick a role, and step into Blaine County. 
              Your next chapter starts now.
            </p>
            <a
              href="https://discord.gg/hd6VJUBBb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-sm tracking-widest uppercase rounded-lg hover:shadow-[0_0_40px_rgba(255,184,0,0.25)] transition-all"
            >
              <Zap className="w-5 h-5" />
              INITIALIZE CONNECTION
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

        </div>
      </div>
    </div>
  );
}