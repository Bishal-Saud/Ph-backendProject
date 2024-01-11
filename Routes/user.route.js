import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  logIn,
  logout,
  resetPassword,
  showProfile,
  signIn,
  updateUser,
} from "../Controllers/user.controller.js";
import upload from "../Middleware/upload.middleware.js";
import { isLoggedIn } from "../Middleware/auth.middleware.js";

const router = Router();
router.post("/register", upload.single("avatar"), signIn);
router.post("/login", logIn);
router.get("/logout", isLoggedIn, logout);
router.get("/me", isLoggedIn, showProfile);
router.post("/reset", forgotPassword);
router.post("/reset/:resetToken", resetPassword);
router.post("/change-password", isLoggedIn, changePassword);
router.put("/update/:id", isLoggedIn, upload.single("avatar"), updateUser);

export default router;
