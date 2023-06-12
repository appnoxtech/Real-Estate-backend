"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatRoomController_1 = require("../controller/chatRoomController");
const authValidator_1 = require("../../../middleware/authValidator");
const logger_1 = require("../../../utils/logger");
class MainRouter {
    constructor() {
        this.chatroom = new chatRoomController_1.ChatroomController();
        this.validation = new authValidator_1.Validation();
        this.router = (0, express_1.Router)();
        this.chatroomRouters();
    }
    chatroomRouters() {
        try {
            this.router.route(`/api/v1/create-chat-room`)
                .post(this.chatroom.createChatrooms);
        }
        catch (err) {
            logger_1.logger.error("error occur in access routes", err);
        }
    }
}
exports.default = new MainRouter().router;
