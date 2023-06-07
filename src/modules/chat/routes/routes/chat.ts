import { Router } from "express";
import { ChatroomController } from "../../controller/chatRoomController"; 
import { Validation } from "../../../../middleware/authValidator";
import { logger } from "../../../../utils/logger";


class MainRouter {

    router: Router;
    chatroom: ChatroomController;
    validation:Validation
    constructor() {
        this.chatroom = new ChatroomController()
        this.validation = new Validation()
        this.router = Router()
        this.chatroomRouters()
    }

    chatroomRouters() {
        try{
        this.router.route(`/api/v1/create-chat-room`)
            .post(this.chatroom.createChatrooms)
        }catch(err:any){
            logger.error("error occur in access routes",err)
        }

    }

}
export default new MainRouter().router
