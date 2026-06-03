export const handler = async () => {
  const IP = "193.31.31.195";
  const PORTS = [30120, 3434];

  try {
    let players = [];

    for (const port of PORTS) {
      try {
        const res = await fetch(`http://${IP}:${port}/players.json`);

        if (!res.ok) continue;

        const data = await res.json();

        if (Array.isArray(data)) {
          players = data;
          break;
        }
      } catch (e) {}
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        online: players.length || 0,
      }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        online: 0,
        error: "server unreachable",
      }),
    };
  }
};