import { NextFunction, Request, Response } from "express";
import { ChatroomService } from "../service/service"; 
import { respHndlr} from "../../../utils/index"
import { RESPONSE_STATUS } from "../../../utils/constants";

const ChatroomServiceInstance = new ChatroomService()

export class ChatroomController {

    async createChatrooms(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await ChatroomServiceInstance.createChatRoom(req,res);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS_CREATED);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }
}
