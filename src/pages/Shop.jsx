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

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

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
      alert("Please enter name + email");
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

      console.log("checkout response:", data);

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
    <div className="min-h-screen bg-black text-white px-8 py-10">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-6">
        Server Store
      </h1>

      {/* CUSTOMER INFO */}
      <div className="bg-white/5 p-4 rounded mb-6 space-y-3">

        <input
          className="w-full p-2 text-black rounded"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-2 text-black rounded"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* TEbEX STYLE PAYMENT METHOD */}
        <div className="flex gap-3 mt-2">
          
          <button
            onClick={() => setMethod("stripe")}
            className={`flex-1 p-2 rounded ${
              method === "stripe"
                ? "bg-green-500 text-black"
                : "bg-white/10"
            }`}
          >
            Card (Stripe)
          </button>

          <button
            onClick={() => setMethod("paypal")}
            className={`flex-1 p-2 rounded ${
              method === "paypal"
                ? "bg-blue-500 text-black"
                : "bg-white/10"
            }`}
          >
            PayPal
          </button>

          <button
            onClick={() => setMethod("cashapp")}
            className={`flex-1 p-2 rounded ${
              method === "cashapp"
                ? "bg-green-400 text-black"
                : "bg-white/10"
            }`}
          >
            CashApp
          </button>
        </div>
      </div>

      {/* ITEMS */}
      <div className="grid md:grid-cols-3 gap-6">
        {ITEMS.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white/5 p-4 rounded border border-white/10"
          >
            <h2 className="font-bold">{item.name}</h2>
            <p className="text-sm opacity-60">
              {item.desc}
            </p>

            <p className="text-green-400 font-bold mt-2">
              £{item.price}
            </p>

            <button
              onClick={() => addToCart(item)}
              className="mt-3 bg-blue-500 px-3 py-1 rounded"
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
              className="text-red-400"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="mt-4 font-bold text-lg">
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