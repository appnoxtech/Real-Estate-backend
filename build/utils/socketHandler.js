"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketHandler = void 0;
const Message_1 = __importDefault(require("../modules/chat/models/Message"));
const userModel_1 = __importDefault(require("../modules/users/model/userModel"));
const logger_1 = require("./logger");
const socketHandler = (io) => {
    io.on("connection", (socket) => {
        logger_1.logger.info("Connected: ");
        socket.on("disconnect", () => {
            logger_1.logger.info("Disconnected: ");
        });
        socket.on("chatroomMessage", ({ chatroomId, userId, message }) => __awaiter(void 0, void 0, void 0, function* () {
            logger_1.logger.info("message:-", message, "chatRoomId:-", chatroomId, userId);
            if ((message === null || message === void 0 ? void 0 : message.trim().length) > 0) {
                const user = yield userModel_1.default.findOne({ where: { id: userId } });
                if (user) {
                    const newMessage = yield Message_1.default.create({
                        chatroom: chatroomId,
                        user: userId,
                        message,
                    });
                    io.to(chatroomId).emit("newMessage", {
                        message,
                        name: user.dataValues.name,
                        userId: userId,
                    });
                }
            }
        }));
    });
};
exports.socketHandler = socketHandler;
