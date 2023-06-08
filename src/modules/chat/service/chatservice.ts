
import Chatroom from "../models/chatroom";
import Exception from "../../../exceptions/exception";
import { CommonStrings, ERROR_TYPE } from "../../../utils/constants";
import { logger } from "../../../utils/logger";

export class ChatroomService {

  async createChatRoom(req: any, res: any) {
    try {
      const {userId}= req.body
      const chatroomCreate = await Chatroom.create(req.body)
      return Promise.resolve(chatroomCreate);
    } catch (err: any) {
      return Promise.reject(err);
    }
  }
  
}
