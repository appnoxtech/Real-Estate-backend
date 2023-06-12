"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const server_1 = __importDefault(require("./server"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const socket_io_1 = require("socket.io");
const socketHandler_1 = require("./utils/socketHandler");
// Normalize port number which will expose server
const port = normalizePort(8082);
// Instantiate the expressServer class
const expressInstance = new server_1.default().expressInstance;
// Make port available within server
expressInstance.set('port', port);
// Create the HTTP Express Server
const server = http_1.default.createServer(expressInstance);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:8082',
        methods: ['GET', 'POST'],
    },
});
var name;
// Listen for when the client connects via socket.io-client
// Start listening on the specified Port (Default: 3000)
server.listen(port, () => {
    console.log(`listening on port ${port}`);
});
(0, socketHandler_1.socketHandler)(io);
(0, dbConnection_1.default)();
// Port Normalization
function normalizePort(val) {
    const port = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(port)) {
        return val;
    }
    else if (port >= 0) {
        return port;
    }
    else {
        return false;
    }
}
