import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const { state } = useLocation();
  const cart = state?.cart || [];

  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const payStripe = async () => {
    setLoading(true);

    try {
      const res = await fetch("/.netlify/functions/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Stripe error");
        console.log(data);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen px-8 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="border p-4 rounded bg-black/30 mb-6">
        {cart.map((i) => (
          <div key={i.id} className="flex justify-between py-1">
            <span>{i.name} x{i.quantity}</span>
            <span>£{i.price * i.quantity}</span>
          </div>
        ))}

        <div className="mt-4 font-bold">Total: £{total}</div>
      </div>

      <button
        onClick={payStripe}
        disabled={loading}
        className="px-6 py-3 bg-green-500 text-black font-bold rounded"
      >
        {loading ? "Processing..." : "Pay with Card"}
      </button>
    </div>
  );
}