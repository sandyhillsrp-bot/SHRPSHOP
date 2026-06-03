export const handler = async () => {
  try {
    const STORE_TOKEN = process.env.TEBEX_STORE_TOKEN;

    const res = await fetch(
      `https://headless.tebex.io/api/accounts/${STORE_TOKEN}/categories?includePackages=1`
    );

    const json = await res.json();

    const categories = json?.data || [];

    // find Ranks category
    const ranksCategory = categories.find((c) =>
      c.name?.toLowerCase().includes("rank")
    );

    return {
      statusCode: 200,
      body: JSON.stringify(ranksCategory?.packages || []),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};