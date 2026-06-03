export const handler = async () => {
  try {
    const API_KEY = process.env.TEBEX_SECRET_KEY;

    const res = await fetch(
      "https://plugin.tebex.io/packages",
      {
        headers: {
          "X-Tebex-Secret": API_KEY,
        },
      }
    );

    const data = await res.json();

    // filter only ranks category (you will adjust name)
    const ranks = data.filter((p) =>
      p.category?.name?.toLowerCase().includes("ranks")
    );

    return {
      statusCode: 200,
      body: JSON.stringify(ranks),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};