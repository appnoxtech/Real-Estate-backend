import http from "http";
import expressServer from "./server";
import connectPSQlDb from "./config/dbConnection";
import { Server, Socket } from "socket.io";
import { socketHandler } from "./utils/socketHandler";
import { logger } from "./utils/logger";

// Normalize port number which will expose server
const port = normalizePort(5000);

// Instantiate the expressServer class
const expressInstance = new expressServer().expressInstance;

// Make port available within server
expressInstance.set("port", port);
expressInstance.get('/', (req, res) => {
  res.send('API Running');
});
// Create the HTTP Express Server
const server = http.createServer(expressInstance);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

var name: String;
// Listen for when the client connects via socket.io-client

// Start listening on the specified Port (Default: 5000)
server.listen(port, () => {
  logger.info(`listening on port ${port}`);
});
socketHandler(io);
connectPSQlDb();

// Port Normalization
function normalizePort(val: number | string): number | string | boolean {
  const port: number = typeof val === "string" ? parseInt(val, 10) : val;
  if (isNaN(port)) {
    return val;
  } else if (port >= 0) {
    return port;
  } else {
    return false;
  }
}
