import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Shop() {
  const [ranks, setRanks] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/.netlify/functions/tebex-category");
        const data = await res.json();
        setRanks(data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  return (
    <div className="min-h-screen px-8 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Ranks</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {ranks.map((rank) => (
          <motion.div
            key={rank.id}
            className="border border-border p-4 rounded-xl bg-card/40"
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="font-bold text-xl">{rank.name}</h2>

            <p className="text-sm opacity-70 mt-2">
              {rank.description}
            </p>

            <p className="text-green-400 font-bold mt-3">
              £{rank.base_price / 100}
            </p>

            <a
              href={rank.direct_link}
              target="_blank"
              className="mt-4 inline-block w-full text-center px-4 py-2 bg-green-500 text-black font-bold rounded"
            >
              Buy on Tebex
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}