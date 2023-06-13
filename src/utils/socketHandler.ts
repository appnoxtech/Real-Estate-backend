import Message from "../modules/chat/models/Message";
import User from "../modules/users/model/userModel";
import { logger } from "./logger";
export const socketHandler = (io: any) => {
  io.on("connection", (socket: any) => {
    logger.info("Connected: ");

    socket.on("disconnect", () => {
      logger.info("Disconnected: ");
    });

    socket.on(
      "chatroomMessage",
      async ({ chatroomId, userId, message }: any) => {
        logger.info("message:-", message, "chatRoomId:-", chatroomId, userId);
        if (message?.trim().length > 0) {
          const user = await User.findOne({ where: { id: userId } });
          if (user) {
            const newMessage = await Message.create({
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
      }
    );
  });
};
