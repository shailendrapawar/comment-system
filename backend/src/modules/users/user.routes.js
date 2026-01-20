import UserController from "./user.controller.js"
import express from "express"

const router = express.Router();


// router.get("/:id", UserController.get);

// router.get("/", UserController.search);

// router.put("/:id", UserController.update);


router.post("/register", UserController.register);
router.post("/login", UserController.login);


export default router