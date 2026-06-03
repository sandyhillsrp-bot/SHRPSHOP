import { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";

export default function Checkout() {
  const [method, setMethod] = useState("card");

  const [form, setForm] = useState({
    email: "",
    name: "",
    postcode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen px-8 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* PAYMENT METHOD SELECT */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <button onClick={() => setMethod("card")} className="border p-3">
          Visa / Debit
        </button>

        <button onClick={() => setMethod("paypal")} className="border p-3">
          PayPal
        </button>

        <button onClick={() => setMethod("google")} className="border p-3">
          Google Pay
        </button>

        <button onClick={() => setMethod("cashapp")} className="border p-3">
          CashApp
        </button>
      </div>

      {/* 🔥 VISA / DEBIT (SECURE STRIPE UI - THIS IS WHERE CARD, EXP, CVV APPEAR) */}
      {method === "card" && (
        <div className="border p-4 rounded bg-black/30">
          <h2 className="font-bold mb-3">Visa / Debit Card</h2>

          {/* THIS automatically contains:
              - Card Number
              - Expiry Date
              - CVV */}
          <CardElement />
        </div>
      )}

      {/* 🟡 PAYPAL FORM */}
      {method === "paypal" && (
        <div className="space-y-3 border p-4 rounded bg-black/30">
          <h2 className="font-bold">PayPal Checkout</h2>

          <input name="email" placeholder="Email Address" onChange={handleChange} className="w-full p-2 bg-black border" />
          <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-2 bg-black border" />
          <input name="postcode" placeholder="Zip / Postal Code" onChange={handleChange} className="w-full p-2 bg-black border" />
        </div>
      )}

      {/* 🟢 GOOGLE PAY */}
      {method === "google" && (
        <div className="space-y-3 border p-4 rounded bg-black/30">
          <h2 className="font-bold">Google Pay</h2>

          <input name="email" placeholder="Email Address" onChange={handleChange} className="w-full p-2 bg-black border" />
          <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-2 bg-black border" />
          <input name="postcode" placeholder="Zip / Postal Code" onChange={handleChange} className="w-full p-2 bg-black border" />
        </div>
      )}

      {/* 💸 CASHAPP */}
      {method === "cashapp" && (
        <div className="space-y-3 border p-4 rounded bg-black/30">
          <h2 className="font-bold">CashApp</h2>

          <input name="email" placeholder="Email Address" onChange={handleChange} className="w-full p-2 bg-black border" />
          <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-2 bg-black border" />
          <input name="postcode" placeholder="Zip / Postal Code" onChange={handleChange} className="w-full p-2 bg-black border" />
        </div>
      )}

      {/* BUTTON */}
      <button className="mt-6 w-full py-3 bg-green-500 text-black font-bold">
        Complete Payment
      </button>
    </div>
  );
}