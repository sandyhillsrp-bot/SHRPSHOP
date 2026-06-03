import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const { state } = useLocation();
  const cart = state?.cart || [];

  const [method, setMethod] = useState("card");

  const [form, setForm] = useState({
    email: "",
    name: "",
    postcode: "",
  });

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.email || !form.name || !form.postcode) {
      alert("Please fill in all required fields");
      return false;
    }
    return true;
  };

  const pay = async () => {
    if (!validate()) return;

    // STRIPE (CARD + GOOGLE PAY uses Stripe)
    if (method === "card" || method === "googlepay") {
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

      if (data.url) window.location.href = data.url;
      else alert("Payment failed");
    }

    // PAYPAL
    if (method === "paypal") {
      window.location.href =
        "https://www.paypal.com/signin"; // replace with real PayPal API later
    }

    // CASHAPP (manual / placeholder)
    if (method === "cashapp") {
      alert(
        "CashApp payment selected. Please send payment manually and open a ticket."
      );
    }
  };

  return (
    <div className="min-h-screen text-white px-8 py-10">
      <h1 className="text-3xl font-bold mb-6">Secure Checkout</h1>

      {/* CART SUMMARY */}
      <div className="border p-4 rounded bg-black/30 mb-6">
        {cart.map((i) => (
          <div key={i.id} className="flex justify-between py-1">
            <span>{i.name} x{i.quantity}</span>
            <span>£{i.price * i.quantity}</span>
          </div>
        ))}
        <div className="mt-4 font-bold">Total: £{total}</div>
      </div>

      {/* PAYMENT METHODS */}
      <div className="grid md:grid-cols-4 gap-3 mb-6">
        <button onClick={() => setMethod("card")} className="p-3 border rounded">
          Debit / Card
        </button>

        <button onClick={() => setMethod("googlepay")} className="p-3 border rounded">
          Google Pay
        </button>

        <button onClick={() => setMethod("paypal")} className="p-3 border rounded">
          PayPal
        </button>

        <button onClick={() => setMethod("cashapp")} className="p-3 border rounded">
          Cash App
        </button>
      </div>

      {/* FORM (changes depending on method like Tebex) */}
      <div className="border p-5 rounded bg-black/30 space-y-4">

        {/* EMAIL */}
        <input
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 bg-black border rounded"
        />

        {/* FULL NAME */}
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 bg-black border rounded"
        />

        {/* POSTCODE */}
        <input
          name="postcode"
          placeholder="Zip / Postal Code (e.g. PO12 1AB)"
          value={form.postcode}
          onChange={handleChange}
          className="w-full p-3 bg-black border rounded"
        />

        {/* METHOD INFO BOX */}
        <div className="text-sm opacity-70">
          {method === "card" && "Pay securely with debit/credit card via Stripe."}
          {method === "googlepay" && "Fast checkout using Google Pay wallet."}
          {method === "paypal" && "You will be redirected to PayPal login."}
          {method === "cashapp" && "Manual CashApp payment required."}
        </div>

        <button
          onClick={pay}
          className="w-full py-3 bg-green-500 text-black font-bold rounded"
        >
          Complete Payment
        </button>
      </div>
    </div>
  );
}