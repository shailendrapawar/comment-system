
import { Server } from "socket.io"
import { logger } from "./utils/logger.js";

let io;

function initSocket(httpServer, state) {

    if (!state) return httpServer;

    logger.info(`Socket connection established`)
    io = new Server(httpServer, {
        cors: {
            origin: "*"
        }
    })

    io.on("connection", (socket) => {
        console.log("socket connected")


        socket.on("disconnect", () => {
            console.log("socket disconnected:", socket.id);
        });
    })
}
function getIO() {
    if (!io) throw new Error("Socket.IO not initialized");
    return io;
}

export { initSocket, getIO }