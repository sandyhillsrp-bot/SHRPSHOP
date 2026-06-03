import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  { id: 1, name: "VIP Package", price: 5, desc: "VIP perks in-game" },
  { id: 2, name: "Police Pack", price: 10, desc: "Police loadout + vehicles" },
  { id: 3, name: "Starter Cash", price: 3, desc: "Starting money boost" },
];

export default function Shop() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);

      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const goCheckout = () => {
    navigate("/checkout", { state: { cart } });
  };

  return (
    <div className="min-h-screen px-8 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Server Shop</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {ITEMS.map((item) => (
          <motion.div
            key={item.id}
            className="border p-4 rounded-xl bg-black/40"
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="font-bold">{item.name}</h2>
            <p className="text-sm opacity-70">{item.desc}</p>
            <p className="font-bold mt-2">£{item.price}</p>

            <button
              onClick={() => addToCart(item)}
              className="mt-3 px-4 py-2 bg-white text-black rounded"
            >
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-bold">Cart</h2>

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between py-2">
            <span>{item.name} x{item.quantity}</span>
            <button onClick={() => removeItem(item.id)} className="text-red-400">
              Remove
            </button>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            <div className="mt-4 font-bold">Total: £{total}</div>

            <button
              onClick={goCheckout}
              className="mt-4 px-6 py-3 bg-green-500 text-black font-bold rounded"
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}