import { useState } from "react";
import { motion } from "framer-motion";

const ITEMS = [
  { id: 1, name: "VIP Package", price: 5, desc: "VIP perks in-game" },
  { id: 2, name: "Police Pack", price: 10, desc: "Police loadout + vehicles" },
  { id: 3, name: "Starter Cash", price: 3, desc: "Starting money boost" },
];

export default function Shop() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);

      if (exists) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const checkout = async () => {
    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "/.netlify/functions/create-checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart }),
        }
      );

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      console.log("Checkout response:", data);

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("No checkout URL returned.");
      }
    } catch (err) {
      console.error(err);
      setError("Checkout failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-8 py-10 text-white bg-slate-950">
      <h1 className="text-3xl font-bold mb-6">
        Server Shop
      </h1>

      {/* ERROR */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-300 rounded">
          {error}
        </div>
      )}

      {/* ITEMS */}
      <div className="grid md:grid-cols-3 gap-6">
        {ITEMS.map((item) => (
          <motion.div
            key={item.id}
            className="border border-white/10 p-4 rounded-xl bg-white/5"
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="font-bold text-lg">
              {item.name}
            </h2>

            <p className="text-sm opacity-70">
              {item.desc}
            </p>

            <p className="text-green-400 font-bold mt-2">
              £{item.price}
            </p>

            <button
              onClick={() => addToCart(item)}
              className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>

      {/* CART */}
      <div className="mt-10 border-t border-white/10 pt-6">
        <h2 className="text-xl font-bold mb-3">
          Cart
        </h2>

        {cart.length === 0 && (
          <p className="opacity-60">Cart is empty</p>
        )}

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between py-2"
          >
            <span>
              {item.name} x{item.quantity}
            </span>

            <button
              onClick={() => removeItem(item.id)}
              className="text-red-400 hover:text-red-300"
            >
              Remove
            </button>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            <div className="mt-4 font-bold text-lg">
              Total: £{total}
            </div>

            <button
              onClick={checkout}
              disabled={loading}
              className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded disabled:opacity-50"
            >
              {loading ? "Processing..." : "Checkout"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}