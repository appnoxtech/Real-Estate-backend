import Message from "../modules/chat/models/Message";
import User from "../modules/users/model/userModel";
export const socketHandler = (io: any) => {
  io.on("connection", (socket: any) => {
    console.log("Connected: ");

    socket.on("disconnect", () => {
      console.log("Disconnected: ");
    });

    socket.on(
      "chatroomMessage",
      async ({ chatroomId, userId, message }: any) => {
        console.log("message:-", message, "chatRoomId:-", chatroomId, userId);
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
