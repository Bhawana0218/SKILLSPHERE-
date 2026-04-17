import { io, type Socket } from "socket.io-client";

const socket: Socket = io(import.meta.env.VITE_API_URL || "https://skillsphere-0iqe.onrender.com", {
  transports: ["websocket"],
  auth: {
    token: localStorage.getItem("token") || "",
  },
});

export default socket;
