import { Router } from "express";
import { logIn, signIn } from "../Controllers/user.controller.js";
import upload from "../Middleware/upload.middleware.js";

const router = Router();

router.post("/register", upload.single("avatar"), signIn);

router.post("/login",logIn)
export default router;
