export const handler = async () => {
  try {
    const API_KEY = process.env.TEBEX_SECRET_KEY;

    const res = await fetch("https://SHRP.tebex.io/category/ranks", {
      headers: {
        "X-Tebex-Secret": API_KEY,
      },
    });

    const data = await res.json();

    console.log("TEBEX RAW RESPONSE:", data);

    // FIX: ensure array extraction
    const packages =
      data?.data ||
      data?.packages ||
      (Array.isArray(data) ? data : []);

    // TEMP DEBUG: return everything first
    return {
      statusCode: 200,
      body: JSON.stringify(packages),
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