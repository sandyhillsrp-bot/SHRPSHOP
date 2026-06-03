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
    description: "Community chat & coordination hub",
  },
  {
    name: "FiveM Game Server",
    description: "Main RP server",
  },
  {
    name: "Bot Services",
    description: "Automation systems",
  },
  {
    name: "Website",
    description: "Community hub",
  },
];

const recentActivity = [
  { time: "2m ago", event: "New member joined", type: "join" },
  { time: "14m ago", event: "Server restart completed", type: "system" },
  { time: "1h ago", event: "RP session started", type: "rp" },
  { time: "2h ago", event: "Staff meeting", type: "staff" },
];

const colors = {
  join: "text-green-400",
  system: "text-yellow-400",
  rp: "text-blue-400",
  staff: "text-purple-400",
};

export default function ServerStatus() {
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [status, setStatus] = useState("offline");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(
          "/.netlify/functions/server-status"
        );

        const data = await res.json();

        setOnlinePlayers(data.online || 0);
        setStatus(data.status || "offline");
      } catch (err) {
        setOnlinePlayers(0);
        setStatus("offline");
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-white bg-black">

      {/* HEADER */}
      <div className="h-64 flex items-center px-10 bg-gradient-to-r from-black to-zinc-900">
        <div>
          <h1 className="text-5xl font-bold">
            Server <span className="text-yellow-400">Status</span>
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Live monitoring dashboard
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-10 py-10 space-y-10">

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <Users />
            <p className="text-2xl font-bold mt-2">35</p>
            <p className="text-xs opacity-60">Members</p>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <Activity />
            <p className="text-2xl font-bold mt-2">
              {onlinePlayers}
            </p>
            <p className="text-xs opacity-60">Players Online</p>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <Bot />
            <p className="text-2xl font-bold mt-2">13</p>
            <p className="text-xs opacity-60">Bots</p>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <Wifi />
            <p className="text-2xl font-bold mt-2">{status}</p>
            <p className="text-xs opacity-60">Status</p>
          </div>

        </div>

        {/* SERVICES */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Server className="text-yellow-400" />
            Services
          </h2>

          <div className="space-y-3">
            {services.map((s, i) => (
              <div
                key={i}
                className="flex justify-between p-4 bg-white/5 border border-white/10 rounded-xl"
              >
                <div>
                  <p className="font-bold">{s.name}</p>
                  <p className="text-xs opacity-60">
                    {s.description}
                  </p>
                </div>

                <div className="text-green-400 flex items-center gap-1">
                  <CheckCircle size={16} />
                  Online
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVITY */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Clock className="text-yellow-400" />
            Recent Activity
          </h2>

          <div className="bg-white/5 border border-white/10 rounded-xl">
            {recentActivity.map((a, i) => (
              <div
                key={i}
                className="flex gap-4 px-5 py-3 border-b border-white/10 last:border-0"
              >
                <span className="text-xs w-14 opacity-50">
                  {a.time}
                </span>
                <span className={colors[a.type]}>
                  {a.event}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* DISCORD */}
        <div className="p-6 border border-yellow-400/20 bg-yellow-400/5 rounded-xl flex justify-between items-center">
          <div>
            <p className="font-bold">Join Discord</p>
            <p className="text-xs opacity-60">
              discord.gg/hd6VJUBBb
            </p>
          </div>

          <a
            href="https://discord.gg/hd6VJUBBb"
            className="bg-yellow-400 text-black px-5 py-2 font-bold rounded"
          >
            Connect
          </a>
        </div>

      </div>
    </div>
  );
}