"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./modules/users/routes/userRoutes"));
const propRoutes_1 = __importDefault(require("./modules/properties/routes/propRoutes"));
const chat_1 = __importDefault(require("./modules/chat/routes/chat"));
const documentsUpload_1 = __importDefault(require("./modules/documentsUpload/routes/documentsUpload"));
const ratingRoutes_1 = __importDefault(require("./modules/review&ratings/routes/ratingRoutes"));
const mainRouter = (0, express_1.Router)();
// add module's router here in main router
mainRouter.use(userRoutes_1.default);
mainRouter.use(propRoutes_1.default);
mainRouter.use(chat_1.default);
mainRouter.use(documentsUpload_1.default);
mainRouter.use(ratingRoutes_1.default);
exports.default = mainRouter;
