import express from "express";
const router = express.Router();

// Register using Post for new user
import {
  forgotPasswordController,
  getAllOrderController,
  getOrderController,
  orderStatusController,
  registerController,
  updateProfileController,
} from "../controller/authController.js";
router.post("/register", registerController);

// Login the existing User
import { loginController } from "../controller/authController.js";
router.post("/login", loginController);

// forgot password
router.post("/forgot-password", forgotPasswordController);

// test
import { testController } from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
router.get("/test", requireSignIn, isAdmin, testController);

// protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put("/profile", requireSignIn, updateProfileController);

// orders
router.get("/orders", requireSignIn, getOrderController);

// orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrderController);

// orders update and status
router.put(
  "/orders-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
