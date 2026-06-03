export const handler = async () => {
  try {
    const API_KEY = process.env.TEBEX_SECRET_KEY;

    const res = await fetch("https://plugin.tebex.io/packages", {
      headers: {
        "X-Tebex-Secret": API_KEY,
      },
    });

    const data = await res.json();

    const packages = Array.isArray(data) ? data : data?.data || data?.packages || [];

    return {
      statusCode: 200,
      body: JSON.stringify(packages),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};