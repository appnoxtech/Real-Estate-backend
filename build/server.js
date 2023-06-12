"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
//import helmet from 'helmet';
const compression_1 = __importDefault(require("compression"));
const mainRoutes_1 = __importDefault(require("./mainRoutes"));
class Server {
    constructor() {
        this.expressInstance = (0, express_1.default)();
        this.middlewareSetup();
        this.routingSetup();
    }
    middlewareSetup() {
        // Setup requests gZip compression
        this.expressInstance.use((0, compression_1.default)());
        // Setup Cross Origin access
        this.expressInstance.use((0, cors_1.default)());
        // Setup requests format parsing (Only JSON requests will be valid)
        this.expressInstance.use(body_parser_1.default.urlencoded({ extended: true }));
        this.expressInstance.use(body_parser_1.default.json());
    }
    routingSetup() {
        // Add mainRouter object to server routes
        this.expressInstance.use('/', mainRoutes_1.default);
    }
}
exports.default = Server;
