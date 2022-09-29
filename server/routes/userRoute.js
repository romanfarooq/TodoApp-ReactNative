import express from "express";
import isAuthenticatd from "../middleware/auth.js";
import {
  addTask,
  deleteAccount,
  forgotPassword,
  getMyProfile,
  login,
  logout,
  register,
  removeTask,
  resetPassword,
  updateMyProfile,
  updatePassword,
  updateTask,
  verify
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", isAuthenticatd, verify);
router.delete("/deleteAccount", isAuthenticatd, deleteAccount);
router.post("/login", login);
router.get("/logout", isAuthenticatd, logout);
router.post("/addTask", isAuthenticatd, addTask);
router.put("/updateTask/:id", isAuthenticatd, updateTask);
router.delete("/deleteTask/:id", isAuthenticatd, removeTask);
router.get("/me", isAuthenticatd, getMyProfile);
router.put("/updateProfile", isAuthenticatd, updateMyProfile);
router.put("/updatePassword", isAuthenticatd, updatePassword);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword", resetPassword);

export default router;
