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

  // 🧾 customer details
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  // 💳 payment method selector
  const [method, setMethod] = useState("stripe");

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
    if (!email || !name) {
      alert("Enter name + email");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
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
          body: JSON.stringify({
            cart,
            email,
            name,
            method,
          }),
        }
      );

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Checkout failed");
      }
    } catch (err) {
      console.error(err);
      alert("Checkout error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-8 py-10 text-white bg-black">

      <h1 className="text-3xl font-bold mb-6">
        Server Shop
      </h1>

      {/* CUSTOMER INFO */}
      <div className="mb-6 space-y-3">
        <input
          placeholder="Name"
          className="w-full p-2 text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full p-2 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PAYMENT METHOD */}
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full p-2 text-black"
        >
          <option value="stripe">Stripe (Card)</option>
          <option value="paypal">PayPal</option>
          <option value="cashapp">CashApp</option>
        </select>
      </div>

      {/* ITEMS */}
      <div className="grid md:grid-cols-3 gap-6">
        {ITEMS.map((item) => (
          <motion.div
            key={item.id}
            className="p-4 border border-white/10 rounded bg-white/5"
          >
            <h2 className="font-bold">{item.name}</h2>
            <p className="opacity-60 text-sm">
              {item.desc}
            </p>
            <p className="text-green-400 font-bold">
              £{item.price}
            </p>

            <button
              onClick={() => addToCart(item)}
              className="mt-2 bg-blue-500 px-3 py-1 rounded"
            >
              Add
            </button>
          </motion.div>
        ))}
      </div>

      {/* CART */}
      <div className="mt-8 border-t border-white/10 pt-6">
        <h2 className="text-xl font-bold">Cart</h2>

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
              className="text-red-400"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="mt-4 font-bold">
          Total: £{total}
        </div>

        <button
          onClick={checkout}
          disabled={loading}
          className="mt-4 px-6 py-3 bg-green-500 text-black font-bold rounded"
        >
          {loading ? "Processing..." : "Checkout"}
        </button>
      </div>
    </div>
  );
}