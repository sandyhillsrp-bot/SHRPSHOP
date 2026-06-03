const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { cart, discordId } = JSON.parse(event.body);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: cart.map((item) => ({
        price_data: {
          currency: "gbp",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),

      success_url: "https://YOUR-SITE.netlify.app/success",
      cancel_url: "https://YOUR-SITE.netlify.app/cancel",

      metadata: {
        discordId,
        cart: JSON.stringify(cart),
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};