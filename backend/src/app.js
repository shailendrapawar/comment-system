import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import cron from "node-cron"
import { authMiddleware } from "./middlewares/authMiddleware.js";
const app = express();

// import all routes=============
import commentRoutes from "../src/modules/comments/comment.routes.js"
import userRoutes from "../src/modules/users/user.routes.js"
import postRoutes from "../src/modules/post/post.routes.js"
import { ENV } from "./configs/env.js";
import { pingHealth } from "./helpers/ping.js";
// =============================


app.use(express.json());
app.use(cors({
    origin: ENV.FRONTEND_URL,
    credentials: true
}))
app.use(cookieParser())

app.use("/api/comments", commentRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)


app.get("/", (req, res) => {
    res.json({
        msg: "Server working",
        success: true
    })
})
app.get("/health-check", (req, res) => {
    res.json({
        msg: "Health good",
        success: true
    })
})


const PORT = ENV.PORT || 5000

cron.schedule("*/5 * * * *", () => {
    pingHealth(PORT)
});

export default app