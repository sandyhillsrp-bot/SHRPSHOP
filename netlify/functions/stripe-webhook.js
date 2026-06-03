const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const sig = event.headers["stripe-signature"];

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object;

    const discordId = session.metadata.discordId;
    const cart = JSON.parse(session.metadata.cart);

    // 👉 HERE YOU TRIGGER DISCORD + FIVEM
    await giveRewards(discordId, cart);
  }

  return { statusCode: 200, body: "OK" };
};

// fake handler (we connect next)
async function giveRewards(discordId, cart) {
  console.log("Give rewards to:", discordId, cart);
}