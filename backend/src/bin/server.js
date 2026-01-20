import { createServer } from "http"
import { ENV } from "../configs/env.js"

import app from "../app.js"
import { getIO, initSocket } from "../socket.js"

import { logger } from "../utils/logger.js"
import { connectDB } from "../configs/db.js"

const PORT = ENV.PORT || 5000

const httpServer = createServer(app);

initSocket(httpServer, false);

connectDB().then(() => {
    httpServer.listen(PORT, () => {
        logger.info(`Server listening on port:${PORT}`)
    })
})