import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

// import all routes=============
import commentRoutes from "../src/modules/comments/comment.routes.js"
import userRoutes from "../src/modules/users/user.routes.js"
import postRoutes from "../src/modules/post/post.routes.js"
// =============================


app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
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




export default app