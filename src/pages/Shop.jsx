import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Shop() {
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/.netlify/functions/tebex-category");
        const data = await res.json();

        console.log("TEBEX DATA:", data);

        setRanks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setRanks([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <div className="text-white p-10">Loading shop...</div>;
  }

  return (
    <div className="min-h-screen px-8 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Ranks</h1>

      {ranks.length === 0 ? (
        <p>No packages found or API error.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {ranks.map((rank, i) => (
            <motion.div
              key={rank.id || i}
              className="border p-4 rounded bg-black/30"
            >
              <h2 className="font-bold">{rank.name}</h2>

              <p className="text-sm opacity-70">
                {rank.description || "No description"}
              </p>

              <p className="text-green-400 font-bold mt-2">
                £{(rank.base_price || 0) / 100}
              </p>

              {rank.direct_link && (
                <a
                  href={rank.direct_link}
                  target="_blank"
                  className="mt-3 inline-block bg-green-500 text-black px-3 py-2 rounded"
                >
                  Buy
                </a>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}