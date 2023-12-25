import express from "express";
const router = express.Router();

// Register using Post for new user
import { registerController } from "../controller/authController.js";
router.post("/register", registerController);

// Login the existing User
import { loginController } from "../controller/authController.js";
router.post("/login", loginController);

// test
import { testController } from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
router.get("/test", requireSignIn, isAdmin, testController);

export default router;
