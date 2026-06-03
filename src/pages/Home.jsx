import { motion } from 'framer-motion';
import HeroStats from '../components/home/HeroStats';
import HeroCTA from '../components/home/HeroCTA';

const HERO_BG = 'https://media.base44.com/images/public/6a1ed6e92e3655b397c10ee8/b2375d68d_generated_6ae8be3e.png';

export default function Home() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt="Desert highway at golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 md:px-16 lg:px-24 py-32 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase">
            FiveM Roleplay Server
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-display font-black text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.9] mb-6"
        >
          Sandy
          <br />
          <span className="text-primary">Hills</span>
          <br />
          <span className="text-foreground/40">RP</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-muted-foreground text-lg max-w-md mb-10 leading-relaxed"
        >
          Where the desert meets destiny. A high-stakes FiveM roleplay community 
          built on respect, immersion, and unforgettable stories.
        </motion.p>

        <div className="flex flex-col sm:flex-row items-start gap-6">
          <HeroCTA />
          <HeroStats />
        </div>
      </div>

      {/* HUD corner elements */}
      <div className="absolute top-8 right-8 hidden md:block">
        <div className="font-mono text-[10px] text-muted-foreground/40 text-right space-y-1">
          <p>SYS::GATEWAY_ACTIVE</p>
          <p>LOC::BLAINE_COUNTY</p>
          <p className="text-primary/60">STATUS::OPERATIONAL</p>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
}