const SERVER_IP = "193.31.31.195";
const PORTS_TO_TRY = [30120, 3434]; // auto fallback

export const handler = async () => {
  try {
    let players = [];
    let workingPort = null;

    for (const port of PORTS_TO_TRY) {
      try {
        const res = await fetch(
          `http://${SERVER_IP}:${port}/players.json`
        );

        if (res.ok) {
          const data = await res.json();

          if (Array.isArray(data)) {
            players = data;
            workingPort = port;
            break;
          }
        }
      } catch (e) {
        // try next port
      }
    }

    const online = players.length || 0;

    return {
      statusCode: 200,
      body: JSON.stringify({
        online,
        status: online > 0 ? "online" : "idle",
        port: workingPort,
      }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        online: 0,
        status: "offline",
      }),
    };
  }
};