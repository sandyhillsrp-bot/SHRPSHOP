import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function Checkout() {
  const stripe = useStripe();
  const elements = useElements();

  const [method, setMethod] = useState("card");

  const [form, setForm] = useState({
    email: "",
    name: "",
    postcode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const pay = async () => {
    if (!form.email || !form.name || !form.postcode) {
      alert("Fill in Email, Full Name, and Postcode");
      return;
    }

    // 🟡 PAYPAL / CASHAPP (fake redirect for now)
    if (method === "paypal") {
      window.location.href = "https://www.paypal.com/signin";
      return;
    }

    if (method === "cashapp") {
      alert("Send payment manually via CashApp.");
      return;
    }

    // 💳 STRIPE CARD PAYMENT (REAL)
    if (method === "card") {
      if (!stripe || !elements) {
        alert("Stripe not loaded");
        return;
      }

      const res = await fetch("/.netlify/functions/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form }),
      });

      const data = await res.json();

      if (!data.clientSecret) {
        alert("Payment failed backend");
        return;
      }

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: form.name,
            email: form.email,
          },
        },
      });

      if (result.error) {
        alert(result.error.message);
      } else {
        alert("Payment successful!");
      }
    }
  };

  return (
    <div className="min-h-screen px-8 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* METHOD SELECT */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <button onClick={() => setMethod("card")} className="border p-3">
          Visa / Debit
        </button>
        <button onClick={() => setMethod("paypal")} className="border p-3">
          PayPal
        </button>
        <button onClick={() => setMethod("cashapp")} className="border p-3">
          CashApp
        </button>
      </div>

      {/* COMMON FIELDS (ALL METHODS) */}
      <div className="space-y-3 mb-6">
        <input
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full p-3 bg-black border"
        />

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-3 bg-black border"
        />

        <input
          name="postcode"
          placeholder="Zip / Postal Code"
          onChange={handleChange}
          className="w-full p-3 bg-black border"
        />
      </div>

      {/* 💳 CARD UI (THIS IS WHERE CARD NUMBER / EXP / CVV ACTUALLY LIVE) */}
      {method === "card" && (
        <div className="border p-4 rounded bg-black/30 mb-4">
          <h2 className="font-bold mb-3">Visa / Debit Card</h2>

          {/* This includes:
              ✔ Card Number
              ✔ Expiry Date
              ✔ CVV */}
          <CardElement />
        </div>
      )}

      <button
        onClick={pay}
        className="w-full py-3 bg-green-500 text-black font-bold rounded"
      >
        Complete Payment
      </button>
    </div>
  );
}