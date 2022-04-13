import { io } from "socket.io-client";

let socket;

export const initiateSocketConnection = (authState) => {
  socket = io(process.env.REACT_APP_BACKEND_URL, {
    auth: {
      token: `Bearer ${authState.accessToken}`,
    },
  });
  console.log(`Connecting socket...`);
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const subscribeToChat = (cb) => {
  socket.emit("my message", "Hello there from React.");
};
