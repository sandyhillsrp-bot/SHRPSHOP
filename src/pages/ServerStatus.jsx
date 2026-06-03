import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Activity, Server, Users, Bot, Wifi, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const services = [
  { name: 'Discord Server', key: 'discord', description: 'Community chat & coordination hub' },
  { name: 'FiveM Game Server', key: 'fivem', description: 'Sandy Hills RP main game server' },
  { name: 'Bot Services', key: 'bots', description: '13 active bots & automation systems' },
  { name: 'Website', key: 'website', description: 'This portal & community hub' },
];

const recentActivity = [
  { time: '2m ago', event: 'New member joined', type: 'join' },
  { time: '14m ago', event: 'Server restart completed', type: 'system' },
  { time: '1h ago', event: 'Roleplay session started', type: 'rp' },
  { time: '2h ago', event: 'Staff meeting concluded', type: 'staff' },
  { time: '3h ago', event: 'Map update deployed', type: 'system' },
];

const activityColors = {
  join: 'text-emerald-400',
  system: 'text-primary',
  rp: 'text-blue-400',
  staff: 'text-purple-400',
};

export default function ServerStatus() {
  const [pulse, setPulse] = useState(true);
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [uptime, setUptime] = useState('...');
  const [serverOnline, setServerOnline] = useState(true);

useEffect(() => {
  const fetchStatus = async () => {
    try {
      const res = await fetch("http://localhost:3001/status");
      const data = await res.json();

      setOnlinePlayers(data.online);
      setUptime("Online");
      setServerOnline(true);
    } catch (err) {
      setOnlinePlayers(0);
      setUptime("Offline");
      setServerOnline(false);
    }
  };

  fetchStatus();
  const interval = setInterval(fetchStatus, 15000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-secondary to-background">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, hsl(43,100%,50%) 30px, hsl(43,100%,50%) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, hsl(43,100%,50%) 30px, hsl(43,100%,50%) 31px)'
          }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24">
          <div>
            <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full bg-primary transition-opacity duration-500 ${pulse ? 'opacity-100' : 'opacity-20'}`} />
              Live Feed
            </span>
            <h1 className="font-display font-black text-5xl md:text-6xl uppercase tracking-tighter mt-2">
              Server <span className="text-primary">Status</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users, label: 'MEMBERS', value: '35', sub: 'total registered' },
              { icon: Activity, label: 'IN-GAME', value: String(onlinePlayers), sub: 'currently playing' },
              { icon: Bot, label: 'BOTS', value: '13', sub: 'active services' },
              { icon: Wifi, label: 'UPTIME', value: uptime, sub: 'last 30 days' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="border border-border bg-card/50 rounded-xl p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <stat.icon className="w-4 h-4 text-primary" />
                  <span className="font-mono text-[10px] text-muted-foreground tracking-widest">{stat.label}</span>
                </div>
                <p className="font-display font-black text-3xl text-foreground">{stat.value}</p>
                <p className="font-mono text-[10px] text-muted-foreground/60 mt-1">{stat.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Services status */}
          <div>
            <h2 className="font-display font-bold text-lg uppercase tracking-wide mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-primary" />
              Services
            </h2>
            <div className="space-y-3">
              {services.map((service, i) => (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center justify-between p-4 border border-border bg-card/40 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-2.5 h-2.5 rounded-full bg-emerald-400 transition-opacity duration-700 ${pulse ? 'opacity-100' : 'opacity-50'}`} />
                    <div>
                      <p className="font-display font-semibold text-sm">{service.name}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono text-xs text-emerald-400 tracking-wider">OPERATIONAL</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div>
            <h2 className="font-display font-bold text-lg uppercase tracking-wide mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Activity
            </h2>
            <div className="border border-border bg-card/40 rounded-xl overflow-hidden">
              {recentActivity.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 px-5 py-4 ${i !== recentActivity.length - 1 ? 'border-b border-border' : ''}`}
                >
                  <span className="font-mono text-[10px] text-muted-foreground/50 w-12 shrink-0">{item.time}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-current shrink-0" style={{ color: 'hsl(43,100%,50%)' }} />
                  <span className={`font-mono text-xs ${activityColors[item.type]}`}>{item.event}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Discord join */}
          <div className="p-6 border border-primary/20 bg-primary/5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-display font-bold uppercase tracking-wide mb-1">Join the Community</p>
              <p className="font-mono text-xs text-muted-foreground">discord.gg/hd6VJUBBb</p>
            </div>
            <a
              href="https://discord.gg/hd6VJUBBb"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display font-bold text-sm tracking-widest uppercase rounded-lg hover:shadow-[0_0_20px_rgba(255,184,0,0.2)] transition-all"
            >
              <Wifi className="w-4 h-4" />
              CONNECT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}