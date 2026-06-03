import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Activity,
  Server,
  Users,
  Bot,
  Wifi,
  Clock,
  CheckCircle,
} from "lucide-react";

const services = [
  {
    name: "Discord Server",
    key: "discord",
    description: "Community chat & coordination hub",
  },
  {
    name: "FiveM Game Server",
    key: "fivem",
    description: "Sandy Hills RP main game server",
  },
  {
    name: "Bot Services",
    key: "bots",
    description: "13 active bots & automation systems",
  },
  {
    name: "Website",
    key: "website",
    description: "This portal & community hub",
  },
];

const recentActivity = [
  { time: "2m ago", event: "New member joined", type: "join" },
  { time: "14m ago", event: "Server restart completed", type: "system" },
  { time: "1h ago", event: "Roleplay session started", type: "rp" },
  { time: "2h ago", event: "Staff meeting concluded", type: "staff" },
  { time: "3h ago", event: "Map update deployed", type: "system" },
];

const activityColors = {
  join: "text-emerald-400",
  system: "text-primary",
  rp: "text-blue-400",
  staff: "text-purple-400",
};

export default function ServerStatus() {
  const [pulse, setPulse] = useState(true);
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [uptime, setUptime] = useState("Online");
  const [serverOnline, setServerOnline] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        // SAFE MODE FIRST (no backend crash risk)
        const res = await fetch("/.netlify/functions/server-status");

        const data = await res.json();

        setOnlinePlayers(data?.online || 0);
        setUptime("Online");
        setServerOnline(true);
      } catch (err) {
        console.error("Status error:", err);

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
    <div className="min-h-screen text-white">

      {/* HEADER */}
      <div className="relative h-64 bg-gradient-to-br from-black to-zinc-900 flex items-center px-10">
        <div>
          <span className="text-yellow-400 text-xs tracking-[0.3em] uppercase flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full bg-yellow-400 ${
                pulse ? "opacity-100" : "opacity-30"
              }`}
            />
            Live Feed
          </span>

          <h1 className="text-5xl font-black uppercase mt-2">
            Server <span className="text-yellow-400">Status</span>
          </h1>
        </div>
      </div>

      <div className="px-10 py-10 max-w-6xl mx-auto space-y-10">

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <Users className="text-yellow-400" />
            <p className="text-2xl font-bold mt-2">35</p>
            <p className="text-xs opacity-60">Total Members</p>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <Activity className="text-yellow-400" />
            <p className="text-2xl font-bold mt-2">{onlinePlayers}</p>
            <p className="text-xs opacity-60">Players Online</p>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <Bot className="text-yellow-400" />
            <p className="text-2xl font-bold mt-2">13</p>
            <p className="text-xs opacity-60">Active Bots</p>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <Wifi className="text-yellow-400" />
            <p className="text-2xl font-bold mt-2">{uptime}</p>
            <p className="text-xs opacity-60">Server Status</p>
          </div>

        </div>

        {/* SERVICES */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Server className="text-yellow-400" />
            Services
          </h2>

          <div className="space-y-3">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl"
              >
                <div>
                  <p className="font-semibold">{service.name}</p>
                  <p className="text-xs opacity-60">{service.description}</p>
                </div>

                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle size={16} />
                  <span className="text-xs uppercase tracking-wider">
                    Online
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ACTIVITY */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Clock className="text-yellow-400" />
            Recent Activity
          </h2>

          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-5 py-4 border-b border-white/10 last:border-0"
              >
                <span className="text-xs opacity-50 w-12">
                  {item.time}
                </span>

                <div className="w-2 h-2 rounded-full bg-yellow-400" />

                <span className={`text-sm ${activityColors[item.type]}`}>
                  {item.event}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* DISCORD */}
        <div className="p-6 border border-yellow-400/20 bg-yellow-400/5 rounded-xl flex justify-between items-center">
          <div>
            <p className="font-bold uppercase">Join Discord</p>
            <p className="text-xs opacity-60">
              discord.gg/hd6VJUBBb
            </p>
          </div>

          <a
            href="https://discord.gg/hd6VJUBBb"
            target="_blank"
            className="bg-yellow-400 text-black px-5 py-2 font-bold rounded"
          >
            Connect
          </a>
        </div>

      </div>
    </div>
  );
}