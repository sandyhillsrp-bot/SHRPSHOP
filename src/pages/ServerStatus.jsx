const SERVER_IP = "193.31.31.195";

// Try common FiveM ports
const PORTS = [30120, 3434];

export const handler = async () => {
  try {
    let players = [];
    let status = "offline";
    let workingPort = null;

    for (const port of PORTS) {
      try {
        const res = await fetch(
          `http://${SERVER_IP}:${port}/players.json`,
          { timeout: 5000 }
        );

        if (!res.ok) continue;

        const data = await res.json();

        if (Array.isArray(data)) {
          players = data;
          status = "online";
          workingPort = port;
          break;
        }
      } catch (err) {
        // try next port
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        online: players.length || 0,
        status,
        port: workingPort,
      }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        online: 0,
        status: "offline",
        error: err.message,
      }),
    };
  }
};