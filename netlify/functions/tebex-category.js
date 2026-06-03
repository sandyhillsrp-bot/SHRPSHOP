export const handler = async () => {
  try {
    const TOKEN = process.env.TEBEX_HEADLESS_TOKEN;

    const res = await fetch(
      `https://headless.tebex.io/api/accounts/${TOKEN}/categories?includePackages=1`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await res.json();

    // ✅ THIS is the important part
    const categories = json?.data || [];

    // find Ranks category
    const ranks = categories.find((c) =>
      c.name?.toLowerCase().includes("rank")
    );

    return {
      statusCode: 200,
      body: JSON.stringify(ranks?.packages || []),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};