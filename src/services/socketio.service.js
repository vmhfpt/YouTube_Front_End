import { io } from "socket.io-client";
import store from "../app/store";
import { addAnComment, removeAnItem } from "../pages/video/videoSlice";
import { NotificationManager } from "react-notifications";
let socket;
export const initiateSocketConnection = (authState) => {
  socket = io(process.env.REACT_APP_BACKEND_URL, {
    auth: {
      token: `${authState.accessToken}`,
    },
  });
  console.log(`Connecting socket...`);
  socket.on("connect", () => {
    console.log("client connected", socket.id);
  });
  socket.on("connect_error", (err) => {
    console.log("Error message from serve :", err.message);
    console.log("There are some error please try again latter");
    socket.close();
  });
  socket.on("responseMessageFromServe", (msg) => {
    console.log("Msg from serve is", msg);
    store.dispatch(addAnComment(msg));
  });
  socket.on("responseDeleteMessageFromServe", (msg) => {
    console.log("Comment need to remove from serve is", msg);
    NotificationManager.success("Delete comment success", "Comment notify");
    store.dispatch(removeAnItem(msg));
  });
  socket.on("notifyForClient", (msg) => {
    NotificationManager.error(msg, "Login require");
  });
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const sendMessage = (comment) => {
  if (socket) socket.emit("saveMessageToServe", comment);
};

export const deleteMessage = (comment) => {
  if (socket) socket.emit("deleteCommentToServe", comment);
};
