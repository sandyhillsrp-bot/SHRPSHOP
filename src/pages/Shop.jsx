import { motion } from "framer-motion";

const RANKS = [
  {
    name: "Bronze Rank",
    price: "£30.00",
    link: "https://shrp.tebex.io/package/7387003", // replace if needed
    perks: [
      "+5% extra paycheck",
      "Small cash bonus",
      "5% store discount",
      "Queue priority (low)",
      "Bronze Discord role",
      "Basic emotes pack",
    ],
  },
  {
    name: "Silver Rank",
    price: "£60.00",
    link: "https://shrp.tebex.io/package/7387011",
    perks: [
      "+10–15% paycheck boost",
      "Mid-tier queue priority",
      "+2 vehicle slots",
      "Custom chat color",
      "Extra emotes & animations",
      "Silver Discord role",
    ],
  },
  {
    name: "Gold Rank",
    price: "£90.00",
    link: "https://shrp.tebex.io/package/7387020",
    perks: [
      "+20–25% paycheck boost",
      "Exclusive vehicles",
      "Business access perks",
      "Whitelisted job priority",
      "Custom phone number",
      "Gold Discord role",
    ],
  },
  {
    name: "Platinum Rank",
    price: "£100.00",
    link: "https://shrp.tebex.io/package/7386939",
    perks: [
      "+50% paycheck boost",
      "5 personal vehicles",
      "Private Discord channel",
      "Extra inventory space",
      "Custom mansion MLO",
    ],
  },
  {
    name: "Emerald Rank",
    price: "£600.00",
    link: "https://shrp.tebex.io/package/7387022",
    perks: [
      "Top-tier paycheck boosts",
      "Supercars & rare vehicles",
      "+6–8 vehicle slots",
      "Instant garage spawn",
      "Custom vehicle request",
      "Premium rewards system",
    ],
  },
];

export default function Shop() {
  return (
    <div className="min-h-screen px-8 py-10 text-white bg-black">
      <h1 className="text-3xl font-bold mb-6">🏆 Server Ranks</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {RANKS.map((rank, i) => (
          <motion.div
            key={i}
            className="border border-white/10 bg-white/5 p-5 rounded-xl backdrop-blur"
            whileHover={{ scale: 1.03 }}
          >
            {/* Title */}
            <h2 className="text-xl font-bold">{rank.name}</h2>

            {/* Price */}
            <p className="text-green-400 font-bold mt-2">
              {rank.price}
            </p>

            {/* Perks */}
            <div className="mt-4 space-y-2 text-sm opacity-80">
              {rank.perks.map((perk, idx) => (
                <p key={idx}>• {perk}</p>
              ))}
            </div>

            {/* BUY BUTTON */}
            <a
              href={rank.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 w-full block text-center bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded"
            >
              Buy Now
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}