import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const { state } = useLocation();
  const cart = state?.cart || [];

  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    name: "",
    postcode: "",
  });

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const pay = async () => {
    if (!form.email || !form.name || !form.postcode) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/.netlify/functions/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          customer: form,
          method,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment failed");
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen px-8 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* SUMMARY */}
      <div className="border p-4 rounded bg-black/30 mb-6">
        {cart.map((i) => (
          <div key={i.id} className="flex justify-between">
            <span>{i.name} x{i.quantity}</span>
            <span>£{i.price * i.quantity}</span>
          </div>
        ))}
        <div className="mt-4 font-bold">Total: £{total}</div>
      </div>

      {/* PAYMENT METHODS */}
      <div className="grid md:grid-cols-4 gap-3 mb-6">
        <button onClick={() => setMethod("card")} className="p-3 border rounded">
          Visa / Debit
        </button>

        <button onClick={() => setMethod("paypal")} className="p-3 border rounded">
          PayPal
        </button>

        <button onClick={() => setMethod("googlepay")} className="p-3 border rounded">
          Google Pay
        </button>

        <button onClick={() => setMethod("cashapp")} className="p-3 border rounded">
          CashApp
        </button>
      </div>

      {/* FORM */}
      <div className="border p-5 rounded bg-black/30 space-y-4">
        <input
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full p-3 bg-black border rounded"
        />

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-3 bg-black border rounded"
        />

        <input
          name="postcode"
          placeholder="Zip / Postal Code (PO12 1AB)"
          onChange={handleChange}
          className="w-full p-3 bg-black border rounded"
        />

        {/* METHOD INFO */}
        <div className="text-sm opacity-70">
          {method === "card" && "Secure Stripe payment (Visa / Debit)."}
          {method === "paypal" && "Redirect to PayPal login."}
          {method === "googlepay" && "Fast wallet payment via Stripe."}
          {method === "cashapp" && "Manual payment required."}
        </div>

        <button
          onClick={pay}
          disabled={loading}
          className="w-full py-3 bg-green-500 text-black font-bold rounded"
        >
          {loading ? "Processing..." : "Complete Payment"}
        </button>
      </div>
    </div>
  );
}