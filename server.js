import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 🌍 YOUR LIVE FRONTEND DOMAIN (CHANGE THIS)
const FRONTEND_URL = "https://shrpshop.netlify.app";

// 🛒 CREATE CHECKOUT SESSION
app.post("/create-checkout", async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "Cart empty" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: cart.map((item) => ({
        price_data: {
          currency: "gbp",
          product_data: {
            name: item.name,
            description: item.desc,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),

      success_url: `${FRONTEND_URL}/success`,
      cancel_url: `${FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).json({ error: "Checkout failed" });
  }
});

// 📊 BASIC HEALTH CHECK (useful for VPS)
app.get("/", (req, res) => {
  res.json({ status: "Stripe API running" });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});