import { motion } from "framer-motion";

const ITEMS = [
  {
    id: 1,
    name: "VIP Package",
    price: "£5",
    desc: "VIP perks in-game",
    link: "https://shrp.tebex.io/package/7387003",
  },
  {
    id: 2,
    name: "Police Pack",
    price: "£10",
    desc: "Police loadout + vehicles",
    link: "https://shrp.tebex.io/package/7387003",
  },
  {
    id: 3,
    name: "Starter Cash",
    price: "£3",
    desc: "Starting money boost",
    link: "https://shrp.tebex.io/package/7387003",
  },
];

export default function Shop() {
  return (
    <div className="min-h-screen px-8 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Server Store</h1>

      {/* ITEMS */}
      <div className="grid md:grid-cols-3 gap-6">
        {ITEMS.map((item) => (
          <motion.div
            key={item.id}
            className="border border-border p-4 rounded-xl bg-card/40"
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="font-bold text-xl">{item.name}</h2>

            <p className="text-sm opacity-70 mt-1">{item.desc}</p>

            <p className="text-green-400 font-bold mt-3">
              {item.price}
            </p>

            {/* TEBEX BUTTON */}
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block w-full text-center px-4 py-2 bg-green-500 text-black font-bold rounded"
            >
              Buy on Tebex
            </a>
          </motion.div>
        ))}
      </div>

      {/* INFO SECTION */}
      <div className="mt-10 border-t pt-6 opacity-70 text-sm">
        <p>
          Payments are securely processed by Tebex. You will be redirected
          to complete your purchase safely.
        </p>
      </div>
    </div>
  );
}