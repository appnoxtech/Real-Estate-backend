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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatroomController = void 0;
const chatservice_1 = require("../service/chatservice");
const index_1 = require("../../../utils/index");
const constants_1 = require("../../../utils/constants");
const ChatroomServiceInstance = new chatservice_1.ChatroomService();
class ChatroomController {
    createChatrooms(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield ChatroomServiceInstance.createChatRoom(req, res);
                index_1.respHndlr.sendSuccess(res, data, constants_1.RESPONSE_STATUS.SUCCESS_CREATED);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
        });
    }
}
exports.ChatroomController = ChatroomController;
