import { io, type Socket } from "socket.io-client";
import { SOCKET_SERVER_URL } from "../config/runtimeUrls";

const socket: Socket = io(SOCKET_SERVER_URL, {
  auth: (cb) => {
    cb({ token: localStorage.getItem("token") || "" });
  },
});

export default socket;
