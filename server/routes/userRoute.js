import express from "express";
import isAuthenticatd from "../middleware/auth.js";
import { login, logout, register, verify } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", isAuthenticatd, verify);
router.post("/login", login);
router.get("/logout", isAuthenticatd, logout);

export default router;
