import CommentController from "./comment.controller.js"
import express from "express"
import { authMiddleware } from "../../middlewares/authMiddleware.js";
const router = express.Router();


router.get("/:id", authMiddleware, CommentController.get);

router.get("/", authMiddleware, CommentController.search);

router.post("/", authMiddleware, CommentController.create);

router.put("/:id", authMiddleware, CommentController.update);

router.delete("/:id", authMiddleware, CommentController.update);


export default router