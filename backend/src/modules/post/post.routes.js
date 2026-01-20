import PostController from "./post.controller.js"
import express from "express"
import { authMiddleware } from "../../middlewares/authMiddleware.js"
const router = express.Router();


router.get("/:id",
    authMiddleware,
    PostController.get);


router.get("/",
    authMiddleware,
    PostController.search);


router.post("/",
    authMiddleware,
    PostController.create);


// router.put("/:id",
//     authMiddleware,
//     PostController.update);

export default router