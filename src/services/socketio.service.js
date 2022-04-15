import { io } from "socket.io-client";

let socket;

export const initiateSocketConnection = (authState) => {
  socket = io(process.env.REACT_APP_BACKEND_URL, {
    auth: {
      token: `Bearer ${authState.accessToken}`,
    },
  });
  // console.log(`Connecting socket...`);
  socket.on("connect", () => {
    console.log("client connected", socket.id);
  });
  socket.on("connect_error", () => {
    console.log("there are some error please try again later");
    socket.close();
  });
  socket.on("responseMessageFromServe", (msg) => {
    console.log("~ msg from serve is", msg);
  });
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const subscribeToChat = (cb) => {
  socket.emit("my message", "Hello there from React.");
};

export const sendMessage = ({ message, roomName }, cb) => {
  if (socket) socket.emit("message", { message, roomName }, cb);
};

// socket.on("connect", () => {
//   console.log("client connected", socket.id);
// });
// socket.on("connect_error", () => {
//   console.log("there are some error please try again later");
//   socket.close();
// });
// socket.on("responseMessageFromServe", (msg) => {
//   console.log("~ msg from serve is", msg);
// });
